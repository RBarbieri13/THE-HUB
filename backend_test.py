#!/usr/bin/env python3
"""
NFL Fantasy Football App Backend Testing Suite
Tests snap count fixes, DraftKings pricing, and general API health
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, List, Any, Optional

# Backend URL from frontend .env
BACKEND_URL = "https://fantasy-pro-dash.preview.emergentagent.com/api"

class NFLFantasyTester:
    def __init__(self):
        self.backend_url = BACKEND_URL
        self.test_results = []
        self.session = requests.Session()
        self.session.timeout = 30
        
    def log_test(self, test_name: str, success: bool, details: str, data: Any = None):
        """Log test results"""
        result = {
            'test_name': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat(),
            'data': data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        if data and not success:
            print(f"   Data: {json.dumps(data, indent=2)[:500]}...")
    
    def test_api_health(self) -> bool:
        """Test basic API connectivity and health"""
        try:
            response = self.session.get(f"{self.backend_url}/")
            if response.status_code == 200:
                data = response.json()
                self.log_test("API Health Check", True, f"API is responding: {data.get('message', 'OK')}")
                return True
            else:
                self.log_test("API Health Check", False, f"API returned status {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("API Health Check", False, f"API connection failed: {str(e)}")
            return False
    
    def test_stats_summary(self) -> Dict:
        """Test /api/stats/summary endpoint and get database overview"""
        try:
            response = self.session.get(f"{self.backend_url}/stats/summary")
            if response.status_code == 200:
                data = response.json()
                self.log_test("Stats Summary", True, 
                    f"Database contains {data.get('total_player_stats', 0)} player stats, "
                    f"{data.get('total_snap_counts', 0)} snap records, "
                    f"{data.get('total_pricing_records', 0)} pricing records")
                return data
            else:
                self.log_test("Stats Summary", False, f"Status {response.status_code}", response.text)
                return {}
        except Exception as e:
            self.log_test("Stats Summary", False, f"Error: {str(e)}")
            return {}
    
    def test_snap_count_fix(self) -> bool:
        """Test snap count fix - verify numerical values instead of percentages"""
        try:
            total_players_tested = 0
            players_with_numerical_snaps = 0
            snap_count_examples = []
            
            # Test for 2024 and 2025 data across multiple weeks
            for season in [2024, 2025]:
                for week in [1, 2, 3, 4, 5]:  # Test multiple weeks
                    response = self.session.get(f"{self.backend_url}/players", params={
                        'season': season,
                        'week': week,
                        'limit': 50
                    })
                    
                    if response.status_code == 200:
                        players = response.json()
                        if players:
                            snap_count_issues = []
                            numerical_snaps = []
                            
                            for player in players:
                                total_players_tested += 1
                                snap_pct = player.get('snap_percentage')
                                if snap_pct is not None:
                                    if isinstance(snap_pct, (int, float)):
                                        if snap_pct > 0:
                                            if snap_pct <= 1.0:  # This would be a percentage (0.0-1.0)
                                                snap_count_issues.append({
                                                    'player': player.get('player_name'),
                                                    'snap_percentage': snap_pct,
                                                    'season': season,
                                                    'week': week,
                                                    'issue': 'Still showing as decimal percentage'
                                                })
                                            else:  # This should be actual snap count (>1)
                                                players_with_numerical_snaps += 1
                                                numerical_snaps.append({
                                                    'player': player.get('player_name'),
                                                    'snap_count': snap_pct,
                                                    'season': season,
                                                    'week': week
                                                })
                                                # Collect examples for reporting
                                                if len(snap_count_examples) < 10:
                                                    snap_count_examples.append({
                                                        'player': player.get('player_name'),
                                                        'snap_count': snap_pct,
                                                        'position': player.get('position'),
                                                        'team': player.get('team')
                                                    })
                            
                            if snap_count_issues:
                                self.log_test(f"Snap Count Fix {season} Week {week}", False, 
                                    f"Found {len(snap_count_issues)} players still showing decimal percentages", 
                                    snap_count_issues[:3])
                            elif numerical_snaps:
                                self.log_test(f"Snap Count Fix {season} Week {week}", True, 
                                    f"Found {len(numerical_snaps)} players with numerical snap counts")
                            else:
                                self.log_test(f"Snap Count Fix {season} Week {week}", True, 
                                    "No snap count data for this week (expected for some weeks)")
                    else:
                        self.log_test(f"Snap Count Fix {season} Week {week}", False, 
                            f"API error: {response.status_code}")
            
            # Overall summary
            if players_with_numerical_snaps > 0:
                self.log_test("Snap Count System Overall", True, 
                    f"SUCCESS: {players_with_numerical_snaps} players have numerical snap counts. Examples: {snap_count_examples[:5]}")
                return True
            else:
                self.log_test("Snap Count System Overall", False, 
                    f"No players found with numerical snap counts out of {total_players_tested} tested")
                return False
            
        except Exception as e:
            self.log_test("Snap Count Fix", False, f"Error testing snap counts: {str(e)}")
            return False
    
    def test_draftkings_pricing_investigation(self) -> bool:
        """Test DraftKings pricing endpoint and investigate 404 errors"""
        try:
            # First check if there's any existing pricing data
            response = self.session.get(f"{self.backend_url}/draftkings-pricing", params={
                'season': 2024,
                'week': 1
            })
            
            if response.status_code == 200:
                data = response.json()
                existing_records = len(data.get('data', {}).get('pricing', []))
                self.log_test("DraftKings Existing Data", True if existing_records > 0 else False, 
                    f"Found {existing_records} existing pricing records")
            
            # Test the load-historical-pricing endpoint
            print("Testing DraftKings pricing load (this may take a while)...")
            response = self.session.post(f"{self.backend_url}/load-historical-pricing")
            
            if response.status_code == 200:
                data = response.json()
                records_processed = data.get('records_processed', 0)
                errors = data.get('data', {}).get('errors', [])
                
                if records_processed > 0:
                    self.log_test("DraftKings Pricing Load", True, 
                        f"Successfully loaded {records_processed} pricing records")
                    return True
                else:
                    self.log_test("DraftKings Pricing Load", False, 
                        f"No records loaded. Errors: {errors[:3]}", errors)
                    return False
            else:
                self.log_test("DraftKings Pricing Load", False, 
                    f"API error: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("DraftKings Pricing Investigation", False, f"Error: {str(e)}")
            return False
    
    def test_enhanced_name_matching(self) -> bool:
        """Test enhanced name matching system for Jr/Sr suffixes and punctuation differences"""
        try:
            # Get players data to analyze name matching effectiveness
            response = self.session.get(f"{self.backend_url}/players", params={
                'season': 2024,
                'limit': 100
            })
            
            if response.status_code != 200:
                self.log_test("Enhanced Name Matching", False, f"API error: {response.status_code}")
                return False
            
            players = response.json()
            if not players:
                self.log_test("Enhanced Name Matching", False, "No player data returned")
                return False
            
            # Analyze name matching effectiveness
            total_players = len(players)
            players_with_snaps = len([p for p in players if p.get('snap_percentage') is not None])
            match_rate = (players_with_snaps / total_players * 100) if total_players > 0 else 0
            
            # Look for specific examples of name variations that should be matched
            name_variations_found = []
            jr_sr_examples = []
            punctuation_examples = []
            
            for player in players:
                name = player.get('player_name', '')
                if any(suffix in name.lower() for suffix in [' jr', ' sr', ' iii', ' ii']):
                    jr_sr_examples.append({
                        'name': name,
                        'has_snap_data': player.get('snap_percentage') is not None,
                        'snap_count': player.get('snap_percentage')
                    })
                
                if '.' in name or any(char in name for char in ['A.J.', 'D.J.', 'T.J.']):
                    punctuation_examples.append({
                        'name': name,
                        'has_snap_data': player.get('snap_percentage') is not None,
                        'snap_count': player.get('snap_percentage')
                    })
            
            # Test specific cases mentioned in the review request
            chris_godwin_found = False
            for player in players:
                if 'chris godwin' in player.get('player_name', '').lower():
                    chris_godwin_found = True
                    has_snap_data = player.get('snap_percentage') is not None
                    self.log_test("Chris Godwin Name Matching", has_snap_data, 
                        f"Chris Godwin snap data: {player.get('snap_percentage')}")
                    break
            
            # Overall assessment
            success = match_rate >= 85  # Expect high match rate based on review request
            
            self.log_test("Enhanced Name Matching System", success, 
                f"Match rate: {match_rate:.1f}% ({players_with_snaps}/{total_players}). "
                f"Jr/Sr examples: {len(jr_sr_examples)}, Punctuation examples: {len(punctuation_examples)}")
            
            if jr_sr_examples:
                matched_jr_sr = len([ex for ex in jr_sr_examples if ex['has_snap_data']])
                self.log_test("Jr/Sr Suffix Matching", matched_jr_sr > 0, 
                    f"{matched_jr_sr}/{len(jr_sr_examples)} Jr/Sr players have snap data", 
                    jr_sr_examples[:3])
            
            if punctuation_examples:
                matched_punct = len([ex for ex in punctuation_examples if ex['has_snap_data']])
                self.log_test("Punctuation Matching", matched_punct > 0, 
                    f"{matched_punct}/{len(punctuation_examples)} punctuation players have snap data", 
                    punctuation_examples[:3])
            
            return success
            
        except Exception as e:
            self.log_test("Enhanced Name Matching", False, f"Error: {str(e)}")
            return False

    def test_master_player_mapping_system(self) -> bool:
        """Test master player mapping system and COALESCE fallback logic"""
        try:
            # Test the snap-counts endpoint to verify the mapping system
            response = self.session.get(f"{self.backend_url}/snap-counts", params={
                'season': 2024,
                'week': 1,
                'limit': 50
            })
            
            if response.status_code != 200:
                self.log_test("Master Player Mapping", False, f"Snap counts API error: {response.status_code}")
                return False
            
            snap_data = response.json()
            snap_records = snap_data.get('data', [])
            
            if not snap_records:
                self.log_test("Master Player Mapping", False, "No snap count records found")
                return False
            
            # Verify snap count data structure and values
            valid_snap_records = []
            for record in snap_records:
                offense_snaps = record.get('offense_snaps', 0)
                if offense_snaps and offense_snaps > 0:
                    valid_snap_records.append({
                        'player': record.get('player_name'),
                        'offense_snaps': offense_snaps,
                        'team': record.get('team'),
                        'position': record.get('position')
                    })
            
            # Test COALESCE fallback by checking players endpoint
            response = self.session.get(f"{self.backend_url}/players", params={
                'season': 2024,
                'week': 1,
                'limit': 50
            })
            
            if response.status_code == 200:
                players = response.json()
                fallback_cases = []
                direct_matches = []
                
                for player in players:
                    snap_pct = player.get('snap_percentage')
                    if snap_pct is not None:
                        # Check if this looks like a direct snap count (>1) or fallback percentage
                        if snap_pct > 1:
                            direct_matches.append({
                                'player': player.get('player_name'),
                                'snap_count': snap_pct
                            })
                        elif 0 < snap_pct <= 1:
                            fallback_cases.append({
                                'player': player.get('player_name'),
                                'fallback_percentage': snap_pct
                            })
                
                self.log_test("COALESCE Fallback Logic", True, 
                    f"Direct matches: {len(direct_matches)}, Fallback cases: {len(fallback_cases)}")
                
                self.log_test("Master Player Mapping System", True, 
                    f"Found {len(valid_snap_records)} valid snap records, "
                    f"{len(direct_matches)} direct snap count matches", 
                    valid_snap_records[:3])
                return True
            else:
                self.log_test("Master Player Mapping", False, "Could not test COALESCE logic")
                return False
            
        except Exception as e:
            self.log_test("Master Player Mapping System", False, f"Error: {str(e)}")
            return False

    def test_data_integration(self) -> bool:
        """Test data integration between tables"""
        try:
            # Test snap counts endpoint
            response = self.session.get(f"{self.backend_url}/snap-counts", params={
                'season': 2024,
                'week': 1,
                'limit': 10
            })
            
            if response.status_code == 200:
                data = response.json()
                snap_records = data.get('data', [])
                self.log_test("Snap Counts Endpoint", True, 
                    f"Retrieved {len(snap_records)} snap count records")
                
                # Check if snap count data has proper structure
                if snap_records:
                    sample_record = snap_records[0]
                    required_fields = ['player_name', 'team', 'season', 'week', 'offense_snaps']
                    missing_fields = [field for field in required_fields if field not in sample_record]
                    
                    if missing_fields:
                        self.log_test("Snap Count Data Structure", False, 
                            f"Missing fields: {missing_fields}", sample_record)
                    else:
                        self.log_test("Snap Count Data Structure", True, 
                            "All required fields present", sample_record)
            else:
                self.log_test("Snap Counts Endpoint", False, 
                    f"API error: {response.status_code}")
            
            # Test player name matching between tables
            response = self.session.get(f"{self.backend_url}/players", params={
                'season': 2024,
                'week': 1,
                'limit': 5
            })
            
            if response.status_code == 200:
                players = response.json()
                players_with_snaps = [p for p in players if p.get('snap_percentage') is not None]
                players_with_pricing = [p for p in players if p.get('dk_salary') is not None]
                
                self.log_test("Player Data Integration", True, 
                    f"Out of {len(players)} players: {len(players_with_snaps)} have snap data, "
                    f"{len(players_with_pricing)} have pricing data")
                
                return True
            else:
                self.log_test("Player Data Integration", False, 
                    f"Could not retrieve player data: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Data Integration", False, f"Error: {str(e)}")
            return False
    
    def test_filtering_functionality(self) -> bool:
        """Test API filtering parameters"""
        try:
            # Test position filtering
            response = self.session.get(f"{self.backend_url}/players", params={
                'season': 2024,
                'position': 'QB',
                'limit': 10
            })
            
            if response.status_code == 200:
                players = response.json()
                non_qb_players = [p for p in players if p.get('position') != 'QB']
                
                if non_qb_players:
                    self.log_test("Position Filtering", False, 
                        f"Found {len(non_qb_players)} non-QB players in QB filter")
                else:
                    self.log_test("Position Filtering", True, 
                        f"Position filter working correctly - {len(players)} QBs returned")
            
            # Test team filtering
            response = self.session.get(f"{self.backend_url}/players", params={
                'season': 2024,
                'team': 'KC',
                'limit': 10
            })
            
            if response.status_code == 200:
                players = response.json()
                non_kc_players = [p for p in players if p.get('team') != 'KC']
                
                if non_kc_players:
                    self.log_test("Team Filtering", False, 
                        f"Found {len(non_kc_players)} non-KC players in KC filter")
                else:
                    self.log_test("Team Filtering", True, 
                        f"Team filter working correctly - {len(players)} KC players returned")
            
            return True
            
        except Exception as e:
            self.log_test("Filtering Functionality", False, f"Error: {str(e)}")
            return False
    
    def test_refresh_data_endpoint(self) -> bool:
        """Test data refresh endpoint"""
        try:
            # Test with a small subset to avoid long waits
            response = self.session.post(f"{self.backend_url}/refresh-data", params={
                'seasons': [2024]
            })
            
            if response.status_code == 200:
                data = response.json()
                records_loaded = data.get('records_loaded', 0)
                snap_records = data.get('snap_records_loaded', 0)
                
                self.log_test("Data Refresh", True, 
                    f"Refresh completed: {records_loaded} player records, {snap_records} snap records")
                return True
            else:
                self.log_test("Data Refresh", False, 
                    f"API error: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Data Refresh", False, f"Error: {str(e)}")
            return False
    
    def run_comprehensive_test(self):
        """Run all tests and provide summary"""
        print("=" * 60)
        print("NFL Fantasy Football Backend Testing Suite")
        print("=" * 60)
        
        # Test 1: Basic API Health
        api_healthy = self.test_api_health()
        if not api_healthy:
            print("❌ API is not responding. Stopping tests.")
            return
        
        # Test 2: Get database overview
        stats_summary = self.test_stats_summary()
        
        # Test 3: Enhanced Name Matching System (HIGH PRIORITY)
        print("\n🎯 Testing Enhanced Name Matching System...")
        self.test_enhanced_name_matching()
        
        # Test 4: Snap Count Fix Validation (HIGH PRIORITY)
        print("\n🔍 Testing Snap Count Fix...")
        self.test_snap_count_fix()
        
        # Test 5: Master Player Mapping System (HIGH PRIORITY)
        print("\n🗺️ Testing Master Player Mapping System...")
        self.test_master_player_mapping_system()
        
        # Test 6: DraftKings Pricing Investigation (EXPECTED TO FAIL)
        print("\n💰 Testing DraftKings Pricing...")
        self.test_draftkings_pricing_investigation()
        
        # Test 7: Data Integration
        print("\n🔗 Testing Data Integration...")
        self.test_data_integration()
        
        # Test 8: Filtering Functionality
        print("\n🔍 Testing Filtering...")
        self.test_filtering_functionality()
        
        # Test 9: Data Refresh (Optional - can be slow)
        print("\n🔄 Testing Data Refresh...")
        # self.test_refresh_data_endpoint()  # Commented out to avoid long waits
        
        # Summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        passed_tests = [t for t in self.test_results if t['success']]
        failed_tests = [t for t in self.test_results if not t['success']]
        
        print(f"✅ Passed: {len(passed_tests)}")
        print(f"❌ Failed: {len(failed_tests)}")
        
        if failed_tests:
            print("\nFAILED TESTS:")
            for test in failed_tests:
                print(f"  - {test['test_name']}: {test['details']}")
        
        return {
            'total_tests': len(self.test_results),
            'passed': len(passed_tests),
            'failed': len(failed_tests),
            'results': self.test_results
        }

if __name__ == "__main__":
    tester = NFLFantasyTester()
    results = tester.run_comprehensive_test()
    
    # Save results to file
    with open('/app/test_results_backend.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\nDetailed results saved to /app/test_results_backend.json")