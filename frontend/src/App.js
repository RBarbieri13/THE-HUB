import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { RefreshCw, TrendingUp, Users, Calendar, Search, Filter, Star, BarChart3, Settings, Download, DollarSign, Database, Clock, Activity, Heart, Copy, Eye, Zap } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import '@/App.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// All NFL Teams
const NFL_TEAMS = {
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
};

const FantasyDashboard = () => {
  const [gridApi, setGridApi] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingPricing, setLoadingPricing] = useState(false);
  const [loadingSnapCounts, setLoadingSnapCounts] = useState(false);
  const [summary, setSummary] = useState(null);
  const [selectedPlayerType, setSelectedPlayerType] = useState('all');
  const [filters, setFilters] = useState({
    season: '2025',
    week: '4',  // Start with Week 4 to match reference image
    position: 'QB',
    team: 'all',
    minSalary: '',
    minSnaps: ''
  });
  
  // New state for enhanced features
  const [isPPR, setIsPPR] = useState(true); // true = full PPR, false = half PPR
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerDetailOpen, setPlayerDetailOpen] = useState(false);
  const [playerDetailWidth, setPlayerDetailWidth] = useState(30); // percentage
  const [playerGameHistory, setPlayerGameHistory] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(280); // pixels
  const [isResizing, setIsResizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'fantasy_points', direction: 'desc' });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [activeTab, setActiveTab] = useState('data-table');
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);
  
  // Trend Tool state
  const [trendFilters, setTrendFilters] = useState({
    team: 'NYG',
    startWeek: 4,
    endWeek: 6,
    season: '2025'
  });
  const [trendData, setTrendData] = useState([]);
  const [columnWidths, setColumnWidths] = useState(() => {
    const saved = localStorage.getItem('trendToolColumnWidths');
    return saved ? JSON.parse(saved) : {};
  });
  const [collapsedColumns, setCollapsedColumns] = useState(() => {
    const saved = localStorage.getItem('trendToolCollapsedColumns');
    return saved ? JSON.parse(saved) : {};
  });
  
  // New states for Trend Tool enhancements
  const [trendViewMode, setTrendViewMode] = useState('summary'); // 'summary' or 'full'
  const [trendFiltersCollapsed, setTrendFiltersCollapsed] = useState(false);

  // Calculate fantasy points based on PPR setting
  const calculateFantasyPoints = (player) => {
    let points = 0;
    
    // Passing
    points += (player.passing_yards || 0) * 0.04;
    points += (player.passing_tds || 0) * 4;
    points += (player.interceptions || 0) * -1;
    
    // Rushing
    points += (player.rushing_yards || 0) * 0.1;
    points += (player.rushing_tds || 0) * 6;
    
    // Receiving
    points += (player.receiving_yards || 0) * 0.1;
    points += (player.receiving_tds || 0) * 6;
    points += (player.receptions || 0) * (isPPR ? 1 : 0.5); // Full PPR vs Half PPR
    
    // Fumbles
    points += (player.fumbles_lost || 0) * -1;
    
    return points.toFixed(1);
  };

  // Get performance color based on value and position
  const getPerformanceColor = (value, type, position) => {
    if (!value || value === 0) return 'text-gray-400';
    
    // Different thresholds based on stat type and position
    const thresholds = {
      fantasy_points: { good: 15, average: 8 },
      snap_percentage: { good: 60, average: 30 },
      passing_yards: { good: 250, average: 150 },
      rushing_yards: { good: 80, average: 40 },
      receiving_yards: { good: 80, average: 40 },
      receptions: { good: 6, average: 3 }
    };
    
    const threshold = thresholds[type];
    if (!threshold) return 'text-gray-700';
    
    if (value >= threshold.good) return 'text-green-600 font-semibold';
    if (value >= threshold.average) return 'text-yellow-600';
    return 'text-red-500';
  };

  // Get position color for badges
  const getPositionColor = (position) => {
    const colors = {
      'QB': 'bg-purple-100 text-purple-800 border-purple-300',
      'RB': 'bg-green-100 text-green-800 border-green-300',
      'WR': 'bg-blue-100 text-blue-800 border-blue-300',
      'TE': 'bg-orange-100 text-orange-800 border-orange-300'
    };
    return colors[position] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  // Handle sidebar resizing
  const handleMouseDown = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    
    const newWidth = e.clientX;
    if (newWidth >= 200 && newWidth <= 400) {
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  // Handle player click to open detail panel
  const handlePlayerClick = async (player) => {
    setSelectedPlayer(player);
    setPlayerDetailOpen(true);
    await fetchPlayerGameHistory(player);
  };

  // Fetch last 10 games for selected player
  const fetchPlayerGameHistory = async (player) => {
    try {
      const currentWeek = filters.week === 'all' ? 18 : parseInt(filters.week);
      const season = filters.season;
      
      const response = await axios.get(`${API}/players`, {
        params: {
          season: season,
          limit: 50, // Get more to find last 10 games
          player_name: player.player_name
        }
      });
      
      // Filter and sort to get last 10 games from current week backwards
      const games = response.data
        .filter(game => 
          game.player_name === player.player_name && 
          (filters.week === 'all' || game.week <= currentWeek)
        )
        .sort((a, b) => b.week - a.week)
        .slice(0, 10);
      
      setPlayerGameHistory(games);
    } catch (error) {
      console.error('Error fetching player game history:', error);
      setPlayerGameHistory([]);
    }
  };

  // Column definitions with grouped headers
  const columnDefs = useMemo(() => [
    // Player Info Group (Pinned Left)
    {
      headerName: 'PLAYER INFO',
      headerClass: 'player-info-group-header',
      children: [
        {
          headerName: 'Player',
          field: 'player_name',
          pinned: 'left',
          width: 140,
      cellRenderer: (params) => (
        <div className="flex items-center justify-between py-1 px-2 group">
          <div 
            className="cursor-pointer hover:text-blue-600 transition-colors flex-1"
            onClick={() => handlePlayerClick(params.data)}
          >
            <div className="font-medium text-gray-900 text-sm">{params.value}</div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-5 w-5"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(params.data.player_id);
            }}
          >
            <Heart 
              className={`h-3 w-3 ${
                favorites.includes(params.data.player_id) 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-400 hover:text-red-500'
              }`} 
            />
          </Button>
        </div>
      )
    },
    {
      headerName: 'Game',
      field: 'opponent',
      pinned: 'left',
      width: 100,
      cellRenderer: (params) => {
        const opponent = params.value;
        const playerTeam = params.data.team;
        const week = params.data.week;
        
        // Mock scores for Week 4 2025 games (since they "already happened")
        const gameScores = {
          'DAL-GB': 'W 31-17', 'GB-DAL': 'L 17-31',
          'KC-BAL': 'W 27-20', 'BAL-KC': 'L 20-27',
          'BUF-NO': 'W 35-14', 'NO-BUF': 'L 14-35',
          'CIN-DEN': 'W 24-21', 'DEN-CIN': 'L 21-24',
          'CAR-NE': 'L 13-28', 'NE-CAR': 'W 28-13',
          'TEN-HOU': 'L 17-24', 'HOU-TEN': 'W 24-17'
        };
        
        const gameKey = `${playerTeam}-${opponent}`;
        const score = gameScores[gameKey] || `vs ${opponent}`;
        const isWin = score.startsWith('W');
        const isLoss = score.startsWith('L');
        
        return (
          <div className="py-1 px-2">
            <div className={`text-xs font-semibold ${
              isWin ? 'text-green-600' : isLoss ? 'text-red-600' : 'text-gray-700'
            }`}>
              {score}
            </div>
            <div className="text-xs text-gray-500">
              Week {week}
            </div>
          </div>
        );
      }
    }]
    },
    
    // Basic Stats Group
    {
      headerName: 'BASIC STATS',
      headerClass: 'basic-stats-group-header',
      children: [
        {
          headerName: 'Pos',
          field: 'position',
          width: 50,
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm font-medium text-blue-600">{params.value}</span>
            </div>
          )
        },
        {
          headerName: 'DK $',
          field: 'dk_salary',
          width: 70,
          type: 'numericColumn',
          cellRenderer: (params) => {
            const salary = params.value;
            // Only show DK salary for 2025 data
            if (params.data.season !== '2025') {
              return <div className="py-1 px-2 text-sm text-gray-400">-</div>;
            }
            if (salary && salary > 0) {
              return (
                <div className="py-1 px-2">
                  <span className="text-sm font-semibold text-green-700">
                    ${(salary/1000).toFixed(1)}k
                  </span>
                </div>
              );
            }
            return <div className="py-1 px-2 text-sm text-gray-400">-</div>;
          }
        },
        {
          headerName: '# Snaps',
          field: 'snap_percentage',
          width: 70,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm font-medium text-gray-800">
                {params.value && params.value > 0 ? Math.round(params.value) : '-'}
              </span>
            </div>
          )
        },
        {
          headerName: 'FPTS',
          field: 'fantasy_points',
          width: 80,
          type: 'numericColumn',
          valueGetter: (params) => calculateFantasyPoints(params.data),
          cellRenderer: (params) => {
            const points = parseFloat(params.value) || 0;
            const maxPoints = 35; // Max scale for progress bar
            const percentage = Math.min((points / maxPoints) * 100, 100);
            
            // Color coding based on performance
            let barColor = 'bg-red-400';
            let textColor = 'text-red-700';
            if (points >= 20) {
              barColor = 'bg-green-400';
              textColor = 'text-green-700';
            } else if (points >= 15) {
              barColor = 'bg-yellow-400';
              textColor = 'text-yellow-700';
            } else if (points >= 10) {
              barColor = 'bg-orange-400';
              textColor = 'text-orange-700';
            }
            
            return (
              <div className="py-1 px-2 w-full">
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${barColor}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className={`text-xs font-bold ${textColor}`}>
                    {points.toFixed(1)}
                  </div>
                </div>
              </div>
            );
          },
          sort: 'desc'
        }]
    },
    
    // Passing Stats Group
    {
      headerName: 'PASSING',
      headerClass: 'passing-group-header',
      children: [
        {
          headerName: 'Cmp-Att',
          field: 'passing_attempts',
          width: 75,
          type: 'numericColumn',
          cellClass: 'passing-group-cell',
          valueGetter: (params) => {
            const att = params.data.passing_yards > 0 ? Math.ceil(params.data.passing_yards / 8.5) : 0;
            const cmp = Math.ceil(att * 0.65); // Estimate completion rate
            return att > 0 ? `${cmp}-${att}` : '-';
          },
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm">{params.value}</span>
            </div>
          )
        },
        {
          headerName: 'Yds',
          field: 'passing_yards',
          width: 60,
          type: 'numericColumn',
          cellClass: 'passing-group-cell',
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm font-medium">{params.value || '-'}</span>
            </div>
          )
        },
        {
          headerName: 'TD',
          field: 'passing_tds', 
          width: 50,
          type: 'numericColumn',
          cellClass: 'passing-group-cell',
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm font-medium">{params.value || '-'}</span>
            </div>
          )
        },
        {
          headerName: 'Int.',
          field: 'interceptions',
          width: 50,
          type: 'numericColumn', 
          cellClass: 'passing-group-cell',
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm">{params.value || '-'}</span>
            </div>
          )
        }]
    },
    // Rushing Stats Group
    {
      headerName: 'RUSHING',
      headerClass: 'rushing-group-header',
      children: [
        {
          headerName: 'Att',
          field: 'rushing_attempts',
          width: 50,
          type: 'numericColumn',
          cellClass: 'rushing-group-cell',
          valueGetter: (params) => params.data.rushing_yards > 0 ? Math.ceil(params.data.rushing_yards / 4.5) : 0,
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm">{params.value || '-'}</span>
            </div>
          )
        },
        {
          headerName: 'Yds',
          field: 'rushing_yards',
          width: 60,
          type: 'numericColumn',
          cellClass: 'rushing-group-cell',
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm font-medium">{params.value || '-'}</span>
            </div>
          )
        },
        {
          headerName: 'TD',
          field: 'rushing_tds',
          width: 50,
          type: 'numericColumn',
          cellClass: 'rushing-group-cell',
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm font-medium">{params.value || '-'}</span>
            </div>
          )
        }]
    },
    // Receiving Stats Group
    {
      headerName: 'RECEIVING',
      headerClass: 'receiving-group-header',
      children: [
        {
          headerName: 'Tgt',
          field: 'targets',
          width: 50,
          type: 'numericColumn',
          cellClass: 'receiving-group-cell',
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm">{params.value || '-'}</span>
            </div>
          )
        },
        {
          headerName: 'Rec',
          field: 'receptions',
          width: 50,
          type: 'numericColumn',
          cellClass: 'receiving-group-cell',
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm font-medium">{params.value || '-'}</span>
            </div>
          )
        },
        {
          headerName: 'Yds',
          field: 'receiving_yards',
          width: 60,
          type: 'numericColumn',
          cellClass: 'receiving-group-cell',
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm font-medium">{params.value || '-'}</span>
            </div>
          )
        },
        {
          headerName: 'TD',
          field: 'receiving_tds',
          width: 50,
          type: 'numericColumn',
          cellClass: 'receiving-group-cell',
          cellRenderer: (params) => (
            <div className="py-1 px-2">
              <span className="text-sm font-medium">{params.value || '-'}</span>
            </div>
          )
        }]
    }
  ], [isPPR, calculateFantasyPoints, getPerformanceColor, handlePlayerClick, favorites]);

  // Default column configuration with tighter spacing - remove filter triangles
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: false, // Remove filter triangles
    resizable: true,
    minWidth: 40,
    cellStyle: { padding: '4px 6px' },
    suppressMenu: true // Remove column menu
  }), []);

  // Grid options for clean layout
  const gridOptions = useMemo(() => ({
    theme: 'legacy',
    rowHeight: 32,
    headerHeight: 36,
    rowSelection: 'none',
    pagination: true,
    paginationPageSize: 50,
    animateRows: false
  }), []);

  // Load historical DraftKings pricing
  const loadHistoricalPricing = async () => {
    setLoadingPricing(true);
    try {
      toast.info('Loading historical DraftKings pricing data...');
      const response = await axios.post(`${API}/load-historical-pricing`);
      
      if (response.data.success) {
        toast.success(`Successfully loaded ${response.data.records_processed} pricing records`);
        await fetchSummary();
        await fetchPlayers();
      } else {
        toast.error('Failed to load historical pricing data');
      }
    } catch (error) {
      console.error('Error loading historical pricing:', error);
      toast.error('Failed to load historical DraftKings pricing');
    } finally {
      setLoadingPricing(false);
    }
  };

  // Load snap counts for 2024 and 2025
  const loadSnapCounts = async () => {
    setLoadingSnapCounts(true);
    try {
      toast.info('Loading snap counts for 2024 and 2025...');
      const response = await axios.post(`${API}/load-snap-counts?seasons=2024&seasons=2025`);
      
      if (response.data.success) {
        toast.success(`Successfully loaded ${response.data.records_loaded} snap count records`);
        await fetchSummary();
        await fetchPlayers();
      } else {
        toast.error('Failed to load snap counts');
      }
    } catch (error) {
      console.error('Error loading snap counts:', error);
      toast.error('Failed to load snap counts data');
    } finally {
      setLoadingSnapCounts(false);
    }
  };

  // Fetch players data
  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/players`, { 
        params: { 
          ...filters, 
          limit: 1000 
        } 
      });
      
      const playersData = response.data || [];
      setPlayers(playersData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching players:', error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search functionality
  const filteredPlayers = useMemo(() => {
    let filtered = players;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(player => 
        player.player_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply position filter from player type buttons
    if (selectedPlayerType && selectedPlayerType !== 'all') {
      filtered = filtered.filter(player => 
        player.position.toLowerCase() === selectedPlayerType
      );
    }
    
    return filtered;
  }, [players, searchTerm, selectedPlayerType]);

  // Get active filters for display
  const getActiveFilters = () => {
    const active = [];
    if (filters.season !== '2024') active.push({ key: 'season', value: filters.season, label: `Season: ${filters.season}` });
    if (filters.week !== 'all') active.push({ key: 'week', value: filters.week, label: `Week: ${filters.week}` });
    if (filters.position !== 'all') active.push({ key: 'position', value: filters.position, label: `Position: ${filters.position}` });
    if (filters.team !== 'all') active.push({ key: 'team', value: filters.team, label: `Team: ${filters.team}` });
    if (filters.minSalary) active.push({ key: 'minSalary', value: filters.minSalary, label: `Min Salary: $${filters.minSalary}` });
    if (filters.minSnaps) active.push({ key: 'minSnaps', value: filters.minSnaps, label: `Min Snaps: ${filters.minSnaps}` });
    if (searchTerm) active.push({ key: 'search', value: searchTerm, label: `Search: "${searchTerm}"` });
    return active;
  };

  // Clear specific filter
  const clearFilter = (key) => {
    if (key === 'search') {
      setSearchTerm('');
    } else {
      const defaultValues = {
        season: '2024',
        week: 'all', 
        position: 'all',
        team: 'all',
        minSalary: '',
        minSnaps: ''
      };
      handleFilterChange(key, defaultValues[key] || '');
    }
  };

  // Toggle favorite player
  const toggleFavorite = (playerId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId];
      
      toast.success(
        newFavorites.includes(playerId) 
          ? 'Player added to favorites!' 
          : 'Player removed from favorites!'
      );
      
      return newFavorites;
    });
  };

  // Keyboard shortcuts
  const handleKeyboardShortcuts = useCallback((event) => {
    // Cmd/Ctrl + K for search focus
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      document.querySelector('input[placeholder*="Search"]')?.focus();
    }
    
    // Cmd/Ctrl + R for refresh (prevent browser refresh, use our refresh)
    if ((event.metaKey || event.ctrlKey) && event.key === 'r') {
      event.preventDefault();
      refreshData();
    }
    
    // Cmd/Ctrl + E for export
    if ((event.metaKey || event.ctrlKey) && event.key === 'e') {
      event.preventDefault();
      exportData();
    }
    
    // Escape to clear search
    if (event.key === 'Escape') {
      setSearchTerm('');
      setPlayerDetailOpen(false);
    }
  }, []);

  // Export data functionality
  const exportData = useCallback(() => {
    const csvData = filteredPlayers.map(player => ({
      Player: player.player_name,
      Team: player.team,
      Position: player.position,
      Fantasy_Points: calculateFantasyPoints(player),
      Snaps: player.snap_percentage,
      Rushing_Yards: player.rushing_yards || 0,
      Receiving_Yards: player.receiving_yards || 0,
      Passing_Yards: player.passing_yards || 0,
      DK_Salary: player.dk_salary || 0
    }));
    
    const csvString = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nfl-fantasy-data-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully!');
  }, [filteredPlayers, calculateFantasyPoints]);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcuts);
    return () => document.removeEventListener('keydown', handleKeyboardShortcuts);
  }, [handleKeyboardShortcuts]);

  // Fetch summary statistics
  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${API}/stats/summary`);
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
      toast.error('Failed to fetch summary data');
    }
  };

  // Refresh data from NFL sources
  const refreshData = async () => {
    setRefreshing(true);
    try {
      toast.info('Refreshing NFL data and snap counts from sources...');
      const response = await axios.post(`${API}/refresh-data?seasons=2024&seasons=2025`);
      
      if (response.data.success) {
        const message = `Successfully loaded ${response.data.records_loaded} player records${response.data.snap_records_loaded ? ` and ${response.data.snap_records_loaded} snap count records` : ''}`;
        toast.success(message);
        await fetchSummary();
        await fetchPlayers();
      } else {
        toast.error('Failed to refresh data');
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.error('Failed to refresh data from NFL sources');
    } finally {
      setRefreshing(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchPlayersWithFilters();
    fetchSummary();
  }, []);

  // PPR change handler
  useEffect(() => {
    if (players.length > 0) {
      // Re-trigger grid update when PPR changes since fantasy points are calculated
      setLastUpdated(new Date());
    }
  }, [isPPR]);

  // Refetch when filters change
  useEffect(() => {
    fetchPlayersWithFilters();
  }, [filters, selectedPlayerType]);

  // Fetch trend data
  const fetchTrendData = async () => {
    try {
      setLoading(true);
      const promises = [];
      
      // Fetch data for each week in the range
      for (let week = trendFilters.startWeek; week <= trendFilters.endWeek; week++) {
        const response = axios.get(`${API}/players`, {
          params: {
            season: trendFilters.season,
            week: week,
            team: trendFilters.team,
            limit: 100
          }
        });
        promises.push(response);
      }
      
      const results = await Promise.all(promises);
      
      // Process and combine the data
      const processedData = [];
      const playerMap = new Map();
      
      results.forEach((response, index) => {
        const weekNum = trendFilters.startWeek + index;
        const weekData = response.data || [];
        
        weekData.forEach(player => {
          const key = `${player.player_name}-${player.position}`;
          if (!playerMap.has(key)) {
            playerMap.set(key, {
              player_name: player.player_name,
              position: player.position,
              team: player.team,
              weeks: {}
            });
          }
          playerMap.get(key).weeks[weekNum] = {
            ...player,
            fantasy_points: parseFloat(calculateFantasyPoints(player)) || 0
          };
        });
      });
      
      // Convert to array and sort by position and name
      const trendArray = Array.from(playerMap.values()).sort((a, b) => {
        if (a.position !== b.position) {
          const posOrder = ['QB', 'RB', 'WR', 'TE'];
          return posOrder.indexOf(a.position) - posOrder.indexOf(b.position);
        }
        return a.player_name.localeCompare(b.player_name);
      });
      
      setTrendData(trendArray);
      
    } catch (error) {
      console.error('Error fetching trend data:', error);
      toast.error('Error loading trend data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch trend data when filters change
  useEffect(() => {
    if (activeTab === 'trend-tool') {
      fetchTrendData();
    }
  }, [trendFilters, activeTab]);

  // Column resize handler
  const handleColumnResize = (e, columnKey) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = parseInt(columnWidths[columnKey] || '50px');
    
    const handleMouseMove = (e) => {
      const newWidth = Math.max(25, startWidth + (e.clientX - startX));
      const newWidths = { ...columnWidths, [columnKey]: `${newWidth}px` };
      setColumnWidths(newWidths);
      localStorage.setItem('trendToolColumnWidths', JSON.stringify(newWidths));
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  // Handle filter changes with auto-apply
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    // Auto-apply filters after a short delay
    setTimeout(() => {
      fetchPlayersWithFilters(newFilters);
    }, 300);
  };

  // Separate function for fetching with specific filters
  const fetchPlayersWithFilters = async (filterParams = filters) => {
    try {
      setLoading(true);
      
      // Prepare clean parameters for backend
      const cleanParams = {
        season: filterParams.season,
        limit: 1000
      };
      
      // Add week if not 'all'
      if (filterParams.week && filterParams.week !== 'all') {
        cleanParams.week = filterParams.week;
      }
      
      // Add position if not 'all'
      if (filterParams.position && filterParams.position !== 'all') {
        cleanParams.position = filterParams.position;
      }
      
      // Add team if not 'all' 
      if (filterParams.team && filterParams.team !== 'all') {
        cleanParams.team = filterParams.team;
      }
      
      // Add salary filter if specified
      if (filterParams.minSalary) {
        cleanParams.minSalary = filterParams.minSalary;
      }
      
      // Add snaps filter if specified
      if (filterParams.minSnaps) {
        cleanParams.minSnaps = filterParams.minSnaps;
      }
      
      console.log('Fetching with params:', cleanParams);
      
      const response = await axios.get(`${API}/players`, { 
        params: cleanParams
      });
      
      const playersData = response.data || [];
      setPlayers(playersData);
      setLastUpdated(new Date());
      
      if (playersData.length === 0) {
        toast.info(`No players found for selected filters`, { duration: 2000 });
      } else {
        toast.success(`Loaded ${playersData.length} players`, { duration: 1500 });
      }
    } catch (error) {
      console.error('Error fetching players:', error);
      setPlayers([]);
      toast.error('Error loading player data', { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const PlayerTypeButton = ({ type, label, active, onClick }) => (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={() => onClick(type)}
      className={`text-xs px-3 py-1.5 h-8 ${
        active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
      data-testid={`player-type-${type}`}
    >
      {label}
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      
      {/* Professional Header with Texture */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl border-b-4 border-blue-500">
        <div className="relative overflow-hidden">
          {/* Texture overlay */}
          <div className="absolute inset-0 bg-black/20 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,_119,_198,_0.3),_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.02)_25%,_rgba(255,255,255,0.02)_50%,_transparent_50%,_transparent_75%,_rgba(255,255,255,0.02)_75%)] bg-[length:4px_4px]"></div>
          
          <div className="relative max-w-full mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg shadow-lg border border-blue-400/30">
                    <img 
                      src="https://static.vecteezy.com/system/resources/thumbnails/053/257/088/small/fantasy-football-logo-white-line-stars-and-shield-vector.jpg" 
                      alt="Fantasy Football Logo" 
                      className="h-8 w-8 object-contain filter brightness-0 invert"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">NFL Fantasy Analytics</h1>
                    <p className="text-blue-200 text-sm">Professional Grade Statistics Platform</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <Badge className="bg-blue-500/20 text-blue-100 border-blue-400 text-xs px-3 py-1">
                    DraftKings PPR
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-100 border-green-400 text-xs px-3 py-1">
                    Live Data
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg text-xs h-9"
                  onClick={() => {
                    refreshData();
                    toast.success('Refreshing data...', { duration: 1500 });
                  }}
                  disabled={refreshing}
                >
                  <RefreshCw className={`h-3 w-3 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Syncing...' : 'Sync Data (⌘R)'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Full Width */}
      <div className="flex-1 overflow-hidden">
        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-2">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('data-table')}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'data-table'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Data Table
            </button>
            <button
              onClick={() => setActiveTab('trend-tool')}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'trend-tool'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Trend Tool
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'data-table' && (
          <div className="flex h-full">
            {/* Left Sidebar Filters */}
            <div 
              className={`bg-gray-50 border-r border-gray-200 transition-all duration-300 ${filtersCollapsed ? 'w-16' : ''} flex-shrink-0 relative`}
              style={{ width: filtersCollapsed ? '64px' : `${sidebarWidth}px` }}
            >
              {/* Resize Handle */}
              {!filtersCollapsed && (
                <div
                  className="absolute right-0 top-0 w-1 h-full bg-gray-300 hover:bg-blue-500 cursor-col-resize transition-colors"
                  onMouseDown={(e) => {
                    setIsResizing(true);
                    const startX = e.clientX;
                    const startWidth = sidebarWidth;
                    
                    const handleMouseMove = (e) => {
                      const newWidth = Math.max(200, Math.min(500, startWidth + (e.clientX - startX)));
                      setSidebarWidth(newWidth);
                    };
                    
                    const handleMouseUp = () => {
                      setIsResizing(false);
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                />
              )}
              <div className="p-4 h-full">
                {/* Filter Toggle Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFiltersCollapsed(!filtersCollapsed)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 mb-4"
                >
                  <Filter className="h-4 w-4" />
                  {!filtersCollapsed && <span>Filters</span>}
                </Button>
                
                {!filtersCollapsed && (
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="space-y-4">
                      {/* Season Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
                        <Select value={filters.season} onValueChange={(value) => handleFilterChange('season', value)}>
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Week Range */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Week</label>
                        <Select value={filters.week} onValueChange={(value) => handleFilterChange('week', value)}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="4" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {Array.from({length: 18}, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Position Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pos</label>
                        <Select value={filters.position} onValueChange={(value) => handleFilterChange('position', value)}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="QB" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="QB">QB</SelectItem>
                            <SelectItem value="RB">RB</SelectItem>
                            <SelectItem value="WR">WR</SelectItem>
                            <SelectItem value="TE">TE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Team Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
                        <Select value={filters.team} onValueChange={(value) => handleFilterChange('team', value)}>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {Object.entries(NFL_TEAMS).map(([abbr, name]) => (
                              <SelectItem key={abbr} value={abbr}>{abbr}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Salary Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">$</label>
                        <Select value="all">
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* PPR Toggle */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Scoring</label>
                        <Select value={isPPR ? 'ppr' : 'half-ppr'} onValueChange={(value) => setIsPPR(value === 'ppr')}>
                          <SelectTrigger className="h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ppr">PPR</SelectItem>
                            <SelectItem value="half-ppr">Half PPR</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Auto-apply indicator */}
                    <div className="mt-4 flex justify-center">
                      <div className="text-xs text-gray-500">
                        <span className="inline-flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                          Auto-apply
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Data Table Content */}
            <div className="flex-1 p-6 flex gap-4 overflow-hidden">
              {/* Main Data Grid */}
              <Card 
                className="shadow-lg border-0 bg-white transition-all duration-300 ease-in-out" 
                style={{ 
                  width: playerDetailOpen ? '70%' : '100%'
                }}
              >
                <CardHeader className="pb-2 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Quick Stats */}
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          <Eye className="h-3 w-3 mr-1" />
                          {filteredPlayers.length.toLocaleString()} players
                        </Badge>
                        {favorites.length > 0 && (
                          <Badge variant="outline" className="text-xs px-2 py-1 bg-red-50 text-red-700 border-red-200">
                            <Heart className="h-3 w-3 mr-1" />
                            {favorites.length} favorites
                          </Badge>
                        )}
                        {lastUpdated && (
                          <Badge variant="outline" className="text-xs px-2 py-1 bg-green-50 text-green-700 border-green-200">
                            <Zap className="h-3 w-3 mr-1" />
                            Updated {new Date(lastUpdated).toLocaleTimeString()}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Search Input */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Search players, teams, positions... (⌘K)"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 w-80 text-sm border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {searchTerm && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            onClick={() => setSearchTerm('')}
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg text-xs h-8 px-3"
                      >
                        <Star className="h-3 w-3 mr-1" />
                        Favorites
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg text-xs h-8 px-3"
                        onClick={exportData}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Export CSV (⌘E)
                      </Button>
                      
                      {/* Keyboard Shortcuts Help */}
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs h-8 px-3"
                        onClick={() => toast.info(
                          '⌘K: Focus search • ⌘R: Refresh data • ⌘E: Export • Escape: Clear search',
                          { duration: 4000 }
                        )}
                      >
                        <Settings className="h-3 w-3 mr-1" />
                        Shortcuts
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {/* Clean Professional Grid */}
                  {loading ? (
                    <div className="p-6">
                      <div className="animate-pulse space-y-4">
                        {/* Header skeleton */}
                        <div className="flex space-x-4">
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                          <div className="h-4 bg-gray-200 rounded w-12"></div>
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                        {/* Data skeleton */}
                        {[...Array(15)].map((_, i) => (
                          <div key={i} className="flex space-x-4">
                            <div className="h-3 bg-gray-200 rounded w-32"></div>
                            <div className="h-3 bg-gray-200 rounded w-12"></div>
                            <div className="h-3 bg-gray-200 rounded w-8"></div>
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                            <div className="h-3 bg-gray-200 rounded w-12"></div>
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                            <div className="h-3 bg-gray-200 rounded w-12"></div>
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                            <div className="h-3 bg-gray-200 rounded w-12"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="ag-theme-alpine professional-grid compact-data-grid"
                      style={{ 
                        height: '600px', 
                        width: '100%'
                      }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs}
                        rowData={filteredPlayers}
                        defaultColDef={defaultColDef}
                        gridOptions={gridOptions}
                        onGridReady={onGridReady}
                        loading={loading}
                        data-testid="player-stats-grid"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Player Detail Panel */}
              {playerDetailOpen && selectedPlayer && (
                <Card 
                  className="w-[30%] shadow-xl border-l-4 border-blue-500"
                  style={{ minWidth: '300px' }}
                >
                  <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-base font-semibold">
                          {selectedPlayer?.player_name}
                        </CardTitle>
                        <Badge className="text-xs px-2 py-0.5 font-medium bg-blue-100 text-blue-800 border-blue-200">
                          {selectedPlayer?.position}
                        </Badge>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs h-7 w-7 p-0"
                        onClick={() => setPlayerDetailOpen(false)}
                      >
                        ×
                      </Button>
                    </div>
                    <CardDescription className="text-xs">
                      {selectedPlayer?.team} • Last 10 games from {filters.week === 'all' ? 'current season' : `Week ${filters.week}`} backwards
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 overflow-y-auto" style={{ height: '550px' }}>
                    {/* Player Stats Summary */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-semibold mb-2">Season Averages</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>Fantasy Pts: <span className="font-semibold text-green-600">{calculateFantasyPoints(selectedPlayer || {})}</span></div>
                        <div>Snap Count: <span className="font-semibold text-indigo-600">{selectedPlayer?.snap_percentage || 0}</span></div>
                      </div>
                    </div>
                    
                    {/* Game History */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Recent Games</h4>
                      <div className="space-y-2">
                        {playerGameHistory.length > 0 ? (
                          playerGameHistory.map((game, index) => (
                            <div key={index} className="p-3 bg-white border rounded-lg hover:shadow-md transition-shadow">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium">Week {game.week} vs {game.opponent}</span>
                                <span className="text-xs font-bold text-blue-600">
                                  {calculateFantasyPoints(game)} pts
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-1 text-xs text-gray-600">
                                {game.position === 'QB' && (
                                  <>
                                    <div>{game.passing_yards || 0} pass yds</div>
                                    <div>{game.passing_tds || 0} pass TD</div>
                                    <div>{game.interceptions || 0} INT</div>
                                  </>
                                )}
                                {(game.position === 'RB' || game.position === 'WR' || game.position === 'TE') && (
                                  <>
                                    <div>{game.receiving_yards || 0} rec yds</div>
                                    <div>{game.receptions || 0} rec</div>
                                    <div>{game.rushing_yards || 0} rush yds</div>
                                  </>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            <div className="text-sm">Loading game history...</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
        
        {/* Trend Tool Tab Content */}
        {activeTab === 'trend-tool' && (
          <div className="p-6 h-full flex flex-col">
            {/* Trend Tool Filters - Collapsible */}
            <div className="mb-4">
              <Card className="shadow-md">
                {/* Filter Header with Collapse Button */}
                <div 
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors border-b"
                  onClick={() => setTrendFiltersCollapsed(!trendFiltersCollapsed)}
                >
                  <div className="flex items-center space-x-3">
                    <Filter className="h-5 w-5 text-blue-600" />
                    <h2 className="text-md font-semibold text-gray-900">
                      Filters: {trendFilters.team} | Weeks {trendFilters.startWeek}-{trendFilters.endWeek} | {trendFilters.season}
                    </h2>
                    <Badge className="bg-blue-100 text-blue-800">
                      {trendData.length} Players
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* View Mode Toggle */}
                    <div className="flex items-center space-x-2 mr-4">
                      <span className="text-xs text-gray-600 font-medium">View:</span>
                      <div className="flex border border-gray-300 rounded-md overflow-hidden">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setTrendViewMode('summary');
                          }}
                          className={`px-3 py-1 text-xs font-medium transition-colors ${
                            trendViewMode === 'summary'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          Summary
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setTrendViewMode('full');
                          }}
                          className={`px-3 py-1 text-xs font-medium transition-colors border-l ${
                            trendViewMode === 'full'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          Full Detail
                        </button>
                      </div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      {trendFiltersCollapsed ? '▼' : '▲'}
                    </button>
                  </div>
                </div>
                
                {/* Filter Content - Collapsible */}
                {!trendFiltersCollapsed && (
                  <div className="p-4">
                    <div className="flex items-center space-x-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                        <Select 
                          value={trendFilters.team} 
                          onValueChange={(value) => setTrendFilters(prev => ({...prev, team: value}))}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(NFL_TEAMS).map(([abbr, name]) => (
                              <SelectItem key={abbr} value={abbr}>{abbr}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Week Range</label>
                        <div className="flex items-center space-x-2">
                          <Select 
                            value={trendFilters.startWeek.toString()} 
                            onValueChange={(value) => setTrendFilters(prev => ({...prev, startWeek: parseInt(value)}))}
                          >
                            <SelectTrigger className="w-16">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({length: 18}, (_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <span className="text-sm text-gray-500">to</span>
                          <Select 
                            value={trendFilters.endWeek.toString()} 
                            onValueChange={(value) => setTrendFilters(prev => ({...prev, endWeek: parseInt(value)}))}
                          >
                            <SelectTrigger className="w-16">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({length: 18}, (_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
                        <Select 
                          value={trendFilters.season} 
                          onValueChange={(value) => setTrendFilters(prev => ({...prev, season: value}))}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex-1"></div>
                      
                      <div className="text-xs text-gray-500">
                        <div className="bg-blue-50 px-3 py-2 rounded border border-blue-200">
                          <div className="font-medium text-blue-900">💡 Week-to-Week Comparison</div>
                          <div className="text-blue-700 mt-1">Compare player performance across selected weeks</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Trend Data Table */}
            <Card className="flex-1 overflow-hidden">
              <CardContent className="p-0 h-full">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading trend data...</p>
                  </div>
                ) : (
                  <div className="h-full overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100">
                    <div className="h-full overflow-x-auto overflow-y-auto shadow-inner">
                      <table className="min-w-full border-collapse text-xs font-sans bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead className="sticky top-0 z-30">
                          {/* Week Headers Row */}
                          <tr className="bg-gradient-to-r from-slate-800 to-slate-900">
                            <th rowSpan="3" className="sticky left-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-center w-16 z-30 shadow-lg border-r-2 border-slate-300">
                              <div className="py-3">Pos</div>
                            </th>
                            <th rowSpan="3" className="sticky left-16 bg-white text-slate-800 font-bold text-left w-40 z-30 shadow-lg border-r-2 border-slate-300 pl-3">
                              <div className="py-3">Player</div>
                            </th>
                            {Array.from({length: trendFilters.endWeek - trendFilters.startWeek + 1}, (_, i) => {
                              const week = trendFilters.startWeek + i;
                              const gameResults = {
                                // NYG 2025 Schedule
                                'NYG-1': { opponent: 'vs MIN', result: 'L', score: '6-28' },
                                'NYG-2': { opponent: '@WAS', result: 'W', score: '21-18' }, 
                                'NYG-3': { opponent: 'vs CLE', result: 'W', score: '21-15' },
                                'NYG-4': { opponent: 'vs DAL', result: 'L', score: '15-20' },
                                'NYG-5': { opponent: '@SEA', result: 'L', score: '17-29' },
                                'NYG-6': { opponent: 'vs CIN', result: 'W', score: '17-7' },
                                // DAL 2025 Schedule  
                                'DAL-1': { opponent: '@CLE', result: 'W', score: '33-17' },
                                'DAL-2': { opponent: 'vs NO', result: 'W', score: '44-19' },
                                'DAL-3': { opponent: '@BAL', result: 'L', score: '25-28' },
                                'DAL-4': { opponent: '@NYG', result: 'W', score: '20-15' },
                                'DAL-5': { opponent: 'vs PIT', result: 'W', score: '20-17' },
                                'DAL-6': { opponent: '@DET', result: 'L', score: '38-47' },
                                // Other teams - add more as needed
                                'KC-1': { opponent: 'vs BAL', result: 'W', score: '27-20' },
                                'KC-2': { opponent: '@CIN', result: 'W', score: '26-25' },
                                'KC-3': { opponent: 'vs ATL', result: 'W', score: '22-17' }
                              };
                              const game = gameResults[`${trendFilters.team}-${week}`] || { opponent: `vs OPP`, result: 'TBD', score: '' };
                              
                              // Calculate colspan based on view mode
                              const colSpan = trendViewMode === 'summary' ? 4 : 11;
                              
                              return (
                                <th key={week} colSpan={colSpan} className="bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold text-center border-l-4 border-slate-700 px-3 py-2 relative group">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1 text-center">
                                      <div className="font-bold text-base">Week {week}</div>
                                      <div className="text-xs text-slate-300 mt-0.5">{game.opponent}</div>
                                      {game.result && game.result !== 'TBD' && (
                                        <div className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${
                                          game.result === 'W' 
                                            ? 'bg-green-500 text-green-100' 
                                            : 'bg-red-500 text-red-100'
                                        }`}>
                                          {game.result} {game.score}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </th>
                              );
                            })}
                          </tr>
                          
                          {/* Individual Stat Headers Row */}
                          <tr className="bg-slate-100">
                            {Array.from({length: trendFilters.endWeek - trendFilters.startWeek + 1}, (_, i) => {
                              const week = trendFilters.startWeek + i;
                              
                              return (
                                <React.Fragment key={i}>
                                  {trendViewMode === 'summary' ? (
                                    // Summary View - Only 4 columns
                                    <>
                                      <th className="bg-amber-50 text-slate-700 font-semibold text-center text-xs py-2 border border-slate-300 w-16">
                                        <div className="font-bold">DK $</div>
                                      </th>
                                      <th className="bg-blue-50 text-slate-700 font-semibold text-center text-xs py-2 border border-slate-300 w-14">
                                        <div className="font-bold">Snaps</div>
                                      </th>
                                      <th className="bg-green-50 text-slate-700 font-semibold text-center text-xs py-2 border border-slate-300 w-16">
                                        <div className="font-bold">FPTS</div>
                                      </th>
                                      <th className="bg-purple-50 text-slate-700 font-semibold text-center text-xs py-2 border border-slate-300 w-12">
                                        <div className="font-bold">Rank</div>
                                      </th>
                                    </>
                                  ) : (
                                    // Full Detail View - All 11 columns
                                    <>
                                      {/* Misc */}
                                      <th className="bg-amber-50 text-slate-700 font-semibold text-center text-xs py-1 border border-slate-200 w-12">$</th>
                                      <th className="bg-amber-50 text-slate-700 font-semibold text-center text-xs py-1 border border-slate-200 w-8">#</th>
                                      {/* Pass/Rec Combined - Space Saving */}
                                      <th className="bg-blue-50 text-slate-700 font-semibold text-center text-xs py-1 border border-slate-200 w-14">
                                        <div>Cmp-Att</div>
                                        <div className="text-xs text-slate-500">Tgts</div>
                                      </th>
                                      <th className="bg-blue-50 text-slate-700 font-semibold text-center text-xs py-1 border border-slate-200 w-12">
                                        <div>P.Yds</div>
                                        <div className="text-xs text-slate-500">Rec</div>
                                      </th>
                                      <th className="bg-blue-50 text-slate-700 font-semibold text-center text-xs py-1 border border-slate-200 w-12">
                                        <div>P.TD</div>
                                        <div className="text-xs text-slate-500">R.Yds</div>
                                      </th>
                                      <th className="bg-blue-50 text-slate-700 font-semibold text-center text-xs py-1 border border-slate-200 w-8">
                                        <div>Int</div>
                                        <div className="text-xs text-slate-500">R.TD</div>
                                      </th>
                                      {/* Rush */}
                                      <th className="bg-green-50 text-slate-700 font-semibold text-center text-xs py-1 border border-slate-200 w-8">Att</th>
                                      <th className="bg-green-50 text-slate-700 font-semibold text-center text-xs py-1 border border-slate-200 w-12">Yds</th>
                                      <th className="bg-green-50 text-slate-700 font-semibold text-center text-xs py-1 border border-slate-200 w-8">TD</th>
                                      {/* Fantasy */}
                                      <th className="bg-purple-50 text-slate-700 font-semibold text-center text-xs py-1 border border-slate-200 w-12">FPTS</th>
                                      <th className="bg-purple-50 text-slate-700 font-semibold text-center text-xs py-1 border border-slate-200 w-8">Rnk</th>
                                    </>
                                  )
                                  }
                                </React.Fragment>
                              );
                            })}
                          </tr>
                        </thead>
                      
                      <tbody>
                          {/* QB Section */}
                          {trendData.filter(player => player.position === 'QB').length > 0 && (
                            <>
                              {/* QB Position Header */}
                              <tr className="bg-blue-50 border-t-2 border-blue-300">
                                <td colSpan="2" className="py-2 px-3 font-bold text-blue-900 text-sm">
                                  🏈 QUARTERBACKS ({trendData.filter(p => p.position === 'QB').length})
                                </td>
                                {/* Repeating column headers for QB section */}
                                {Array.from({length: trendFilters.endWeek - trendFilters.startWeek + 1}, (_, i) => {
                                  const week = trendFilters.startWeek + i;
                                  const colSpan = trendViewMode === 'summary' ? 4 : 11;
                                  return (
                                    <td key={week} colSpan={colSpan} className="text-center py-1 px-1">
                                      <div className="grid" style={{gridTemplateColumns: trendViewMode === 'summary' ? 'repeat(4, 1fr)' : 'repeat(11, 1fr)', gap: '0px'}}>
                                        {trendViewMode === 'summary' ? (
                                          <>
                                            <div className="text-[10px] font-semibold text-slate-700 px-1">$</div>
                                            <div className="text-[10px] font-semibold text-slate-700 px-1">Snaps</div>
                                            <div className="text-[10px] font-semibold text-slate-700 px-1">FPTS</div>
                                            <div className="text-[10px] font-semibold text-slate-700 px-1">Rnk</div>
                                          </>
                                        ) : (
                                          <>
                                            <div className="text-[10px] font-semibold text-slate-700">$</div>
                                            <div className="text-[10px] font-semibold text-slate-700">#</div>
                                            <div className="text-[10px] font-semibold text-slate-700">CMP</div>
                                            <div className="text-[10px] font-semibold text-slate-700">P.YD</div>
                                            <div className="text-[10px] font-semibold text-slate-700">P.TD</div>
                                            <div className="text-[10px] font-semibold text-slate-700">INT</div>
                                            <div className="text-[10px] font-semibold text-slate-700">ATT</div>
                                            <div className="text-[10px] font-semibold text-slate-700">R.YD</div>
                                            <div className="text-[10px] font-semibold text-slate-700">R.TD</div>
                                            <div className="text-[10px] font-semibold text-slate-700">FPT</div>
                                            <div className="text-[10px] font-semibold text-slate-700">RNK</div>
                                          </>
                                        )}
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                              {trendData.filter(player => player.position === 'QB').map((player, playerIndex, qbPlayers) => {
                                return (
                                  <tr key={`QB-${player.player_name}`} className="bg-blue-50/30 hover:bg-blue-100/50 transition-colors border-b border-blue-100">
                                    <td className="sticky left-0 bg-blue-500 text-white font-bold text-center text-xs w-12 z-20">
                                      QB
                                    </td>
                                    <td className="sticky left-12 bg-gradient-to-r from-blue-50/90 to-white text-slate-900 font-medium text-left border-r border-blue-200 pl-3 z-20 py-2 min-w-[140px]">
                                      {player.player_name}
                                    </td>
                                    
                                    {/* Week Data */}
                                    {Array.from({length: trendFilters.endWeek - trendFilters.startWeek + 1}, (_, i) => {
                                      const week = trendFilters.startWeek + i;
                                      
                                      const weekData = player.weeks[week];
                                      const passingAttempts = weekData ? Math.ceil((weekData.passing_yards || 0) / 8.5) : 0;
                                      const passingCompletions = weekData ? Math.ceil(passingAttempts * 0.65) : 0;
                                      const rushingAttempts = weekData ? Math.ceil((weekData.rushing_yards || 0) / 4.5) : 0;
                                      const fantasyPoints = weekData ? (weekData.fantasy_points || 0) : 0;
                                      
                                      return (
                                        <React.Fragment key={week}>
                                          {trendViewMode === 'summary' ? (
                                            // Summary View - Only 4 columns
                                            <>
                                              <td className="text-center border border-slate-200 text-xs bg-amber-25 py-2">
                                                {weekData?.dk_salary ? `$${(weekData.dk_salary/1000).toFixed(1)}k` : '-'}
                                              </td>
                                              <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2 font-medium">
                                                {weekData?.snap_count || weekData?.snap_percentage || '-'}
                                              </td>
                                              <td className={`text-center border border-slate-200 text-xs py-2 font-bold ${
                                                fantasyPoints >= 25 ? 'bg-green-200 text-green-800' :
                                                fantasyPoints >= 20 ? 'bg-green-100 text-green-700' :
                                                fantasyPoints >= 15 ? 'bg-yellow-100 text-yellow-700' :
                                                fantasyPoints >= 10 ? 'bg-orange-100 text-orange-700' :
                                                fantasyPoints > 0 ? 'bg-red-100 text-red-700' : 'bg-green-25'
                                              }`}>
                                                {weekData ? fantasyPoints.toFixed(1) : '-'}
                                              </td>
                                              <td className="text-center border border-slate-200 text-xs bg-purple-25 py-2">
                                                {weekData ? (weekData.position_rank || '-') : '-'}
                                              </td>
                                            </>
                                          ) : (
                                            // Full Detail View - All 11 columns
                                            <>
                                              {/* Misc */}
                                              <td className="text-center border border-slate-200 text-xs bg-amber-25 py-2">
                                                {weekData?.dk_salary ? `$${(weekData.dk_salary/1000).toFixed(1)}k` : ''}
                                              </td>
                                              <td className="text-center border border-slate-200 text-xs bg-amber-25 py-2 font-medium">
                                                {weekData?.snap_count || weekData?.snap_percentage || ''}
                                              </td>
                                              {/* Pass/Rec Combined */}
                                              <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2">
                                                <div>{weekData && weekData.passing_yards > 0 ? `${passingCompletions}-${passingAttempts}` : ''}</div>
                                                <div className="text-xs text-slate-500">{weekData && weekData.targets > 0 ? weekData.targets : ''}</div>
                                              </td>
                                              <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2">
                                                <div className="font-medium">{weekData && weekData.passing_yards > 0 ? weekData.passing_yards : ''}</div>
                                                <div className="text-xs text-slate-500">{weekData && weekData.receptions > 0 ? weekData.receptions : ''}</div>
                                              </td>
                                              <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2">
                                                <div className="font-medium">{weekData && weekData.passing_tds > 0 ? weekData.passing_tds : ''}</div>
                                                <div className="text-xs text-slate-500">{weekData && weekData.receiving_yards > 0 ? weekData.receiving_yards : ''}</div>
                                              </td>
                                              <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2">
                                                <div>{weekData && weekData.interceptions > 0 ? weekData.interceptions : ''}</div>
                                                <div className="text-xs text-slate-500">{weekData && weekData.receiving_tds > 0 ? weekData.receiving_tds : ''}</div>
                                              </td>
                                              {/* Rush */}
                                              <td className="text-center border border-slate-200 text-xs bg-green-25 py-2">{weekData && weekData.rushing_yards > 0 ? rushingAttempts : ''}</td>
                                              <td className="text-center border border-slate-200 text-xs bg-green-25 py-2 font-medium">{weekData && weekData.rushing_yards > 0 ? weekData.rushing_yards : ''}</td>
                                              <td className="text-center border border-slate-200 text-xs bg-green-25 py-2 font-medium">{weekData && weekData.rushing_tds > 0 ? weekData.rushing_tds : ''}</td>
                                              {/* Fantasy */}
                                              <td className={`text-center border border-slate-200 text-xs py-2 font-bold ${
                                                fantasyPoints >= 25 ? 'bg-green-200 text-green-800' :
                                                fantasyPoints >= 20 ? 'bg-green-100 text-green-700' :
                                                fantasyPoints >= 15 ? 'bg-yellow-100 text-yellow-700' :
                                                fantasyPoints >= 10 ? 'bg-orange-100 text-orange-700' :
                                                fantasyPoints > 0 ? 'bg-red-100 text-red-700' : 'bg-purple-25'
                                              }`}>
                                                {weekData ? fantasyPoints.toFixed(1) : ''}
                                              </td>
                                              <td className="text-center border border-slate-200 text-xs bg-purple-25 py-2">
                                                {weekData ? (weekData.position_rank || '-') : '-'}
                                              </td>
                                            </>
                                          )
                                        }
                                        </React.Fragment>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </>
                          )}
                        
                        {/* RB Section */}
                        {trendData.filter(player => player.position === 'RB').length > 0 && (
                          <>
                            {/* RB Position Header */}
                            <tr className="bg-emerald-50 border-t-2 border-emerald-300">
                              <td colSpan="2" className="py-2 px-3 font-bold text-emerald-900 text-sm">
                                💪 RUNNING BACKS ({trendData.filter(p => p.position === 'RB').length})
                              </td>
                              {/* Repeating column headers for RB section */}
                              {Array.from({length: trendFilters.endWeek - trendFilters.startWeek + 1}, (_, i) => {
                                const week = trendFilters.startWeek + i;
                                const colSpan = trendViewMode === 'summary' ? 4 : 11;
                                return (
                                  <td key={week} colSpan={colSpan} className="text-center py-1 px-1">
                                    <div className="grid" style={{gridTemplateColumns: trendViewMode === 'summary' ? 'repeat(4, 1fr)' : 'repeat(11, 1fr)', gap: '0px'}}>
                                      {trendViewMode === 'summary' ? (
                                        <>
                                          <div className="text-[10px] font-semibold text-slate-700 px-1">$</div>
                                          <div className="text-[10px] font-semibold text-slate-700 px-1">Snaps</div>
                                          <div className="text-[10px] font-semibold text-slate-700 px-1">FPTS</div>
                                          <div className="text-[10px] font-semibold text-slate-700 px-1">Rnk</div>
                                        </>
                                      ) : (
                                        <>
                                          <div className="text-[10px] font-semibold text-slate-700">$</div>
                                          <div className="text-[10px] font-semibold text-slate-700">#</div>
                                          <div className="text-[10px] font-semibold text-slate-700">TGT</div>
                                          <div className="text-[10px] font-semibold text-slate-700">REC</div>
                                          <div className="text-[10px] font-semibold text-slate-700">R.YD</div>
                                          <div className="text-[10px] font-semibold text-slate-700">R.TD</div>
                                          <div className="text-[10px] font-semibold text-slate-700">ATT</div>
                                          <div className="text-[10px] font-semibold text-slate-700">RU.Y</div>
                                          <div className="text-[10px] font-semibold text-slate-700">RU.T</div>
                                          <div className="text-[10px] font-semibold text-slate-700">FPT</div>
                                          <div className="text-[10px] font-semibold text-slate-700">RNK</div>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                            {trendData.filter(player => player.position === 'RB').map((player, playerIndex, rbPlayers) => {
                              return (
                                <tr key={`RB-${player.player_name}`} className="bg-emerald-50/30 hover:bg-emerald-100/50 transition-colors border-b border-emerald-100">
                                  <td className="sticky left-0 bg-emerald-500 text-white font-bold text-center text-xs w-12 z-20">
                                    RB
                                  </td>
                                  <td className="sticky left-12 bg-gradient-to-r from-emerald-50/90 to-white text-slate-900 font-medium text-left border-r border-emerald-200 pl-3 z-20 py-2 min-w-[140px]">
                                    {player.player_name}
                                  </td>
                                  
                                  {/* Week Data */}
                                  {Array.from({length: trendFilters.endWeek - trendFilters.startWeek + 1}, (_, i) => {
                                    const week = trendFilters.startWeek + i;
                                    
                                    const weekData = player.weeks[week];
                                    const passingAttempts = weekData ? Math.ceil((weekData.passing_yards || 0) / 8.5) : 0;
                                    const passingCompletions = weekData ? Math.ceil(passingAttempts * 0.65) : 0;
                                    const rushingAttempts = weekData ? Math.ceil((weekData.rushing_yards || 0) / 4.5) : 0;
                                    const fantasyPoints = weekData ? (weekData.fantasy_points || 0) : 0;
                                    
                                    return (
                                      <React.Fragment key={week}>
                                        {trendViewMode === 'summary' ? (
                                          // Summary View - Only 4 columns
                                          <>
                                            <td className="text-center border border-slate-200 text-xs bg-amber-25 py-2">
                                              {weekData?.dk_salary ? `$${(weekData.dk_salary/1000).toFixed(1)}k` : '-'}
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2 font-medium">
                                              {weekData?.snap_count || weekData?.snap_percentage || '-'}
                                            </td>
                                            <td className={`text-center border border-slate-200 text-xs py-2 font-bold ${
                                              fantasyPoints >= 20 ? 'bg-green-200 text-green-800' :
                                              fantasyPoints >= 15 ? 'bg-green-100 text-green-700' :
                                              fantasyPoints >= 10 ? 'bg-yellow-100 text-yellow-700' :
                                              fantasyPoints >= 5 ? 'bg-orange-100 text-orange-700' :
                                              fantasyPoints > 0 ? 'bg-red-100 text-red-700' : 'bg-green-25'
                                            }`}>
                                              {weekData ? fantasyPoints.toFixed(1) : '-'}
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-purple-25 py-2">
                                              {weekData ? (weekData.position_rank || '-') : '-'}
                                            </td>
                                          </>
                                        ) : (
                                          // Full Detail View - All 11 columns
                                          <>
                                            {/* Misc */}
                                            <td className="text-center border border-slate-200 text-xs bg-amber-25 py-2">
                                              {weekData?.dk_salary ? `$${(weekData.dk_salary/1000).toFixed(1)}k` : ''}
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-amber-25 py-2 font-medium">
                                              {weekData?.snap_count || weekData?.snap_percentage || ''}
                                            </td>
                                            {/* Pass/Rec Combined */}
                                            <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2">
                                              <div>{weekData && weekData.passing_yards > 0 ? `${passingCompletions}-${passingAttempts}` : ''}</div>
                                              <div className="text-xs text-slate-500 font-medium">{weekData && weekData.targets > 0 ? weekData.targets : ''}</div>
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2">
                                              <div className="font-medium">{weekData && weekData.passing_yards > 0 ? weekData.passing_yards : ''}</div>
                                              <div className="text-xs text-slate-500 font-medium">{weekData && weekData.receptions > 0 ? weekData.receptions : ''}</div>
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2">
                                              <div className="font-medium">{weekData && weekData.passing_tds > 0 ? weekData.passing_tds : ''}</div>
                                              <div className="text-xs text-slate-500 font-medium">{weekData && weekData.receiving_yards > 0 ? weekData.receiving_yards : ''}</div>
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2">
                                              <div>{weekData && weekData.interceptions > 0 ? weekData.interceptions : ''}</div>
                                              <div className="text-xs text-slate-500 font-medium">{weekData && weekData.receiving_tds > 0 ? weekData.receiving_tds : ''}</div>
                                            </td>
                                            {/* Rush */}
                                            <td className="text-center border border-slate-200 text-xs bg-green-25 py-2 font-medium">{weekData && weekData.rushing_yards > 0 ? rushingAttempts : ''}</td>
                                            <td className="text-center border border-slate-200 text-xs bg-green-25 py-2 font-bold">{weekData && weekData.rushing_yards > 0 ? weekData.rushing_yards : ''}</td>
                                            <td className="text-center border border-slate-200 text-xs bg-green-25 py-2 font-bold">{weekData && weekData.rushing_tds > 0 ? weekData.rushing_tds : ''}</td>
                                            {/* Fantasy */}
                                            <td className={`text-center border border-slate-200 text-xs py-2 font-bold ${
                                              fantasyPoints >= 25 ? 'bg-green-200 text-green-800' :
                                              fantasyPoints >= 20 ? 'bg-green-100 text-green-700' :
                                              fantasyPoints >= 15 ? 'bg-yellow-100 text-yellow-700' :
                                              fantasyPoints >= 10 ? 'bg-orange-100 text-orange-700' :
                                              fantasyPoints > 0 ? 'bg-red-100 text-red-700' : 'bg-purple-25'
                                            }`}>
                                              {weekData ? fantasyPoints.toFixed(1) : ''}
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-purple-25 py-2">
                                              {weekData ? (weekData.position_rank || '-') : '-'}
                                            </td>
                                          </>
                                        )
                                        }
                                      </React.Fragment>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </>
                        )}
                        
                        {/* WR Section */}
                        {trendData.filter(player => player.position === 'WR').length > 0 && (
                          <>
                            {/* WR Position Header */}
                            <tr className="bg-sky-50 border-t-2 border-sky-300">
                              <td colSpan="2" className="py-2 px-3 font-bold text-sky-900 text-sm">
                                🎯 WIDE RECEIVERS ({trendData.filter(p => p.position === 'WR').length})
                              </td>
                              {/* Repeating column headers for WR section */}
                              {Array.from({length: trendFilters.endWeek - trendFilters.startWeek + 1}, (_, i) => {
                                const week = trendFilters.startWeek + i;
                                const colSpan = trendViewMode === 'summary' ? 4 : 11;
                                return (
                                  <td key={week} colSpan={colSpan} className="text-center py-1 px-1">
                                    <div className="grid" style={{gridTemplateColumns: trendViewMode === 'summary' ? 'repeat(4, 1fr)' : 'repeat(11, 1fr)', gap: '0px'}}>
                                      {trendViewMode === 'summary' ? (
                                        <>
                                          <div className="text-[10px] font-semibold text-slate-700 px-1">$</div>
                                          <div className="text-[10px] font-semibold text-slate-700 px-1">Snaps</div>
                                          <div className="text-[10px] font-semibold text-slate-700 px-1">FPTS</div>
                                          <div className="text-[10px] font-semibold text-slate-700 px-1">Rnk</div>
                                        </>
                                      ) : (
                                        <>
                                          <div className="text-[10px] font-semibold text-slate-700">$</div>
                                          <div className="text-[10px] font-semibold text-slate-700">#</div>
                                          <div className="text-[10px] font-semibold text-slate-700">TGT</div>
                                          <div className="text-[10px] font-semibold text-slate-700">REC</div>
                                          <div className="text-[10px] font-semibold text-slate-700">YDS</div>
                                          <div className="text-[10px] font-semibold text-slate-700">TD</div>
                                          <div className="text-[10px] font-semibold text-slate-700">ATT</div>
                                          <div className="text-[10px] font-semibold text-slate-700">R.YD</div>
                                          <div className="text-[10px] font-semibold text-slate-700">R.TD</div>
                                          <div className="text-[10px] font-semibold text-slate-700">FPT</div>
                                          <div className="text-[10px] font-semibold text-slate-700">RNK</div>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                            {trendData.filter(player => player.position === 'WR').map((player, playerIndex, wrPlayers) => {
                              return (
                                <tr key={`WR-${player.player_name}`} className="bg-sky-50/30 hover:bg-sky-100/50 transition-colors border-b border-sky-100">
                                  <td className="sticky left-0 bg-sky-500 text-white font-bold text-center text-xs w-12 z-20">
                                    WR
                                  </td>
                                  <td className="sticky left-12 bg-gradient-to-r from-sky-50/90 to-white text-slate-900 font-medium text-left border-r border-sky-200 pl-3 z-20 py-2 min-w-[140px]">
                                    {player.player_name}
                                  </td>
                              
                              {/* Week Data */}
                              {Array.from({length: trendFilters.endWeek - trendFilters.startWeek + 1}, (_, i) => {
                                const week = trendFilters.startWeek + i;
                                const weekData = player.weeks[week];
                                const passingAttempts = weekData ? Math.ceil((weekData.passing_yards || 0) / 8.5) : 0;
                                const passingCompletions = weekData ? Math.ceil(passingAttempts * 0.65) : 0;
                                const rushingAttempts = weekData ? Math.ceil((weekData.rushing_yards || 0) / 4.5) : 0;
                                
                                return (
                                  <React.Fragment key={week}>
                                    <td className="text-center border-dotted border border-gray-300 text-xs">{weekData?.dk_salary ? `$${weekData.dk_salary}` : ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs">{weekData?.snap_count || weekData?.snap_percentage || ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs">{weekData && weekData.passing_yards > 0 ? `${passingCompletions}-${passingAttempts}` : ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs font-medium">{weekData && weekData.passing_yards > 0 ? weekData.passing_yards : ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs">{weekData && weekData.passing_tds > 0 ? weekData.passing_tds : ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs">{weekData && weekData.interceptions > 0 ? weekData.interceptions : ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs">{weekData && weekData.targets > 0 ? weekData.targets : ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs">{weekData && weekData.receptions > 0 ? weekData.receptions : ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs">{weekData && weekData.receiving_yards > 0 ? weekData.receiving_yards : ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs">{weekData && weekData.receiving_tds > 0 ? weekData.receiving_tds : ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs">{weekData && weekData.rushing_yards > 0 ? rushingAttempts : ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs">{weekData && weekData.rushing_yards > 0 ? weekData.rushing_yards : ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs">{weekData && weekData.rushing_tds > 0 ? weekData.rushing_tds : ''}</td>
                                    <td className="text-center border-dotted border border-gray-300 text-xs font-bold">{weekData ? (weekData.fantasy_points || 0).toFixed(1) : ''}</td>
                                  </React.Fragment>
                                );
                              })}
                            </tr>
                          );
                        })}
                          </>
                        )}
                        
                        {/* TE Section */}
                        {trendData.filter(player => player.position === 'TE').length > 0 && (
                          <>
                            {/* TE Position Header */}
                            <tr className="bg-amber-50 border-t-2 border-amber-300">
                              <td colSpan="2" className="py-2 px-3 font-bold text-amber-900 text-sm">
                                🏈 TIGHT ENDS ({trendData.filter(p => p.position === 'TE').length})
                              </td>
                              {/* Repeating column headers for TE section */}
                              {Array.from({length: trendFilters.endWeek - trendFilters.startWeek + 1}, (_, i) => {
                                const week = trendFilters.startWeek + i;
                                const colSpan = trendViewMode === 'summary' ? 4 : 11;
                                return (
                                  <td key={week} colSpan={colSpan} className="text-center py-1 px-1">
                                    <div className="grid" style={{gridTemplateColumns: trendViewMode === 'summary' ? 'repeat(4, 1fr)' : 'repeat(11, 1fr)', gap: '0px'}}>
                                      {trendViewMode === 'summary' ? (
                                        <>
                                          <div className="text-[10px] font-semibold text-slate-700 px-1">$</div>
                                          <div className="text-[10px] font-semibold text-slate-700 px-1">Snaps</div>
                                          <div className="text-[10px] font-semibold text-slate-700 px-1">FPTS</div>
                                          <div className="text-[10px] font-semibold text-slate-700 px-1">Rnk</div>
                                        </>
                                      ) : (
                                        <>
                                          <div className="text-[10px] font-semibold text-slate-700">$</div>
                                          <div className="text-[10px] font-semibold text-slate-700">#</div>
                                          <div className="text-[10px] font-semibold text-slate-700">TGT</div>
                                          <div className="text-[10px] font-semibold text-slate-700">REC</div>
                                          <div className="text-[10px] font-semibold text-slate-700">YDS</div>
                                          <div className="text-[10px] font-semibold text-slate-700">TD</div>
                                          <div className="text-[10px] font-semibold text-slate-700">ATT</div>
                                          <div className="text-[10px] font-semibold text-slate-700">R.YD</div>
                                          <div className="text-[10px] font-semibold text-slate-700">R.TD</div>
                                          <div className="text-[10px] font-semibold text-slate-700">FPT</div>
                                          <div className="text-[10px] font-semibold text-slate-700">RNK</div>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                            {trendData.filter(player => player.position === 'TE').map((player, playerIndex, tePlayers) => {
                              return (
                                <tr key={`TE-${player.player_name}`} className="bg-amber-50/30 hover:bg-amber-100/50 transition-colors border-b border-amber-100">
                                  <td className="sticky left-0 bg-amber-500 text-white font-bold text-center text-xs w-12 z-20">
                                    TE
                                  </td>
                                  <td className="sticky left-12 bg-gradient-to-r from-amber-50/90 to-white text-slate-900 font-medium text-left border-r border-amber-200 pl-3 z-20 py-2 min-w-[140px]">
                                    {player.player_name}
                                  </td>
                                  
                                  {/* Week Data */}
                                  {Array.from({length: trendFilters.endWeek - trendFilters.startWeek + 1}, (_, i) => {
                                    const week = trendFilters.startWeek + i;
                                    
                                    const weekData = player.weeks[week];
                                    const passingAttempts = weekData ? Math.ceil((weekData.passing_yards || 0) / 8.5) : 0;
                                    const passingCompletions = weekData ? Math.ceil(passingAttempts * 0.65) : 0;
                                    const rushingAttempts = weekData ? Math.ceil((weekData.rushing_yards || 0) / 4.5) : 0;
                                    const fantasyPoints = weekData ? (weekData.fantasy_points || 0) : 0;
                                    
                                    return (
                                      <React.Fragment key={week}>
                                        {trendViewMode === 'summary' ? (
                                          // Summary View - Only 4 columns
                                          <>
                                            <td className="text-center border border-slate-200 text-xs bg-amber-25 py-2">
                                              {weekData?.dk_salary ? `$${(weekData.dk_salary/1000).toFixed(1)}k` : '-'}
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2 font-medium">
                                              {weekData?.snap_count || weekData?.snap_percentage || '-'}
                                            </td>
                                            <td className={`text-center border border-slate-200 text-xs py-2 font-bold ${
                                              fantasyPoints >= 15 ? 'bg-green-200 text-green-800' :
                                              fantasyPoints >= 10 ? 'bg-green-100 text-green-700' :
                                              fantasyPoints >= 7 ? 'bg-yellow-100 text-yellow-700' :
                                              fantasyPoints >= 4 ? 'bg-orange-100 text-orange-700' :
                                              fantasyPoints > 0 ? 'bg-red-100 text-red-700' : 'bg-green-25'
                                            }`}>
                                              {weekData ? fantasyPoints.toFixed(1) : '-'}
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-purple-25 py-2">
                                              {weekData ? (weekData.position_rank || '-') : '-'}
                                            </td>
                                          </>
                                        ) : (
                                          // Full Detail View - All 11 columns
                                          <>
                                            {/* Misc */}
                                            <td className="text-center border border-slate-200 text-xs bg-amber-25 py-2">
                                              {weekData?.dk_salary ? `$${(weekData.dk_salary/1000).toFixed(1)}k` : ''}
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-amber-25 py-2 font-medium">
                                              {weekData?.snap_count || weekData?.snap_percentage || ''}
                                            </td>
                                            {/* Pass/Rec Combined */}
                                            <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2">
                                              <div>{weekData && weekData.passing_yards > 0 ? `${passingCompletions}-${passingAttempts}` : ''}</div>
                                              <div className="text-xs text-slate-500 font-medium">{weekData && weekData.targets > 0 ? weekData.targets : ''}</div>
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2">
                                              <div className="font-medium">{weekData && weekData.passing_yards > 0 ? weekData.passing_yards : ''}</div>
                                              <div className="text-xs text-slate-500 font-bold">{weekData && weekData.receptions > 0 ? weekData.receptions : ''}</div>
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2">
                                              <div className="font-medium">{weekData && weekData.passing_tds > 0 ? weekData.passing_tds : ''}</div>
                                              <div className="text-xs text-slate-500 font-bold">{weekData && weekData.receiving_yards > 0 ? weekData.receiving_yards : ''}</div>
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-blue-25 py-2">
                                              <div>{weekData && weekData.interceptions > 0 ? weekData.interceptions : ''}</div>
                                              <div className="text-xs text-slate-500 font-bold">{weekData && weekData.receiving_tds > 0 ? weekData.receiving_tds : ''}</div>
                                            </td>
                                            {/* Rush */}
                                            <td className="text-center border border-slate-200 text-xs bg-green-25 py-2 font-medium">{weekData && weekData.rushing_yards > 0 ? rushingAttempts : ''}</td>
                                            <td className="text-center border border-slate-200 text-xs bg-green-25 py-2 font-medium">{weekData && weekData.rushing_yards > 0 ? weekData.rushing_yards : ''}</td>
                                            <td className="text-center border border-slate-200 text-xs bg-green-25 py-2 font-medium">{weekData && weekData.rushing_tds > 0 ? weekData.rushing_tds : ''}</td>
                                            {/* Fantasy */}
                                            <td className={`text-center border border-slate-200 text-xs py-2 font-bold ${
                                              fantasyPoints >= 20 ? 'bg-green-200 text-green-800' :
                                              fantasyPoints >= 15 ? 'bg-green-100 text-green-700' :
                                              fantasyPoints >= 10 ? 'bg-yellow-100 text-yellow-700' :
                                              fantasyPoints >= 5 ? 'bg-orange-100 text-orange-700' :
                                              fantasyPoints > 0 ? 'bg-red-100 text-red-700' : 'bg-purple-25'
                                            }`}>
                                              {weekData ? fantasyPoints.toFixed(1) : ''}
                                            </td>
                                            <td className="text-center border border-slate-200 text-xs bg-purple-25 py-2">
                                              {weekData ? (weekData.position_rank || '-') : '-'}
                                            </td>
                                          </>
                                        )
                                        }
                                      </React.Fragment>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FantasyDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;