import React from 'react';
import ContentModelEditor from '../../components/admin/ContentModelEditor';
import adminCmsService from '../../services/adminCmsService';

const RacingJourneyEditorPage: React.FC = () => {
  return (
    <ContentModelEditor
      title="Racing Journey"
      dataType="racing-journey"
      description="Edit your racing team's journey timeline, including key milestones and events."
      fetchData={adminCmsService.getRacingJourney}
      saveData={adminCmsService.saveRacingJourney}
    />
  );
};

export default RacingJourneyEditorPage;
