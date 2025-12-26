import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getProfile, getTestimonials, getInsights, getPerformance, seedDatabase } from '../services/api';

// Default mock data as fallback
import { profileData as mockProfile, testimonials as mockTestimonials, insights as mockInsights, performanceData as mockPerformance } from '../data/mockData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [profile, setProfile] = useState(mockProfile);
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [insights, setInsights] = useState(mockInsights);
  const [performance, setPerformance] = useState(mockPerformance);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // First seed the database to ensure we have data
      await seedDatabase();
      
      // Fetch all data in parallel
      const [profileRes, testimonialsRes, insightsRes, performanceRes] = await Promise.all([
        getProfile().catch(() => null),
        getTestimonials().catch(() => null),
        getInsights().catch(() => null),
        getPerformance().catch(() => null)
      ]);
      
      if (profileRes) setProfile(profileRes);
      if (testimonialsRes && testimonialsRes.length > 0) setTestimonials(testimonialsRes);
      if (insightsRes && insightsRes.length > 0) setInsights(insightsRes);
      if (performanceRes) {
        // Merge with mock data structure if needed
        setPerformance({
          summary: performanceRes.summary || mockPerformance.summary,
          chartData: performanceRes.chartData?.length > 0 ? performanceRes.chartData : mockPerformance.chartData,
          allocation: performanceRes.allocation?.length > 0 ? performanceRes.allocation : mockPerformance.allocation,
          disclaimer: performanceRes.disclaimer || mockPerformance.disclaimer
        });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
      // Keep using mock data as fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const value = {
    profile,
    testimonials,
    insights,
    performance,
    loading,
    error,
    refetch: fetchAllData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
