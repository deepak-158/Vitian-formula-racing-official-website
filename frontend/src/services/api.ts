// This file now serves as a compatibility layer for components that
// might still be using the old API service.
// It redirects all calls to our local dataService instead.

import dataService, { Member, Project } from './dataService';

// Compatibility layer for the members service
export const membersService = {
  getAll: async (): Promise<Member[]> => {
    return dataService.getAllMembers();
  },

  getById: async (id: string): Promise<Member> => {
    const member = await dataService.getMemberById(id);
    if (!member) throw new Error(`Member with ID ${id} not found`);
    return member;
  }
};

// Compatibility layer for the projects service
export const projectsService = {
  getAll: async (): Promise<Project[]> => {
    return dataService.getAllProjects();
  },

  getById: async (id: string): Promise<Project> => {
    const project = await dataService.getProjectById(id);
    if (!project) throw new Error(`Project with ID ${id} not found`);
    return project;
  }
};

// Always return true for backend connection check - no need to check anymore since we're using static files
export const checkBackendConnection = async (): Promise<boolean> => {
  return true;
};