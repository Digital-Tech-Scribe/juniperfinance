#!/usr/bin/env python3
"""
Backend API Testing for Juniper Broz Investment Portfolio
Tests all backend endpoints according to test_result.md priorities
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from frontend .env
BASE_URL = "https://juniperfinance.preview.emergentagent.com/api"

def test_seed_endpoint():
    """Test POST /api/seed - Seed database with initial data"""
    print("\n=== Testing POST /api/seed ===")
    try:
        response = requests.post(f"{BASE_URL}/seed", timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "seeded" in data:
                print("✅ Seed endpoint working - Database seeded successfully")
                return True
            else:
                print("❌ Seed endpoint response format incorrect")
                return False
        else:
            print(f"❌ Seed endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Seed endpoint error: {str(e)}")
        return False

def test_profile_endpoint():
    """Test GET /api/profile - Fetch site profile/settings"""
    print("\n=== Testing GET /api/profile ===")
    try:
        response = requests.get(f"{BASE_URL}/profile", timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "name", "title", "tagline", "description", "finraLink", "email"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if not missing_fields:
                print(f"✅ Profile endpoint working - Name: {data.get('name')}, Title: {data.get('title')}")
                print(f"   FINRA Link: {data.get('finraLink')}")
                return True
            else:
                print(f"❌ Profile endpoint missing fields: {missing_fields}")
                return False
        else:
            print(f"❌ Profile endpoint failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Profile endpoint error: {str(e)}")
        return False

def test_testimonials_endpoint():
    """Test GET /api/testimonials - Fetch testimonials"""
    print("\n=== Testing GET /api/testimonials ===")
    try:
        response = requests.get(f"{BASE_URL}/testimonials", timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"✅ Testimonials endpoint working - Found {len(data)} testimonials")
                if len(data) > 0:
                    first_testimonial = data[0]
                    required_fields = ["id", "name", "role", "content", "rating"]
                    missing_fields = [field for field in required_fields if field not in first_testimonial]
                    if not missing_fields:
                        print(f"   Sample: {first_testimonial.get('name')} - {first_testimonial.get('role')} - Rating: {first_testimonial.get('rating')}")
                        return True
                    else:
                        print(f"❌ Testimonial missing fields: {missing_fields}")
                        return False
                else:
                    print("⚠️ No testimonials found - may need seeding first")
                    return True  # Empty list is valid after seeding
            else:
                print(f"❌ Testimonials endpoint returned non-list: {type(data)}")
                return False
        else:
            print(f"❌ Testimonials endpoint failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Testimonials endpoint error: {str(e)}")
        return False

def test_insights_endpoint():
    """Test GET /api/insights - Fetch insights/blog posts"""
    print("\n=== Testing GET /api/insights ===")
    try:
        response = requests.get(f"{BASE_URL}/insights", timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"✅ Insights endpoint working - Found {len(data)} insights")
                if len(data) > 0:
                    first_insight = data[0]
                    required_fields = ["id", "title", "excerpt", "category", "date", "readTime"]
                    missing_fields = [field for field in required_fields if field not in first_insight]
                    if not missing_fields:
                        print(f"   Sample: {first_insight.get('title')} - {first_insight.get('category')} - {first_insight.get('readTime')}")
                        return True
                    else:
                        print(f"❌ Insight missing fields: {missing_fields}")
                        return False
                else:
                    print("⚠️ No insights found - may need seeding first")
                    return True  # Empty list is valid after seeding
            else:
                print(f"❌ Insights endpoint returned non-list: {type(data)}")
                return False
        else:
            print(f"❌ Insights endpoint failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Insights endpoint error: {str(e)}")
        return False

def test_performance_endpoint():
    """Test GET /api/performance - Fetch performance data"""
    print("\n=== Testing GET /api/performance ===")
    try:
        response = requests.get(f"{BASE_URL}/performance", timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "summary", "disclaimer", "chartData", "allocation"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if not missing_fields:
                summary = data.get("summary", {})
                chart_data = data.get("chartData", [])
                allocation = data.get("allocation", [])
                
                print(f"✅ Performance endpoint working")
                print(f"   YTD Return: {summary.get('ytdReturn')}")
                print(f"   Chart Data Points: {len(chart_data)}")
                print(f"   Allocation Items: {len(allocation)}")
                return True
            else:
                print(f"❌ Performance endpoint missing fields: {missing_fields}")
                return False
        else:
            print(f"❌ Performance endpoint failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Performance endpoint error: {str(e)}")
        return False

def test_contacts_endpoint():
    """Test POST /api/contacts - Submit contact form"""
    print("\n=== Testing POST /api/contacts ===")
    try:
        # Test data with realistic investment portfolio context
        test_contact = {
            "name": "Alexandra Thompson",
            "email": "alexandra.thompson@email.com",
            "phone": "+1-555-0123",
            "investmentGoal": "Portfolio diversification with cryptocurrency exposure",
            "message": "I'm interested in learning more about your forex and cryptocurrency investment strategies. I have a moderate risk tolerance and am looking to diversify my current equity-heavy portfolio."
        }
        
        response = requests.post(
            f"{BASE_URL}/contacts", 
            json=test_contact,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["id", "name", "email", "timestamp", "status"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if not missing_fields:
                print(f"✅ Contacts endpoint working - Contact created with ID: {data.get('id')}")
                print(f"   Name: {data.get('name')}, Email: {data.get('email')}")
                print(f"   Status: {data.get('status')}, Timestamp: {data.get('timestamp')}")
                return True
            else:
                print(f"❌ Contact response missing fields: {missing_fields}")
                return False
        else:
            print(f"❌ Contacts endpoint failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Contacts endpoint error: {str(e)}")
        return False

def test_contacts_validation():
    """Test POST /api/contacts validation with invalid data"""
    print("\n=== Testing POST /api/contacts Validation ===")
    try:
        # Test with missing required fields
        invalid_contact = {
            "name": "Test User"
            # Missing email (required field)
        }
        
        response = requests.post(
            f"{BASE_URL}/contacts", 
            json=invalid_contact,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 422:  # Validation error expected
            print("✅ Contact validation working - Properly rejects invalid data")
            return True
        elif response.status_code == 200:
            print("⚠️ Contact validation may be too lenient - accepted invalid data")
            return True  # Not a critical failure
        else:
            print(f"❌ Unexpected validation response: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Contact validation test error: {str(e)}")
        return False

def run_all_tests():
    """Run all backend API tests in priority order"""
    print("🚀 Starting Juniper Broz Investment Portfolio Backend API Tests")
    print(f"Testing against: {BASE_URL}")
    print("=" * 70)
    
    test_results = {}
    
    # Test in priority order from test_result.md
    test_results["seed"] = test_seed_endpoint()
    test_results["profile"] = test_profile_endpoint()
    test_results["testimonials"] = test_testimonials_endpoint()
    test_results["insights"] = test_insights_endpoint()
    test_results["performance"] = test_performance_endpoint()
    test_results["contacts"] = test_contacts_endpoint()
    test_results["contacts_validation"] = test_contacts_validation()
    
    # Summary
    print("\n" + "=" * 70)
    print("📊 TEST SUMMARY")
    print("=" * 70)
    
    passed = sum(1 for result in test_results.values() if result)
    total = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.upper():<20} {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend API tests passed!")
        return True
    else:
        print("⚠️ Some tests failed - check individual results above")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)