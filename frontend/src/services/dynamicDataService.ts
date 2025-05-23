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

// Service object with methods to fetch different data types
const dynamicDataService = {
  // Members data
  getMembers: async () => {
    const timestamp = new Date().getTime(); // Cache busting
    return await fetchJSON(`${API_BASE_URL}/data/members.json?t=${timestamp}`);
  },
  
  // Events data
  getEvents: async () => {
    const timestamp = new Date().getTime();
    return await fetchJSON(`${API_BASE_URL}/data/events.json?t=${timestamp}`);
  },
  
  // Sponsors data
  getSponsors: async () => {
    const timestamp = new Date().getTime();
    return await fetchJSON(`${API_BASE_URL}/data/sponsors.json?t=${timestamp}`);
  },
    // News data
  getNews: async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`${API_BASE_URL}/data/news.json?t=${timestamp}`);
      if (!response.ok) {
        console.warn('News data not found, returning empty array');
        return [];
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching news data:', error);
      return [];
    }
  },
  
  // Achievements data
  getAchievements: async () => {
    const timestamp = new Date().getTime();
    return await fetchJSON(`${API_BASE_URL}/data/achievements.json?t=${timestamp}`);
  },
    // Projects data
  getProjects: async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`${API_BASE_URL}/data/projects.json?t=${timestamp}`);
      if (!response.ok) {
        console.warn('Projects data not found, returning empty array');
        return [];
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects data:', error);
      return [];
    }
  },
  
  // Racing journey data
  getRacingJourney: async () => {
    const timestamp = new Date().getTime();
    return await fetchJSON(`${API_BASE_URL}/data/racing-journey.json?t=${timestamp}`);
  },
  
  // Team info data
  getTeamInfo: async () => {
    const timestamp = new Date().getTime();
    return await fetchJSON(`${API_BASE_URL}/data/team-info.json?t=${timestamp}`);
  },
  
  // Gallery data
  getGallery: async () => {
    const timestamp = new Date().getTime();
    return await fetchJSON(`${API_BASE_URL}/data/gallery.json?t=${timestamp}`);
  },
  
  // Merchandise data
  getMerchandise: async () => {
    const timestamp = new Date().getTime();
    return await fetchJSON(`${API_BASE_URL}/data/merchandise.json?t=${timestamp}`);
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
      dynamicDataService.getAchievements(),
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
