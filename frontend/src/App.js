import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Badge } from './components/ui/badge';
import { RefreshCw, TrendingUp, Users, Calendar, Search } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import '@/App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FantasyDashboard = () => {
  const [gridApi, setGridApi] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [filters, setFilters] = useState({
    season: '2023',
    week: 'all',
    position: 'all',
    team: 'all'
  });

  // Column definitions for AG Grid
  const columnDefs = useMemo(() => [
    {
      headerName: 'Player',
      field: 'player_name',
      pinned: 'left',
      width: 180,
      cellRenderer: (params) => (
        <div className="flex items-center space-x-2">
          <div>
            <div className="font-medium text-gray-900">{params.value}</div>
            <div className="text-xs text-gray-500">{params.data.team}</div>
          </div>
        </div>
      )
    },
    {
      headerName: 'Pos',
      field: 'position',
      width: 60,
      cellRenderer: (params) => (
        <Badge variant="outline" className="text-xs font-medium">
          {params.value}
        </Badge>
      )
    },
    {
      headerName: 'Week',
      field: 'week',
      width: 70,
      type: 'numericColumn'
    },
    {
      headerName: 'Opp',
      field: 'opponent',
      width: 80,
      cellRenderer: (params) => (
        <span className="text-sm text-gray-600">
          {params.value ? `vs ${params.value}` : '-'}
        </span>
      )
    },
    {
      headerName: 'Fantasy Pts',
      field: 'fantasy_points',
      width: 120,
      type: 'numericColumn',
      cellRenderer: (params) => (
        <div className="font-bold text-green-700">
          {params.value ? params.value.toFixed(1) : '0.0'}
        </div>
      ),
      sort: 'desc'
    },
    {
      headerName: 'Snap %',
      field: 'snap_percentage',
      width: 90,
      type: 'numericColumn',
      cellRenderer: (params) => (
        <div className="text-sm">
          {params.value ? `${params.value.toFixed(1)}%` : '-'}
        </div>
      )
    },
    {
      headerName: 'Pass Yds',
      field: 'passing_yards',
      width: 100,
      type: 'numericColumn',
      cellRenderer: (params) => (
        <span className="text-blue-600">
          {params.value || 0}
        </span>
      )
    },
    {
      headerName: 'Pass TD',
      field: 'passing_tds',
      width: 90,
      type: 'numericColumn'
    },
    {
      headerName: 'INT',
      field: 'interceptions',
      width: 70,
      type: 'numericColumn',
      cellRenderer: (params) => (
        <span className={params.value > 0 ? 'text-red-600' : ''}>
          {params.value || 0}
        </span>
      )
    },
    {
      headerName: 'Rush Yds',
      field: 'rushing_yards',
      width: 100,
      type: 'numericColumn',
      cellRenderer: (params) => (
        <span className="text-orange-600">
          {params.value || 0}
        </span>
      )
    },
    {
      headerName: 'Rush TD',
      field: 'rushing_tds',
      width: 90,
      type: 'numericColumn'
    },
    {
      headerName: 'Rec',
      field: 'receptions',
      width: 70,
      type: 'numericColumn',
      cellRenderer: (params) => (
        <span className="text-purple-600">
          {params.value || 0}
        </span>
      )
    },
    {
      headerName: 'Rec Yds',
      field: 'receiving_yards',
      width: 100,
      type: 'numericColumn',
      cellRenderer: (params) => (
        <span className="text-purple-600">
          {params.value || 0}
        </span>
      )
    },
    {
      headerName: 'Rec TD',
      field: 'receiving_tds',
      width: 90,
      type: 'numericColumn'
    },
    {
      headerName: 'Targets',
      field: 'targets',
      width: 90,
      type: 'numericColumn'
    },
    {
      headerName: 'Fumbles',
      field: 'fumbles_lost',
      width: 90,
      type: 'numericColumn',
      cellRenderer: (params) => (
        <span className={params.value > 0 ? 'text-red-600' : ''}>
          {params.value || 0}
        </span>
      )
    }
  ], []);

  // Default column configuration
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 60
  }), []);

  // Fetch players data
  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (filters.season) params.append('season', filters.season);
      if (filters.week) params.append('week', filters.week);
      if (filters.position) params.append('position', filters.position);
      if (filters.team) params.append('team', filters.team);
      params.append('limit', '1000');
      
      const response = await axios.get(`${API}/players?${params.toString()}`);
      setPlayers(response.data);
      
      if (response.data.length === 0) {
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
      toast.info('Refreshing NFL data from sources...');
      const response = await axios.post(`${API}/refresh-data`);
      
      if (response.data.success) {
        toast.success(`Successfully loaded ${response.data.records_loaded} records`);
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
  }, [filters]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Fantasy Football Database</h1>
              </div>
              <Badge variant="secondary" className="text-xs">
                DraftKings PPR Scoring
              </Badge>
            </div>
            
            <Button 
              onClick={refreshData} 
              disabled={refreshing}
              className="flex items-center space-x-2"
              data-testid="refresh-data-btn"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh Data'}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.total_player_stats.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Player statistics</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Seasons</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.seasons_available.join(', ')}</div>
                <p className="text-xs text-muted-foreground">Available seasons</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Weeks</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary.weeks_available.length > 0 ? `1-${Math.max(...summary.weeks_available)}` : 'None'}
                </div>
                <p className="text-xs text-muted-foreground">Weeks with data</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Positions</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Object.keys(summary.position_counts).length}
                </div>
                <p className="text-xs text-muted-foreground">QB, RB, WR, TE</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter player statistics by season, week, position, and team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Season</label>
                <Select value={filters.season} onValueChange={(value) => handleFilterChange('season', value)}>
                  <SelectTrigger data-testid="season-filter">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Week</label>
                <Select value={filters.week} onValueChange={(value) => handleFilterChange('week', value)}>
                  <SelectTrigger data-testid="week-filter">
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
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Position</label>
                <Select value={filters.position} onValueChange={(value) => handleFilterChange('position', value)}>
                  <SelectTrigger data-testid="position-filter">
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
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Team</label>
                <Select value={filters.team} onValueChange={(value) => handleFilterChange('team', value)}>
                  <SelectTrigger data-testid="team-filter">
                    <SelectValue placeholder="All teams" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All teams</SelectItem>
                    {/* Popular teams */}
                    <SelectItem value="KC">Kansas City Chiefs</SelectItem>
                    <SelectItem value="BUF">Buffalo Bills</SelectItem>
                    <SelectItem value="DAL">Dallas Cowboys</SelectItem>
                    <SelectItem value="SF">San Francisco 49ers</SelectItem>
                    <SelectItem value="PHI">Philadelphia Eagles</SelectItem>
                    <SelectItem value="MIA">Miami Dolphins</SelectItem>
                    <SelectItem value="CIN">Cincinnati Bengals</SelectItem>
                    <SelectItem value="GB">Green Bay Packers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Player Statistics</span>
              <Badge variant="outline" className="text-sm">
                {players.length} players
              </Badge>
            </CardTitle>
            <CardDescription>
              Comprehensive NFL player statistics with DraftKings PPR fantasy scoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={players}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                animateRows={true}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                pagination={true}
                paginationPageSize={50}
                loading={loading}
                loadingOverlayComponent="Loading players..."
                noRowsOverlayComponent="No players found with current filters"
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
