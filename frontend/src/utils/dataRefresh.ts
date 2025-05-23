// Data refresh utility to help components reload data after CMS updates
import { useEffect } from 'react';
import dataService from '../services/dataService';

// Set this to true when you want to force a data refresh across the app
export const FORCE_DATA_REFRESH = false;

// Custom hook to initialize data loading or refresh data
export const useDataRefresh = (options = { refreshInterval: null }) => {
  useEffect(() => {
    // Initial data load
    const loadData = async () => {
      try {
        await dataService.refreshAllData();
        console.log('Initial data loaded successfully');
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };
    
    loadData();
    
    // Set up interval refresh if specified
    if (options.refreshInterval) {
      const intervalId = setInterval(async () => {
        try {
          await dataService.refreshAllData();
          console.log('Data refreshed via interval');
        } catch (error) {
          console.error('Error refreshing data:', error);
        }
      }, options.refreshInterval);
      
      return () => clearInterval(intervalId);
    }
  }, [options.refreshInterval]);
  
  return {
    refreshData: dataService.refreshAllData
  };
};

// Function to trigger a data refresh from anywhere in the app
export const refreshAppData = async () => {
  try {
    await dataService.refreshAllData();
    console.log('App data refreshed successfully');
    return true;
  } catch (error) {
    console.error('Error refreshing app data:', error);
    return false;
  }
};
