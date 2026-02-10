import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Import types from mockData
import type { 
  ProfileData, 
  Testimonial, 
  Insight, 
  PerformanceData 
} from '../data/mockData';

// Mock data for static site
import { 
  profileData as mockProfile, 
  testimonials as mockTestimonials, 
  insights as mockInsights, 
  performanceData as mockPerformance 
} from '../data/mockData';

interface DataContextType {
  profile: ProfileData;
  testimonials: Testimonial[];
  insights: Insight[];
  performance: PerformanceData;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [profile] = useState<ProfileData>(mockProfile);
  const [testimonials] = useState<Testimonial[]>(mockTestimonials);
  const [insights] = useState<Insight[]>(mockInsights);
  const [performance] = useState<PerformanceData>(mockPerformance);
  const [loading, setLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading complete immediately for static site
    setLoading(false);
  }, []);

  const value: DataContextType = {
    profile,
    testimonials,
    insights,
    performance,
    loading,
    error,
    refetch: () => {}
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
