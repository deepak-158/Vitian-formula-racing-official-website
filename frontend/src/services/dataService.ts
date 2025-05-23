import membersData from '../data/members.json';
import projectsData from '../data/projects.json';
import eventsData from '../data/events.json';
import sponsorsData from '../data/sponsors.json';
import galleryData from '../data/gallery.json';
import merchandiseData from '../data/merchandise.json';
import newsData from '../data/news.json';
import achievementsData from '../data/achievements.json';
import racingJourneyData from '../data/racing-journey.json';
import teamInfoData from '../data/team-info.json';

// Types
export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  social_links: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface ProjectMember {
  role: string;
  member_id: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date?: string;
  image_url: string;
  members: ProjectMember[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  imageUrl: string;
  isUpcoming: boolean;
  registrationLink?: string;
  registrationDeadline?: string;
  results?: {
    position: string;
    team: string;
    achievements?: string[];
  }[];
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner';
  website: string;
  description?: string;
  since?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  url: string;
  alt?: string;
  thumbnail?: string;
  description?: string;
  date: string;
}

export interface MerchandiseItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  availableSizes?: string[];
  stockQuantity: number;
  featured: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  category: string;
  imageUrl: string;
  additionalAwards?: string[];
}

export interface RacingJourney {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface TeamInfo {
  welcome: {
    title: string;
    description: string[];
    logoImage: string;
    buttonText: string;
    buttonLink: string;
  };
  mission: {
    title: string;
    statement: string;
    values: {
      title: string;
      description: string;
    }[];
  };
}

// Data service with methods to access the local JSON data
const dataService = {
  // Member methods
  getAllMembers: (): Member[] => {
    return membersData as Member[];
  },
  
  getMemberById: (id: string): Member | undefined => {
    return (membersData as Member[]).find(member => member.id === id);
  },
  
  // Project methods
  getAllProjects: (): Project[] => {
    return projectsData as Project[];
  },
  
  getProjectById: (id: string): Project | undefined => {
    return (projectsData as Project[]).find(project => project.id === id);
  },
  
  // Helper method to get full member details for project members
  getProjectWithMembers: (id: string): (Project & { memberDetails: Member[] }) | undefined => {
    const project = (projectsData as Project[]).find(p => p.id === id);
    if (!project) return undefined;
    
    const memberDetails = project.members.map(pm => {
      return (membersData as Member[]).find(m => m.id === pm.member_id);
    }).filter(m => m !== undefined) as Member[];
    
    return {
      ...project,
      memberDetails
    };
  },

  // Event methods
  getAllEvents: (): Event[] => {
    return eventsData as Event[];
  },

  getEventById: (id: string): Event | undefined => {
    return (eventsData as Event[]).find(event => event.id === id);
  },

  getUpcomingEvents: (): Event[] => {
    return (eventsData as Event[]).filter(event => event.isUpcoming);
  },

  getPastEvents: (): Event[] => {
    return (eventsData as Event[]).filter(event => !event.isUpcoming);
  },

  // Sponsor methods
  getAllSponsors: (): Sponsor[] => {
    return sponsorsData as Sponsor[];
  },

  getSponsorById: (id: string): Sponsor | undefined => {
    return (sponsorsData as Sponsor[]).find(sponsor => sponsor.id === id);
  },

  getSponsorsByTier: (tier: Sponsor['tier']): Sponsor[] => {
    return (sponsorsData as Sponsor[]).filter(sponsor => sponsor.tier === tier);
  },

  // Gallery methods
  getAllGalleryItems: (): GalleryItem[] => {
    return galleryData as GalleryItem[];
  },

  getGalleryItemById: (id: string): GalleryItem | undefined => {
    return (galleryData as GalleryItem[]).find(item => item.id === id);
  },

  getGalleryItemsByCategory: (category: string): GalleryItem[] => {
    return (galleryData as GalleryItem[]).filter(item => item.category === category);
  },

  // Merchandise methods
  getAllMerchandise: (): MerchandiseItem[] => {
    return merchandiseData as MerchandiseItem[];
  },

  getMerchandiseById: (id: string): MerchandiseItem | undefined => {
    return (merchandiseData as MerchandiseItem[]).find(item => item.id === id);
  },

  getFeaturedMerchandise: (): MerchandiseItem[] => {
    return (merchandiseData as MerchandiseItem[]).filter(item => item.featured);
  },

  getMerchandiseByCategory: (category: string): MerchandiseItem[] => {
    return (merchandiseData as MerchandiseItem[]).filter(item => item.category === category);
  },

  // News methods
  getAllNews: (): NewsItem[] => {
    return newsData as NewsItem[];
  },

  getNewsById: (id: string): NewsItem | undefined => {
    return (newsData as NewsItem[]).find(item => item.id === id);
  },

  getNewsByCategory: (category: string): NewsItem[] => {
    return (newsData as NewsItem[]).filter(item => item.category === category);
  },

  getRecentNews: (count: number = 3): NewsItem[] => {
    return [...(newsData as NewsItem[])]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  },

  // Achievement methods
  getAllAchievements: (): Achievement[] => {
    return achievementsData as Achievement[];
  },

  getAchievementById: (id: string): Achievement | undefined => {
    return (achievementsData as Achievement[]).find(item => item.id === id);
  },

  getAchievementsByCategory: (category: string): Achievement[] => {
    return (achievementsData as Achievement[]).filter(item => item.category === category);
  },
  getRecentAchievements: (count: number = 3): Achievement[] => {
    return [...(achievementsData as Achievement[])]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  },
  // Racing Journey methods
  getAllRacingJourneyItems: (): RacingJourney[] => {
    return racingJourneyData as RacingJourney[];
  },
    // Team Info methods
  getTeamInfo: (): TeamInfo => {
    return teamInfoData as TeamInfo;
  },
  
  getTeamWelcomeInfo: () => {
    return (teamInfoData as TeamInfo).welcome;
  },
  
  getTeamMissionInfo: () => {
    return (teamInfoData as TeamInfo).mission;
  }
};

export default dataService; 