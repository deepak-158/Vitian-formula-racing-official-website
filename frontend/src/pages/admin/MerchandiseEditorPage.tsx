import React from 'react';
import ContentModelEditor from '../../components/admin/ContentModelEditor';
import adminCmsService from '../../services/adminCmsService';

const MerchandiseEditorPage: React.FC = () => {
  return (
    <ContentModelEditor
      title="Merchandise"
      dataType="merchandise"
      description="Edit merchandise items, including prices, descriptions, and product images."
      imageFolder="merchandise"
      fetchData={adminCmsService.getMerchandise}
      saveData={adminCmsService.saveMerchandise}
    />
  );
};

export default MerchandiseEditorPage;
