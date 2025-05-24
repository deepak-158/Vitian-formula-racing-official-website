import React from 'react';
import ContentModelEditor from '../../components/admin/ContentModelEditor';
import adminCmsService from '../../services/adminCmsService';

const ProjectsEditorPage: React.FC = () => {
  return (
    <ContentModelEditor
      title="Projects"
      dataType="projects"
      description="Edit racing project details, including project status, team members, and related images."
      imageFolder="projects"
      fetchData={adminCmsService.getProjects}
      saveData={adminCmsService.saveProjects}
    />
  );
};

export default ProjectsEditorPage;
