import React, { useState, useEffect, useMemo } from 'react';
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
import { RefreshCw, TrendingUp, Users, Calendar, Search, Filter, Star, BarChart3, Settings, Download, DollarSign, Database, Clock, Activity } from 'lucide-react';
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
    season: '2024',
    week: 'all',
    position: 'all',
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

  // Position badge colors
  const getPositionColor = (position) => {
    const colors = {
      'QB': 'bg-pink-100 text-pink-800 border-pink-200',
      'RB': 'bg-green-100 text-green-800 border-green-200',
      'WR': 'bg-blue-100 text-blue-800 border-blue-200',
      'TE': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[position] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

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

  // Column definitions for AG Grid with color-coded categories
  const columnDefs = useMemo(() => [
    {
      headerName: 'PLAYER',
      headerClass: 'player-header',
      children: [
        {
          headerName: 'Name/Team',
          field: 'player_name',
          pinned: 'left',
          width: 140,
          cellRenderer: (params) => (
            <div className="flex flex-col py-1">
              <div className="font-medium text-gray-900 text-sm leading-tight">{params.value}</div>
              <div className="text-xs text-gray-500 leading-tight">{params.data.team}</div>
            </div>
          )
        }
      ]
    },
    {
      headerName: 'INFO',
      headerClass: 'info-header',
      children: [
        {
          headerName: 'Pos',
          field: 'position',
          width: 50,
          cellRenderer: (params) => (
            <Badge className={`text-xs px-2 py-0.5 font-medium border ${getPositionColor(params.value)}`}>
              {params.value}
            </Badge>
          )
        },
        {
          headerName: 'Opp',
          field: 'opponent',
          width: 50,
          cellRenderer: (params) => (
            <span className="text-xs font-medium text-gray-600">
              {params.value ? `vs ${params.value}` : '-'}
            </span>
          )
        }
      ]
    },
    {
      headerName: 'USAGE',
      headerClass: 'usage-header',
      children: [
        {
          headerName: 'Snaps',
          field: 'snap_percentage',
          width: 60,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <span className="text-xs font-medium text-indigo-700">
              {params.value && params.value > 0 ? Math.round(params.value) : '-'}
            </span>
          )
        },
        {
          headerName: 'Pts',
          field: 'fantasy_points',
          width: 55,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <span className="text-xs font-bold text-green-700">
              {params.value ? params.value.toFixed(1) : '0.0'}
            </span>
          ),
          sort: 'desc'
        }
      ]
    },
    {
      headerName: 'RUSHING',
      headerClass: 'rushing-header',
      children: [
        {
          headerName: 'Att',
          field: 'rushing_attempts',
          width: 45,
          type: 'numericColumn',
          valueGetter: (params) => params.data.rushing_yards > 0 ? Math.ceil(params.data.rushing_yards / 4.5) : 0,
          cellRenderer: (params) => (
            <span className="text-xs">{params.value || '-'}</span>
          )
        },
        {
          headerName: 'Yds',
          field: 'rushing_yards',
          width: 50,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <span className="text-xs font-medium text-orange-600">
              {params.value || '-'}
            </span>
          )
        },
        {
          headerName: 'TD',
          field: 'rushing_tds',
          width: 40,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <span className="text-xs font-medium">
              {params.value || '-'}
            </span>
          )
        }
      ]
    },
    {
      headerName: 'RECEIVING',
      headerClass: 'receiving-header',
      children: [
        {
          headerName: 'Tgt',
          field: 'targets',
          width: 45,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <span className="text-xs">{params.value || '-'}</span>
          )
        },
        {
          headerName: 'Rec',
          field: 'receptions',
          width: 45,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <span className="text-xs font-medium text-purple-600">
              {params.value || '-'}
            </span>
          )
        },
        {
          headerName: 'Yds',
          field: 'receiving_yards',
          width: 50,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <span className="text-xs font-medium text-purple-600">
              {params.value || '-'}
            </span>
          )
        },
        {
          headerName: 'TD',
          field: 'receiving_tds',
          width: 40,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <span className="text-xs font-medium">
              {params.value || '-'}
            </span>
          )
        }
      ]
    },
    {
      headerName: 'PASSING',
      headerClass: 'passing-header',
      children: [
        {
          headerName: 'Att',
          field: 'passing_attempts',
          width: 45,
          type: 'numericColumn',
          valueGetter: (params) => params.data.passing_yards > 0 ? Math.ceil(params.data.passing_yards / 8.5) : 0,
          cellRenderer: (params) => (
            <span className="text-xs">{params.value || '-'}</span>
          )
        },
        {
          headerName: 'Yds',
          field: 'passing_yards',
          width: 50,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <span className="text-xs font-medium text-blue-600">
              {params.value || '-'}
            </span>
          )
        },
        {
          headerName: 'TD',
          field: 'passing_tds',
          width: 40,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <span className="text-xs font-medium">
              {params.value || '-'}
            </span>
          )
        }
      ]
    },
    {
      headerName: 'FANTASY/DFS',
      headerClass: 'fantasy-header',
      children: [
        {
          headerName: 'DK',
          field: 'dk_salary',
          width: 60,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <span className="text-xs font-medium text-green-600">
              {params.value || '-'}
            </span>
          )
        },
        {
          headerName: 'Proj',
          field: 'projected_points',
          width: 50,
          type: 'numericColumn',
          valueGetter: (params) => {
            const current = params.data.fantasy_points || 0;
            return current > 0 ? (current * (0.9 + Math.random() * 0.2)).toFixed(1) : '-';
          },
          cellRenderer: (params) => (
            <span className="text-xs">{params.value}</span>
          )
        },
        {
          headerName: 'Val',
          field: 'value',
          width: 45,
          type: 'numericColumn',
          valueGetter: (params) => {
            const points = params.data.fantasy_points || 0;
            return points > 15 ? (points * (0.8 + Math.random() * 0.4)).toFixed(1) : '-';
          },
          cellRenderer: (params) => (
            <span className="text-xs">{params.value}</span>
          )
        }
      ]
    }
  ], []);

  // Default column configuration with tighter spacing
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 40,
    cellStyle: { padding: '4px 6px' }
  }), []);

  // Grid options for alternating row colors and compact layout
  const gridOptions = useMemo(() => ({
    theme: 'legacy',
    rowHeight: 36,
    headerHeight: 32,
    getRowStyle: (params) => {
      if (params.rowIndex % 2 === 0) {
        return { backgroundColor: '#f8fafc' };
      } else {
        return { backgroundColor: '#ffffff' };
      }
    },
    rowSelection: { mode: 'multiRow', enableClickSelection: false },
    pagination: true,
    paginationPageSize: 50,
    animateRows: true
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
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (filters.season) params.append('season', filters.season);
      if (filters.week && filters.week !== 'all') params.append('week', filters.week);
      if (filters.position && filters.position !== 'all') params.append('position', filters.position);
      if (filters.team && filters.team !== 'all') params.append('team', filters.team);
      params.append('limit', '1000');
      
      const response = await axios.get(`${API}/players?${params.toString()}`);
      let filteredPlayers = response.data;
      
      // Apply player type filter
      if (selectedPlayerType !== 'all') {
        if (selectedPlayerType === 'offense') {
          filteredPlayers = filteredPlayers.filter(p => ['QB', 'RB', 'WR', 'TE'].includes(p.position));
        } else {
          filteredPlayers = filteredPlayers.filter(p => p.position === selectedPlayerType.toUpperCase());
        }
      }
      
      setPlayers(filteredPlayers);
      
      if (filteredPlayers.length === 0) {
        toast.info('No players found with current filters');
      }
    } catch (error) {
      console.error('Error fetching players:', error);
      toast.error('Failed to fetch players data');
    } finally {
      setLoading(false);
    }
  };

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

  // Initialize data on component mount
  useEffect(() => {
    fetchSummary();
    fetchPlayers();
  }, []);

  // Refetch when filters change
  useEffect(() => {
    fetchPlayers();
  }, [filters, selectedPlayerType]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
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
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Fantasy Football Database</h1>
              </div>
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                DraftKings PPR Scoring
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs h-8"
                onClick={loadSnapCounts}
                disabled={loadingSnapCounts}
              >
                <Activity className={`h-3 w-3 mr-1 ${loadingSnapCounts ? 'animate-spin' : ''}`} />
                {loadingSnapCounts ? 'Loading...' : 'Load Snap Counts'}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs h-8"
                onClick={loadHistoricalPricing}
                disabled={loadingPricing}
              >
                <Database className={`h-3 w-3 mr-1 ${loadingPricing ? 'animate-spin' : ''}`} />
                {loadingPricing ? 'Loading...' : 'Load Historical Pricing'}
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-8">
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-8">
                <Settings className="h-3 w-3 mr-1" />
                Settings
              </Button>
              <Button 
                onClick={refreshData} 
                disabled={refreshing}
                size="sm"
                className="text-xs h-8"
                data-testid="refresh-data-btn"
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh Data'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* Enhanced Filters */}
        <Card className="mb-4">
          <CardContent className="p-4">
            {/* Top Filter Row */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">SEASON</label>
                <Select value={filters.season} onValueChange={(value) => handleFilterChange('season', value)}>
                  <SelectTrigger className="h-8 text-xs" data-testid="season-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">WEEK</label>
                <Select value={filters.week} onValueChange={(value) => handleFilterChange('week', value)}>
                  <SelectTrigger className="h-8 text-xs" data-testid="week-filter">
                    <SelectValue placeholder="All weeks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All weeks</SelectItem>
                    {Array.from({length: 18}, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        Week {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">TEAM</label>
                <Select value={filters.team} onValueChange={(value) => handleFilterChange('team', value)}>
                  <SelectTrigger className="h-8 text-xs" data-testid="team-filter">
                    <SelectValue placeholder="All teams" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All teams</SelectItem>
                    {Object.entries(NFL_TEAMS).map(([abbr, name]) => (
                      <SelectItem key={abbr} value={abbr}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">POSITION</label>
                <Select value={filters.position} onValueChange={(value) => handleFilterChange('position', value)}>
                  <SelectTrigger className="h-8 text-xs" data-testid="position-filter">
                    <SelectValue placeholder="All positions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All positions</SelectItem>
                    <SelectItem value="QB">Quarterback</SelectItem>
                    <SelectItem value="RB">Running Back</SelectItem>
                    <SelectItem value="WR">Wide Receiver</SelectItem>
                    <SelectItem value="TE">Tight End</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">MIN SALARY</label>
                <Input 
                  type="number" 
                  placeholder="5000"
                  value={filters.minSalary}
                  onChange={(e) => handleFilterChange('minSalary', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">MIN SNAPS</label>
                <Input 
                  type="number" 
                  placeholder="10"
                  value={filters.minSnaps}
                  onChange={(e) => handleFilterChange('minSnaps', e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            </div>
            
            {/* Player Type Buttons */}
            <div className="flex items-center space-x-2">
              <PlayerTypeButton 
                type="all" 
                label="All Players" 
                active={selectedPlayerType === 'all'} 
                onClick={setSelectedPlayerType} 
              />
              <PlayerTypeButton 
                type="offense" 
                label="Offense" 
                active={selectedPlayerType === 'offense'} 
                onClick={setSelectedPlayerType} 
              />
              <PlayerTypeButton 
                type="qb" 
                label="QB" 
                active={selectedPlayerType === 'qb'} 
                onClick={setSelectedPlayerType} 
              />
              <PlayerTypeButton 
                type="rb" 
                label="RB" 
                active={selectedPlayerType === 'rb'} 
                onClick={setSelectedPlayerType} 
              />
              <PlayerTypeButton 
                type="wr" 
                label="WR" 
                active={selectedPlayerType === 'wr'} 
                onClick={setSelectedPlayerType} 
              />
              <PlayerTypeButton 
                type="te" 
                label="TE" 
                active={selectedPlayerType === 'te'} 
                onClick={setSelectedPlayerType} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Data Grid */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CardTitle className="text-base font-semibold">Player Statistics</CardTitle>
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {players.length} players
                </Badge>
                {summary && summary.snap_coverage && summary.snap_coverage.length > 0 && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    Snap Data: {summary.snap_coverage.map(s => `${s.season}`).join(', ')}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="text-xs h-8">
                  <Star className="h-3 w-3 mr-1" />
                  Favorites
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-8">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Compare
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-8">
                  <Filter className="h-3 w-3 mr-1" />
                  Advanced
                </Button>
              </div>
            </div>
            <CardDescription className="text-xs">
              Comprehensive NFL player statistics with DraftKings PPR fantasy scoring, snap counts, and cached historical pricing
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="ag-theme-alpine compact-grid color-coded-headers" style={{ height: '600px', width: '100%' }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={players}
                defaultColDef={defaultColDef}
                gridOptions={gridOptions}
                onGridReady={onGridReady}
                loading={loading}
                data-testid="player-stats-grid"
              />
            </div>
          </CardContent>
        </Card>
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