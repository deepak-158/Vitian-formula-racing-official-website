// Admin CMS service for managing JSON data files

import { 
  Member, Event, Sponsor, NewsItem, Achievement, 
  Project, GalleryItem, MerchandiseItem, RacingJourney as RacingJourneyMilestone, TeamInfo 
} from './dataService';
import { downloadJsonFile, getTimestamp } from '../utils/dataRefresh';

// Helper function to return empty data structure based on data type
const getEmptyDataStructure = (dataType: string): any => {
  switch (dataType) {
    case 'members':
      return [];
    case 'events':
      return [];
    case 'projects':
      return [];
    case 'sponsors':
      return [];
    case 'news':
      return [];
    case 'gallery':
      return [];
    case 'achievements':
      return [];
    case 'merchandise':
      return [];
    case 'racing-journey':
      return [];
    case 'team-info':
      return { teamName: '', foundingYear: new Date().getFullYear(), description: '' };
    default:
      return [];
  }
};

// Helper to save JSON data to a file
const saveJsonData = async (dataType: string, data: any): Promise<boolean> => {
  try {
    const response = await fetch(`/api/admin/save-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dataType,
        data
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save ${dataType} data`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error saving ${dataType} data:`, error);
    return false;
  }
};

// Helper to get a downloadable JSON blob URL
export const getJsonDownloadUrl = (data: any): string => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  return URL.createObjectURL(blob);
};

// Admin CMS service
const adminCmsService = {  // Helper method to get data from API
  getData: async (dataType: string): Promise<any> => {
    try {
      console.log(`Attempting to load ${dataType} data...`);
      
      // First try our dedicated API endpoint (which redirects to Netlify function in production)
      try {
        const apiResponse = await fetch(`/api/admin/data/${dataType}`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        
        if (apiResponse.ok) {
          const data = await apiResponse.json();
          console.log(`Successfully loaded ${dataType} data from API:`, data);
          return data;
        } else {
          console.warn(`API response not ok for ${dataType}:`, apiResponse.status, apiResponse.statusText);
        }
      } catch (apiError) {
        console.warn(`API request failed for ${dataType}:`, apiError);
      }
      
      // If API fails, try the static data files
      const fallbackUrls = [
        `/data/${dataType}.json${getTimestamp()}`,
        `/build/data/${dataType}.json${getTimestamp()}`,
        `/src/data/${dataType}.json${getTimestamp()}`
      ];
      
      for (const url of fallbackUrls) {
        try {
          console.log(`Trying fallback URL: ${url}`);
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            console.log(`Successfully loaded ${dataType} data from ${url}:`, data);
            return data;
          }
        } catch (fallbackError) {
          console.warn(`Fallback failed for ${url}:`, fallbackError);
        }
      }
      
      // If all methods fail, return empty data based on type
      console.warn(`All data loading methods failed for ${dataType}, returning empty data`);
      return getEmptyDataStructure(dataType);
      
    } catch (error) {
      console.error(`Error loading ${dataType} data:`, error);
      // Return empty data structure instead of throwing
      return getEmptyDataStructure(dataType);
    }
  },
  
  // Members
  getMembers: async (): Promise<Member[]> => {
    return await adminCmsService.getData('members');
  },
  
  saveMembers: async (members: Member[]): Promise<boolean> => {
    const result = await saveJsonData('members', members);
    if (result) {
      // Provide option to download the updated JSON
      downloadJsonFile(members, 'members.json');
    }
    return result;
  },  // Events
  getEvents: async (): Promise<Event[]> => {
    return await adminCmsService.getData('events');
  },
  
  saveEvents: async (events: Event[]): Promise<boolean> => {
    const result = await saveJsonData('events', events);
    if (result) {
      downloadJsonFile(events, 'events.json');
    }
    return result;
  },
  // Projects
  getProjects: async (): Promise<Project[]> => {
    return await adminCmsService.getData('projects');
  },
  
  saveProjects: async (projects: Project[]): Promise<boolean> => {
    const result = await saveJsonData('projects', projects);
    if (result) {
      downloadJsonFile(projects, 'projects.json');
    }
    return result;
  },  // Sponsors
  getSponsors: async (): Promise<Sponsor[]> => {
    return await adminCmsService.getData('sponsors');
  },
  
  saveSponsors: async (sponsors: Sponsor[]): Promise<boolean> => {
    const result = await saveJsonData('sponsors', sponsors);
    if (result) {
      downloadJsonFile(sponsors, 'sponsors.json');
    }
    return result;
  },
  
  // News
  getNews: async (): Promise<NewsItem[]> => {
    return await adminCmsService.getData('news');
  },
  
  saveNews: async (news: NewsItem[]): Promise<boolean> => {
    const result = await saveJsonData('news', news);
    if (result) {
      downloadJsonFile(news, 'news.json');
    }
    return result;
  },  // Achievements
  getAchievements: async (): Promise<Achievement[]> => {
    return await adminCmsService.getData('achievements');
  },
  
  saveAchievements: async (achievements: Achievement[]): Promise<boolean> => {
    const result = await saveJsonData('achievements', achievements);
    if (result) {
      downloadJsonFile(achievements, 'achievements.json');
    }
    return result;
  },
  // Gallery
  getGallery: async (): Promise<GalleryItem[]> => {
    return await adminCmsService.getData('gallery');
  },
  
  saveGallery: async (gallery: GalleryItem[]): Promise<boolean> => {
    const result = await saveJsonData('gallery', gallery);
    if (result) {
      downloadJsonFile(gallery, 'gallery.json');
    }
    return result;
  },  // Merchandise
  getMerchandise: async (): Promise<MerchandiseItem[]> => {
    return await adminCmsService.getData('merchandise');
  },
  
  saveMerchandise: async (merchandise: MerchandiseItem[]): Promise<boolean> => {
    const result = await saveJsonData('merchandise', merchandise);
    if (result) {
      downloadJsonFile(merchandise, 'merchandise.json');
    }
    return result;
  },
  // Racing Journey
  getRacingJourney: async (): Promise<RacingJourneyMilestone[]> => {
    return await adminCmsService.getData('racing-journey');
  },
  
  saveRacingJourney: async (racingJourney: RacingJourneyMilestone[]): Promise<boolean> => {
    const result = await saveJsonData('racing-journey', racingJourney);
    if (result) {
      downloadJsonFile(racingJourney, 'racing-journey.json');
    }
    return result;
  },  // Team Info
  getTeamInfo: async (): Promise<TeamInfo> => {
    return await adminCmsService.getData('team-info');
  },
  
  saveTeamInfo: async (teamInfo: TeamInfo): Promise<boolean> => {
    const result = await saveJsonData('team-info', teamInfo);
    if (result) {
      downloadJsonFile(teamInfo, 'team-info.json');
    }
    return result;
  },
  
  // In a production environment, you would implement proper file upload handling
  // This is a placeholder for demo purposes
  uploadImage: async (file: File, destination: string): Promise<string> => {
    console.log(`Would upload image ${file.name} to ${destination}`);
    // In a real implementation, this would upload to your server or storage
    return URL.createObjectURL(file); // Returns a temporary URL for preview purposes
  }
};

export default adminCmsService;
