// Data refresh utility to help components reload data after CMS updates
import { useEffect } from 'react';
import dataService from '../services/dataService';

// Set this to true when you want to force a data refresh across the app
export const FORCE_DATA_REFRESH = false;

// Cache busting timestamp generator
export const getTimestamp = (): string => {
  return `?t=${new Date().getTime()}`;
};

// Download a JSON file
export const downloadJsonFile = (data: any, fileName: string): void => {
  // Convert JSON to string
  const jsonString = JSON.stringify(data, null, 2);
  
  // Create blob and download link
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  
  // Trigger download and clean up
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Refresh function to reload specific data types
export const refreshData = async (dataType?: string): Promise<boolean> => {
  try {
    let url = '/api/refresh-data';
    if (dataType) {
      url += `?type=${dataType}`;
    }
    
    const response = await fetch(url);
    
    // Even if we get an error from Netlify, we should still return true to avoid breaking the UI
    // In Netlify, this would just be a simulated refresh anyway
    if (!response.ok) {
      console.warn('Refresh data returned a non-200 status, but continuing operation');
    }
    
    return true;
  } catch (error) {
    console.error('Error refreshing data:', error);
    // Even if this fails, we don't want to break the UI flow in production
    return true;
  }
};

// Function to trigger a data refresh from anywhere in the app
export const refreshAppData = async (): Promise<boolean> => {
  try {
    await dataService.refreshAllData();
    console.log('App data refreshed successfully');
    return true;
  } catch (error) {
    console.error('Error refreshing app data:', error);
    return false;
  }
};

// Custom hook for data refreshing
export const useDataRefresher = (refreshInterval?: number) => {
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
    if (refreshInterval) {
      const intervalId = setInterval(async () => {
        try {
          await dataService.refreshAllData();
          console.log('Data refreshed via interval');
        } catch (error) {
          console.error('Error refreshing data:', error);
        }
      }, refreshInterval);
      
      return () => clearInterval(intervalId);
    }
    return undefined;
  }, [refreshInterval]);
  
  return {
    refreshData: dataService.refreshAllData
  };
};
