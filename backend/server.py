from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import duckdb
import nflreadpy as nfl
import pandas as pd
import asyncio
from concurrent.futures import ThreadPoolExecutor
import traceback
import requests
import json
from datetime import date

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="Fantasy Football Database API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize DuckDB connection
db_path = ROOT_DIR / "fantasy_football.db"
conn = duckdb.connect(str(db_path))

# Thread pool for async operations
executor = ThreadPoolExecutor(max_workers=3)

# DraftKings PPR Scoring System
DRAFTKINGS_SCORING = {
    'passing_yards': 0.04,  # 1 point per 25 yards (0.04 per yard)
    'passing_tds': 4,
    'interceptions': -1,
    'rushing_yards': 0.1,  # 1 point per 10 yards
    'rushing_tds': 6,
    'receptions': 1,  # PPR - 1 point per reception
    'receiving_yards': 0.1,  # 1 point per 10 yards
    'receiving_tds': 6,
    'fumbles_lost': -1,
    '2pt_conversions': 2
}

# All NFL Teams
NFL_TEAMS = {
    'ARI': 'Arizona Cardinals',
    'ATL': 'Atlanta Falcons',
    'BAL': 'Baltimore Ravens', 
    'BUF': 'Buffalo Bills',
    'CAR': 'Carolina Panthers',
    'CHI': 'Chicago Bears',
    'CIN': 'Cincinnati Bengals',
    'CLE': 'Cleveland Browns',
    'DAL': 'Dallas Cowboys',
    'DEN': 'Denver Broncos',
    'DET': 'Detroit Lions',
    'GB': 'Green Bay Packers',
    'HOU': 'Houston Texans',
    'IND': 'Indianapolis Colts',
    'JAX': 'Jacksonville Jaguars',
    'KC': 'Kansas City Chiefs',
    'LV': 'Las Vegas Raiders',
    'LAC': 'Los Angeles Chargers',
    'LAR': 'Los Angeles Rams',
    'MIA': 'Miami Dolphins',
    'MIN': 'Minnesota Vikings',
    'NE': 'New England Patriots',
    'NO': 'New Orleans Saints',
    'NYG': 'New York Giants',
    'NYJ': 'New York Jets',
    'PHI': 'Philadelphia Eagles',
    'PIT': 'Pittsburgh Steelers',
    'SF': 'San Francisco 49ers',
    'SEA': 'Seattle Seahawks',
    'TB': 'Tampa Bay Buccaneers',
    'TEN': 'Tennessee Titans',
    'WAS': 'Washington Commanders'
}

# RapidAPI configuration for DraftKings pricing
RAPIDAPI_KEY = "31cd7fd5cfmsh0039d0aaa4b3cf4p187526jsn4273673a1752"
RAPIDAPI_HOST = "tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com"

# Models
class PlayerStats(BaseModel):
    player_id: str
    player_name: str
    position: str
    team: str
    season: int
    week: int
    opponent: Optional[str] = None
    passing_yards: Optional[float] = 0
    passing_tds: Optional[int] = 0
    interceptions: Optional[int] = 0
    rushing_yards: Optional[float] = 0
    rushing_tds: Optional[int] = 0
    receptions: Optional[int] = 0
    receiving_yards: Optional[float] = 0
    receiving_tds: Optional[int] = 0
    fumbles_lost: Optional[int] = 0
    fantasy_points: Optional[float] = 0
    snap_percentage: Optional[float] = None
    targets: Optional[int] = 0
    dk_salary: Optional[str] = None

class RefreshResponse(BaseModel):
    success: bool
    message: str
    records_loaded: int
    timestamp: datetime

class DraftKingsResponse(BaseModel):
    success: bool
    data: Optional[Dict] = None
    message: str
    timestamp: datetime

def calculate_fantasy_points(stats: Dict) -> float:
    """Calculate DraftKings PPR fantasy points"""
    points = 0
    
    # Passing
    if stats.get('passing_yards'):
        points += stats['passing_yards'] * DRAFTKINGS_SCORING['passing_yards']
    if stats.get('passing_tds'):
        points += stats['passing_tds'] * DRAFTKINGS_SCORING['passing_tds']
    if stats.get('interceptions'):
        points += stats['interceptions'] * DRAFTKINGS_SCORING['interceptions']
    
    # Rushing
    if stats.get('rushing_yards'):
        points += stats['rushing_yards'] * DRAFTKINGS_SCORING['rushing_yards']
    if stats.get('rushing_tds'):
        points += stats['rushing_tds'] * DRAFTKINGS_SCORING['rushing_tds']
    
    # Receiving
    if stats.get('receptions'):
        points += stats['receptions'] * DRAFTKINGS_SCORING['receptions']
    if stats.get('receiving_yards'):
        points += stats['receiving_yards'] * DRAFTKINGS_SCORING['receiving_yards']
    if stats.get('receiving_tds'):
        points += stats['receiving_tds'] * DRAFTKINGS_SCORING['receiving_tds']
    
    # Fumbles
    if stats.get('fumbles_lost'):
        points += stats['fumbles_lost'] * DRAFTKINGS_SCORING['fumbles_lost']
    
    return round(points, 2)

def fetch_draftkings_pricing(date_str: str = None) -> Dict:
    """Fetch DraftKings pricing from RapidAPI"""
    if not date_str:
        date_str = date.today().strftime('%Y%m%d')
    
    url = f"https://{RAPIDAPI_HOST}/getNFLDFS"
    
    querystring = {
        "date": date_str,
        "includeTeamDefense": "true"
    }
    
    headers = {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST
    }
    
    try:
        response = requests.get(url, headers=headers, params=querystring, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        logging.info(f"DraftKings API response received for date {date_str}")
        
        # Process the data to create player salary mapping
        salary_map = {}
        if 'body' in data and isinstance(data['body'], list):
            for player in data['body']:
                if 'playerName' in player and 'salary' in player:
                    name = player['playerName']
                    salary = player['salary']
                    salary_map[name] = f"${salary/1000:.1f}k" if salary >= 1000 else f"${salary}"
        
        return {
            'success': True,
            'data': salary_map,
            'raw_data': data
        }
        
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching DraftKings pricing: {e}")
        return {
            'success': False,
            'error': str(e),
            'data': {}
        }
    except Exception as e:
        logging.error(f"Unexpected error in DraftKings API: {e}")
        return {
            'success': False,
            'error': str(e),
            'data': {}
        }

def init_database():
    """Initialize DuckDB tables"""
    try:
        # Create players table
        conn.execute("""
            CREATE TABLE IF NOT EXISTS players (
                player_id VARCHAR PRIMARY KEY,
                player_name VARCHAR,
                position VARCHAR,
                team VARCHAR,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create weekly_stats table
        conn.execute("""
            CREATE TABLE IF NOT EXISTS weekly_stats (
                id VARCHAR PRIMARY KEY,
                player_id VARCHAR,
                player_name VARCHAR,
                position VARCHAR,
                team VARCHAR,
                season INTEGER,
                week INTEGER,
                opponent VARCHAR,
                passing_yards DOUBLE DEFAULT 0,
                passing_tds INTEGER DEFAULT 0,
                interceptions INTEGER DEFAULT 0,
                rushing_yards DOUBLE DEFAULT 0,
                rushing_tds INTEGER DEFAULT 0,
                receptions INTEGER DEFAULT 0,
                receiving_yards DOUBLE DEFAULT 0,
                receiving_tds INTEGER DEFAULT 0,
                targets INTEGER DEFAULT 0,
                fumbles_lost INTEGER DEFAULT 0,
                fantasy_points DOUBLE DEFAULT 0,
                snap_percentage DOUBLE,
                dk_salary VARCHAR,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(player_id, season, week)
            )
        """)
        
        # Create snap_counts table
        conn.execute("""
            CREATE TABLE IF NOT EXISTS snap_counts (
                id VARCHAR PRIMARY KEY,
                player_id VARCHAR,
                player_name VARCHAR,
                team VARCHAR,
                season INTEGER,
                week INTEGER,
                offense_snaps INTEGER DEFAULT 0,
                offense_pct DOUBLE DEFAULT 0,
                defense_snaps INTEGER DEFAULT 0,
                defense_pct DOUBLE DEFAULT 0,
                st_snaps INTEGER DEFAULT 0,
                st_pct DOUBLE DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(player_id, season, week)
            )
        """)
        
        logging.info("Database initialized successfully")
    except Exception as e:
        logging.error(f"Error initializing database: {e}")
        raise

def load_nfl_data_sync(seasons: List[int]) -> Dict[str, int]:
    """Load NFL data synchronously for async wrapper"""
    try:
        total_records = 0
        
        # Fetch DraftKings pricing for recent date
        dk_pricing = fetch_draftkings_pricing()
        salary_map = dk_pricing.get('data', {}) if dk_pricing.get('success') else {}
        
        for season in seasons:
            logging.info(f"Loading data for season {season}")
            
            # Load player stats
            try:
                player_stats = nfl.load_player_stats(seasons=[season])
                logging.info(f"Player stats type: {type(player_stats)}, length: {len(player_stats) if player_stats is not None else 'None'}")
                
                if player_stats is not None and len(player_stats) > 0:
                    # Convert Polars to Pandas for easier processing
                    player_stats_pd = player_stats.to_pandas()
                    
                    # Filter for relevant positions
                    relevant_positions = ['QB', 'RB', 'WR', 'TE']
                    filtered_stats = player_stats_pd[player_stats_pd['position'].isin(relevant_positions)].copy()
                    
                    # Use existing fantasy_points column (or fantasy_points_ppr for PPR)
                    if 'fantasy_points_ppr' in filtered_stats.columns:
                        filtered_stats['fantasy_points'] = filtered_stats['fantasy_points_ppr']
                    elif 'fantasy_points' not in filtered_stats.columns:
                        # Fallback to calculation if neither column exists
                        filtered_stats['fantasy_points'] = filtered_stats.apply(
                            lambda row: calculate_fantasy_points(row.to_dict()), axis=1
                        )
                    
                    # Add DraftKings salary data
                    filtered_stats['dk_salary'] = filtered_stats['player_display_name'].map(
                        lambda name: salary_map.get(name, None)
                    )
                    
                    # Create unique ID for each record
                    filtered_stats['id'] = filtered_stats.apply(
                        lambda row: f"{row['player_id']}_{row['season']}_{row['week']}", axis=1
                    )
                    
                    # Insert into database
                    conn.execute("DELETE FROM weekly_stats WHERE season = ?", [season])
                    conn.register('stats_df', filtered_stats)
                    conn.execute("""
                        INSERT INTO weekly_stats 
                        SELECT 
                            id,
                            player_id,
                            player_display_name as player_name,
                            position,
                            team,
                            season,
                            week,
                            opponent_team as opponent,
                            COALESCE(passing_yards, 0) as passing_yards,
                            COALESCE(passing_tds, 0) as passing_tds,
                            COALESCE(passing_interceptions, 0) as interceptions,
                            COALESCE(rushing_yards, 0) as rushing_yards,
                            COALESCE(rushing_tds, 0) as rushing_tds,
                            COALESCE(receptions, 0) as receptions,
                            COALESCE(receiving_yards, 0) as receiving_yards,
                            COALESCE(receiving_tds, 0) as receiving_tds,
                            COALESCE(targets, 0) as targets,
                            COALESCE(rushing_fumbles_lost, 0) + COALESCE(receiving_fumbles_lost, 0) as fumbles_lost,
                            fantasy_points,
                            NULL as snap_percentage,
                            dk_salary,
                            CURRENT_TIMESTAMP as created_at
                        FROM stats_df
                    """)
                    
                    records_count = len(filtered_stats)
                    total_records += records_count
                    logging.info(f"Loaded {records_count} player stat records for season {season}")
                    
            except Exception as e:
                logging.error(f"Error loading player stats for season {season}: {e}")
                continue
            
            # Load snap counts
            try:
                snap_counts = nfl.load_snap_counts(seasons=[season])
                
                if snap_counts is not None and len(snap_counts) > 0:
                    # Convert Polars to Pandas for easier processing
                    snap_counts_pd = snap_counts.to_pandas()
                    
                    # Create unique ID for each record
                    snap_counts_pd['id'] = snap_counts_pd.apply(
                        lambda row: f"{row['player_id']}_{row['season']}_{row['week']}_snaps", axis=1
                    )
                    
                    # Insert into database
                    conn.execute("DELETE FROM snap_counts WHERE season = ?", [season])
                    conn.register('snaps_df', snap_counts_pd)
                    conn.execute("""
                        INSERT INTO snap_counts 
                        SELECT 
                            id,
                            player_id,
                            player as player_name,
                            team,
                            season,
                            week,
                            COALESCE(offense_snaps, 0) as offense_snaps,
                            COALESCE(offense_pct, 0) as offense_pct,
                            COALESCE(defense_snaps, 0) as defense_snaps,
                            COALESCE(defense_pct, 0) as defense_pct,
                            COALESCE(st_snaps, 0) as st_snaps,
                            COALESCE(st_pct, 0) as st_pct,
                            CURRENT_TIMESTAMP as created_at
                        FROM snaps_df
                    """)
                    
                    snap_records_count = len(snap_counts_pd)
                    total_records += snap_records_count
                    logging.info(f"Loaded {snap_records_count} snap count records for season {season}")
                    
            except Exception as e:
                logging.error(f"Error loading snap counts for season {season}: {e}")
                continue
        
        # Update weekly_stats with snap percentages
        conn.execute("""
            UPDATE weekly_stats 
            SET snap_percentage = (
                SELECT offense_pct 
                FROM snap_counts sc 
                WHERE sc.player_id = weekly_stats.player_id 
                  AND sc.season = weekly_stats.season 
                  AND sc.week = weekly_stats.week
            )
            WHERE EXISTS (
                SELECT 1 FROM snap_counts sc 
                WHERE sc.player_id = weekly_stats.player_id 
                  AND sc.season = weekly_stats.season 
                  AND sc.week = weekly_stats.week
            )
        """)
        
        return {"total_records": total_records}
        
    except Exception as e:
        logging.error(f"Error in load_nfl_data_sync: {e}")
        logging.error(traceback.format_exc())
        raise

async def load_nfl_data(seasons: List[int]) -> Dict[str, int]:
    """Load NFL data asynchronously"""
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, load_nfl_data_sync, seasons)

# API Endpoints
@api_router.get("/")
async def root():
    return {"message": "Fantasy Football Database API", "version": "1.0.0"}

@api_router.get("/nfl-teams")
async def get_nfl_teams():
    """Get all NFL teams"""
    return {"teams": NFL_TEAMS}

@api_router.get("/players", response_model=List[PlayerStats])
async def get_players(
    season: Optional[int] = Query(None, description="Season year (2024, 2025)"),
    week: Optional[int] = Query(None, description="Week number (1-18)"),
    position: Optional[str] = Query(None, description="Position (QB, RB, WR, TE)"),
    team: Optional[str] = Query(None, description="Team abbreviation"),
    limit: int = Query(500, description="Maximum number of records to return"),
    offset: int = Query(0, description="Number of records to skip")
):
    """Get player statistics with optional filters"""
    try:
        query = """
            SELECT 
                ws.player_id,
                ws.player_name,
                ws.position,
                ws.team,
                ws.season,
                ws.week,
                ws.opponent,
                ws.passing_yards,
                ws.passing_tds,
                ws.interceptions,
                ws.rushing_yards,
                ws.rushing_tds,
                ws.receptions,
                ws.receiving_yards,
                ws.receiving_tds,
                ws.targets,
                ws.fumbles_lost,
                ws.fantasy_points,
                ws.snap_percentage,
                ws.dk_salary
            FROM weekly_stats ws
            WHERE 1=1
        """
        
        params = []
        
        if season:
            query += " AND ws.season = ?"
            params.append(season)
        
        if week:
            query += " AND ws.week = ?"
            params.append(week)
        
        if position:
            query += " AND ws.position = ?"
            params.append(position.upper())
        
        if team:
            query += " AND ws.team = ?"
            params.append(team.upper())
        
        query += " ORDER BY ws.fantasy_points DESC, ws.player_name"
        query += f" LIMIT {limit} OFFSET {offset}"
        
        result = conn.execute(query, params).fetchall()
        columns = [desc[0] for desc in conn.description]
        
        players = []
        for row in result:
            player_data = dict(zip(columns, row))
            players.append(PlayerStats(**player_data))
        
        return players
        
    except Exception as e:
        logging.error(f"Error fetching players: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching players: {str(e)}")

@api_router.get("/stats/summary")
async def get_stats_summary():
    """Get summary statistics about the database"""
    try:
        # Get total records
        total_stats = conn.execute("SELECT COUNT(*) FROM weekly_stats").fetchone()[0]
        total_snaps = conn.execute("SELECT COUNT(*) FROM snap_counts").fetchone()[0]
        
        # Get seasons available
        seasons = conn.execute("SELECT DISTINCT season FROM weekly_stats ORDER BY season DESC").fetchall()
        seasons = [row[0] for row in seasons]
        
        # Get weeks available for current season
        if seasons:
            current_season = seasons[0]
            weeks = conn.execute(
                "SELECT DISTINCT week FROM weekly_stats WHERE season = ? ORDER BY week", 
                [current_season]
            ).fetchall()
            weeks = [row[0] for row in weeks]
        else:
            weeks = []
        
        # Get position counts
        position_counts = conn.execute("""
            SELECT position, COUNT(*) as count 
            FROM weekly_stats 
            GROUP BY position 
            ORDER BY count DESC
        """).fetchall()
        
        # Get snap count statistics
        snap_stats = conn.execute("""
            SELECT COUNT(*) as players_with_snaps
            FROM weekly_stats 
            WHERE snap_percentage IS NOT NULL AND snap_percentage > 0
        """).fetchone()[0]
        
        return {
            "total_player_stats": total_stats,
            "total_snap_counts": total_snaps,
            "players_with_snap_data": snap_stats,
            "seasons_available": seasons,
            "weeks_available": weeks,
            "position_counts": {row[0]: row[1] for row in position_counts},
            "last_updated": datetime.now(timezone.utc).isoformat()
        }
        
    except Exception as e:
        logging.error(f"Error getting stats summary: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting summary: {str(e)}")

@api_router.post("/refresh-data", response_model=RefreshResponse)
async def refresh_data(
    seasons: Optional[List[int]] = Query([2023], description="Seasons to refresh")
):
    """Refresh NFL data from nflverse sources"""
    try:
        logging.info(f"Starting data refresh for seasons: {seasons}")
        
        result = await load_nfl_data(seasons)
        
        return RefreshResponse(
            success=True,
            message=f"Successfully refreshed data for seasons {seasons}",
            records_loaded=result["total_records"],
            timestamp=datetime.now(timezone.utc)
        )
        
    except Exception as e:
        logging.error(f"Error refreshing data: {e}")
        logging.error(traceback.format_exc())
        raise HTTPException(
            status_code=500, 
            detail=f"Error refreshing data: {str(e)}"
        )

@api_router.get("/draftkings-pricing", response_model=DraftKingsResponse)
async def get_draftkings_pricing(
    date_str: Optional[str] = Query(None, description="Date in YYYYMMDD format")
):
    """Get DraftKings pricing from RapidAPI"""
    try:
        result = fetch_draftkings_pricing(date_str)
        
        return DraftKingsResponse(
            success=result['success'],
            data=result.get('data'),
            message="DraftKings pricing fetched successfully" if result['success'] else f"Error: {result.get('error', 'Unknown error')}",
            timestamp=datetime.now(timezone.utc)
        )
        
    except Exception as e:
        logging.error(f"Error getting DraftKings pricing: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Error getting DraftKings pricing: {str(e)}"
        )

@api_router.get("/top-performers")
async def get_top_performers(
    season: int = Query(2023, description="Season year"),
    position: Optional[str] = Query(None, description="Position filter"),
    week: Optional[int] = Query(None, description="Week filter (leave empty for season totals)"),
    limit: int = Query(20, description="Number of top performers to return")
):
    """Get top fantasy performers"""
    try:
        if week:
            # Single week performance
            query = """
                SELECT 
                    player_name,
                    position,
                    team,
                    week,
                    fantasy_points,
                    passing_yards,
                    passing_tds,
                    rushing_yards,
                    rushing_tds,
                    receptions,
                    receiving_yards,
                    receiving_tds,
                    snap_percentage,
                    dk_salary
                FROM weekly_stats
                WHERE season = ? AND week = ?
            """
            params = [season, week]
        else:
            # Season totals
            query = """
                SELECT 
                    player_name,
                    position,
                    team,
                    COUNT(*) as games_played,
                    SUM(fantasy_points) as fantasy_points,
                    AVG(fantasy_points) as avg_fantasy_points,
                    SUM(passing_yards) as passing_yards,
                    SUM(passing_tds) as passing_tds,
                    SUM(rushing_yards) as rushing_yards,
                    SUM(rushing_tds) as rushing_tds,
                    SUM(receptions) as receptions,
                    SUM(receiving_yards) as receiving_yards,
                    SUM(receiving_tds) as receiving_tds,
                    AVG(snap_percentage) as avg_snap_percentage
                FROM weekly_stats
                WHERE season = ?
                GROUP BY player_name, position, team
            """
            params = [season]
        
        if position:
            query += " AND position = ?"
            params.append(position.upper())
        
        query += " ORDER BY fantasy_points DESC"
        query += f" LIMIT {limit}"
        
        result = conn.execute(query, params).fetchall()
        columns = [desc[0] for desc in conn.description]
        
        performers = []
        for row in result:
            performer_data = dict(zip(columns, row))
            performers.append(performer_data)
        
        return performers
        
    except Exception as e:
        logging.error(f"Error getting top performers: {e}")
        raise HTTPException(status_code=500, detail=f"Error getting top performers: {str(e)}")

# Initialize database on startup
init_database()

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Fantasy Football Database API started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    conn.close()
    executor.shutdown(wait=True)
    logger.info("Fantasy Football Database API shutdown complete")
