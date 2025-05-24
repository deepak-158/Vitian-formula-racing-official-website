// Dynamic data loader service that fetches JSON files at runtime
// This allows the app to always load the latest data after CMS updates

const API_BASE_URL = window.location.origin;

// Helper function to fetch JSON from a URL
const fetchJSON = async (url: string) => {
  try {
    console.log(`Fetching data from: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
};

// Helper function that tries API first, then src/data, then public/data
const fetchDataWithFallback = async (fileName: string, dataType: string) => {
  const timestamp = new Date().getTime(); // Cache busting
  try {
    // First try our dedicated API endpoint
    try {
      const apiResponse = await fetch(`${API_BASE_URL}/api/admin/data/${dataType}`);
      if (apiResponse.ok) {
        return await apiResponse.json();
      }
    } catch (apiError) {
      console.log(`API endpoint not available for ${dataType}, trying direct file access`);
    }
    
    // Try to get from src/data
    try {
      const srcData = await fetchJSON(`${API_BASE_URL}/src/data/${fileName}?t=${timestamp}`);
      if (srcData) return srcData;
    } catch (srcError) {
      console.log(`src/data/${fileName} not available, trying public/data`);
    }
    
    // If that fails, try from public/data
    return await fetchJSON(`${API_BASE_URL}/data/${fileName}?t=${timestamp}`);
  } catch (error) {
    console.error(`Error fetching ${fileName}:`, error);
    return null;
  }
};

// Service object with methods to fetch different data types
const dynamicDataService = {
  // Members data
  getMembers: async () => {
    return await fetchDataWithFallback('members.json', 'members');
  },
  
  // Events data
  getEvents: async () => {
    return await fetchDataWithFallback('events.json', 'events');
  },
  
  // Sponsors data
  getSponsors: async () => {
    return await fetchDataWithFallback('sponsors.json', 'sponsors');
  },
  
  // News data
  getNews: async () => {
    return await fetchDataWithFallback('news.json', 'news');
  },
  
  // Achievements data
  getAchievements: async () => {
    return await fetchDataWithFallback('achievements.json', 'achievements');
  },
  // Projects data
  getProjects: async () => {
    return await fetchDataWithFallback('projects.json', 'projects');
  },
  
  // Racing journey data
  getRacingJourney: async () => {
    return await fetchDataWithFallback('racing-journey.json', 'racing-journey');
  },
  
  // Team info data
  getTeamInfo: async () => {
    return await fetchDataWithFallback('team-info.json', 'team-info');
  },
  
  // Gallery data
  getGallery: async () => {
    return await fetchDataWithFallback('gallery.json', 'gallery');
  },
  
  // Merchandise data
  getMerchandise: async () => {
    return await fetchDataWithFallback('merchandise.json', 'merchandise');
  },
  
  // Force reload all data
  refreshData: async () => {
    // Clear localStorage cache if any
    localStorage.removeItem('data_cache');
    
    // Reload all data
    await Promise.all([
      dynamicDataService.getMembers(),
      dynamicDataService.getEvents(),
      dynamicDataService.getSponsors(),
      dynamicDataService.getNews(),
      dynamicDataService.getAchievements(),
      dynamicDataService.getProjects(),
      dynamicDataService.getRacingJourney(),
      dynamicDataService.getTeamInfo(),
      dynamicDataService.getGallery(),
      dynamicDataService.getMerchandise()
    ]);
    
    console.log('All data refreshed');
    return true;
  }
};

export default dynamicDataService;
