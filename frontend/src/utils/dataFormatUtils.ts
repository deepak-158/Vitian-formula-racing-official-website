// Utility to handle different data formats between CMS and application
export const formatTeamInfoForApp = (teamInfo: any) => {
  if (!teamInfo) return teamInfo;
  
  // Convert description format from CMS (array of objects) to app format (array of strings)
  if (teamInfo.welcome?.description) {
    teamInfo.welcome.description = teamInfo.welcome.description.map((item: any) => 
      typeof item === 'object' && item.paragraph ? item.paragraph : item
    );
  }
  
  return teamInfo;
};

// Convert from app format to CMS format
export const formatTeamInfoForCMS = (teamInfo: any) => {
  if (!teamInfo) return teamInfo;
  
  // Convert description format from app (array of strings) to CMS format (array of objects)
  if (teamInfo.welcome?.description) {
    teamInfo.welcome.description = teamInfo.welcome.description.map((item: any) => 
      typeof item === 'string' ? { paragraph: item } : item
    );
  }
  
  return teamInfo;
};
