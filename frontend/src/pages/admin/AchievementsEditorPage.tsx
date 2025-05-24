import React from 'react';
import ContentModelEditor from '../../components/admin/ContentModelEditor';
import adminCmsService from '../../services/adminCmsService';

const AchievementsEditorPage: React.FC = () => {
  return (
    <ContentModelEditor
      title="Achievements"
      dataType="achievements"
      description="Edit achievements and awards for your racing team. You can update achievement details, dates, descriptions, and upload related images."
      imageFolder="achievements"
      fetchData={adminCmsService.getAchievements}
      saveData={adminCmsService.saveAchievements}
    />
  );
};

export default AchievementsEditorPage;
