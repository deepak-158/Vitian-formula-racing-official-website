import React from 'react';
import ContentModelEditor from '../../components/admin/ContentModelEditor';
import adminCmsService from '../../services/adminCmsService';

const SponsorsEditorPage: React.FC = () => {
  return (
    <ContentModelEditor
      title="Sponsors"
      dataType="sponsors"
      description="Edit sponsor information for your racing team. You can update sponsor details, logos, and description."
      imageFolder="sponsors"
      fetchData={adminCmsService.getSponsors}
      saveData={adminCmsService.saveSponsors}
    />
  );
};

export default SponsorsEditorPage;
