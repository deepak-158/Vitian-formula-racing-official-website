import React from 'react';
import ContentModelEditor from '../../components/admin/ContentModelEditor';
import adminCmsService from '../../services/adminCmsService';

const TeamInfoEditorPage: React.FC = () => {
  return (
    <ContentModelEditor
      title="Team Info"
      dataType="team-info"
      description="Edit general information about your racing team, including mission, vision, and contact details."
      fetchData={adminCmsService.getTeamInfo}
      saveData={adminCmsService.saveTeamInfo}
    />
  );
};

export default TeamInfoEditorPage;
