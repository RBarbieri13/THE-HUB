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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(280); // pixels
  const [isResizing, setIsResizing] = useState(false);

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
            <div 
              className="flex flex-col py-1 cursor-pointer hover:bg-blue-50 rounded px-2 transition-colors"
              onClick={() => handlePlayerClick(params.data)}
            >
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
          valueGetter: (params) => calculateFantasyPoints(params.data),
          cellRenderer: (params) => {
            const points = parseFloat(params.value) || 0;
            const colorClass = getPerformanceColor(points, 'fantasy_points', params.data.position);
            return (
              <span className={`text-xs font-bold ${colorClass}`}>
                {points.toFixed(1)}
              </span>
            );
          },
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
          headerName: 'DK $',
          field: 'dk_salary',
          width: 65,
          type: 'numericColumn',
          cellRenderer: (params) => (
            <span className="text-xs font-medium text-green-600">
              {params.value ? `$${params.value.toLocaleString()}` : '-'}
            </span>
          )
        }
      ]
    }
  ], [isPPR, calculateFantasyPoints, getPerformanceColor, getPositionColor, handlePlayerClick]);

  // Default column configuration with tighter spacing - remove filter triangles
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: false, // Remove filter triangles
    resizable: true,
    minWidth: 40,
    cellStyle: { padding: '4px 6px' },
    suppressMenu: true // Remove column menu
  }), []);

  // Grid options for alternating row colors and compact layout - remove checkboxes
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
    rowSelection: 'none', // Remove checkboxes
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
                  <div className="p-2 bg-blue-500 rounded-lg shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
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
                  onClick={refreshData} 
                  disabled={refreshing}
                >
                  <RefreshCw className={`h-3 w-3 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Syncing...' : 'Sync Data'}
                </Button>
                <Button size="sm" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800 text-xs h-9">
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout with Sidebar */}
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Resizable Professional Sidebar */}
        <div 
          className={`bg-white shadow-2xl border-r border-gray-200 transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? 'w-16' : ''
          } flex-shrink-0 relative`}
          style={{ 
            width: sidebarCollapsed ? '64px' : `${sidebarWidth}px`,
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)' 
          }}
        >
          {/* Sidebar Header - Reduced Padding */}
          <div className="p-2 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-blue-600" />
                  <h2 className="text-sm font-semibold text-gray-900">Filters & Options</h2>
                </div>
              )}
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="h-6 w-6 p-0 hover:bg-blue-100 text-xs"
              >
                {sidebarCollapsed ? '→' : '←'}
              </Button>
            </div>
          </div>

          {/* Resize Handle */}
          {!sidebarCollapsed && (
            <div
              className="absolute top-0 right-0 w-1 h-full bg-blue-300 hover:bg-blue-500 cursor-col-resize opacity-0 hover:opacity-100 transition-opacity"
              onMouseDown={handleMouseDown}
            />
          )}

          {/* Sidebar Content - Reduced Padding */}
          <div className="p-2 space-y-3 overflow-y-auto max-h-[calc(100vh-100px)]">
            {!sidebarCollapsed && (
              <>
                {/* Season & Week Filters */}
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-200">
                    <h3 className="text-xs font-semibold text-gray-800 mb-2 flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-blue-600" />
                      Time Period
                    </h3>
                    
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">SEASON</label>
                        <Select value={filters.season} onValueChange={(value) => handleFilterChange('season', value)}>
                          <SelectTrigger className="h-9 text-sm shadow-sm border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2023">2023 Season</SelectItem>
                            <SelectItem value="2024">2024 Season</SelectItem>
                            <SelectItem value="2025">2025 Season</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">WEEK</label>
                        <Select value={filters.week} onValueChange={(value) => handleFilterChange('week', value)}>
                          <SelectTrigger className="h-9 text-sm shadow-sm border-gray-300">
                            <SelectValue placeholder="All weeks" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Weeks</SelectItem>
                            {Array.from({length: 18}, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                Week {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team & Position Filters */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-green-600" />
                      Team & Position
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">TEAM</label>
                        <Select value={filters.team} onValueChange={(value) => handleFilterChange('team', value)}>
                          <SelectTrigger className="h-9 text-sm shadow-sm border-gray-300">
                            <SelectValue placeholder="All teams" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Teams</SelectItem>
                            {Object.entries(NFL_TEAMS).map(([abbr, name]) => (
                              <SelectItem key={abbr} value={abbr}>{name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">POSITION</label>
                        <Select value={filters.position} onValueChange={(value) => handleFilterChange('position', value)}>
                          <SelectTrigger className="h-9 text-sm shadow-sm border-gray-300">
                            <SelectValue placeholder="All positions" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Positions</SelectItem>
                            <SelectItem value="QB">Quarterback (QB)</SelectItem>
                            <SelectItem value="RB">Running Back (RB)</SelectItem>
                            <SelectItem value="WR">Wide Receiver (WR)</SelectItem>
                            <SelectItem value="TE">Tight End (TE)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Filters */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-3 border border-purple-200">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2 text-purple-600" />
                      Performance Thresholds
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">MIN SALARY ($)</label>
                        <Input 
                          type="number" 
                          placeholder="5000"
                          value={filters.minSalary}
                          onChange={(e) => handleFilterChange('minSalary', e.target.value)}
                          className="h-9 text-sm shadow-sm border-gray-300"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-1">MIN SNAPS</label>
                        <Input 
                          type="number" 
                          placeholder="10"
                          value={filters.minSnaps}
                          onChange={(e) => handleFilterChange('minSnaps', e.target.value)}
                          className="h-9 text-sm shadow-sm border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scoring System */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                      <Star className="h-4 w-4 mr-2 text-amber-600" />
                      Fantasy Scoring
                    </h3>
                    
                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-medium text-gray-700">PPR SYSTEM</label>
                      <div className="flex bg-white rounded-lg p-1 border shadow-sm">
                        <button
                          onClick={() => setIsPPR(true)}
                          className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-all ${
                            isPPR 
                              ? 'bg-blue-500 text-white shadow-sm' 
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                          }`}
                        >
                          Full PPR
                        </button>
                        <button
                          onClick={() => setIsPPR(false)}
                          className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-all ${
                            !isPPR 
                              ? 'bg-blue-500 text-white shadow-sm' 
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                          }`}
                        >
                          Half PPR
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Player Type Buttons */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-3 border border-rose-200">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                      <Search className="h-4 w-4 mr-2 text-rose-600" />
                      Quick Filters
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <PlayerTypeButton 
                        type="all" 
                        label="All" 
                        active={selectedPlayerType === 'all'} 
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
                  </div>
                </div>

                {/* Data Actions */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-3 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                      <Database className="h-4 w-4 mr-2 text-gray-600" />
                      Data Management
                    </h3>
                    
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full text-xs h-8 justify-start"
                        onClick={loadSnapCounts}
                        disabled={loadingSnapCounts}
                      >
                        <Activity className={`h-3 w-3 mr-2 ${loadingSnapCounts ? 'animate-spin' : ''}`} />
                        {loadingSnapCounts ? 'Loading...' : 'Load Snap Counts'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full text-xs h-8 justify-start"
                        onClick={loadHistoricalPricing}
                        disabled={loadingPricing}
                      >
                        <DollarSign className={`h-3 w-3 mr-2 ${loadingPricing ? 'animate-spin' : ''}`} />
                        {loadingPricing ? 'Loading...' : 'Load DK Pricing'}
                      </Button>
                      <Button size="sm" variant="outline" className="w-full text-xs h-8 justify-start">
                        <Download className="h-3 w-3 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-hidden">

          {/* Professional Data Grid with Enhanced Styling */}
          <div className="flex gap-6 relative">
            {/* Main Analytics Grid */}
            <Card 
              className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out" 
              style={{ 
                width: playerDetailOpen ? `${100 - playerDetailWidth}%` : '100%',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
              }}
            >
              <CardHeader className="pb-3 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 border-b border-gray-200">
                {/* Enhanced Header with Professional Styling */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900 tracking-tight">
                          Player Stats
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 mt-1">
                          {isPPR ? 'Full' : 'Half'} PPR • Season {filters.season} 
                          {filters.week !== 'all' ? ` • Week ${filters.week}` : ' • All Weeks'}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg text-xs h-9 px-4">
                      <Star className="h-3 w-3 mr-2" />
                      Favorites
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg text-xs h-9 px-4">
                      <Download className="h-3 w-3 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                {/* Professional Grid with Enhanced Visual Hierarchy */}
                <div 
                  className="ag-theme-alpine compact-grid color-coded-headers professional-grid"
                  style={{ 
                    height: '650px', 
                    width: '100%',
                    background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)'
                  }}
                >
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

          {/* Player Detail Panel */}
          {playerDetailOpen && (
            <Card 
              className="transition-all duration-300 ease-in-out border-l-4 border-blue-500 shadow-xl"
              style={{ width: `${playerDetailWidth}%` }}
            >
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CardTitle className="text-base font-semibold">
                      {selectedPlayer?.player_name}
                    </CardTitle>
                    <Badge className={`text-xs px-2 py-0.5 font-medium border ${getPositionColor(selectedPlayer?.position)}`}>
                      {selectedPlayer?.position}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs h-7 w-7 p-0"
                      onClick={() => setPlayerDetailWidth(playerDetailWidth === 30 ? 40 : 30)}
                    >
                      {playerDetailWidth === 30 ? '→' : '←'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs h-7 w-7 p-0"
                      onClick={() => setPlayerDetailOpen(false)}
                    >
                      ×
                    </Button>
                  </div>
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
                            <span className={`text-xs font-bold ${getPerformanceColor(calculateFantasyPoints(game), 'fantasy_points', game.position)}`}>
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