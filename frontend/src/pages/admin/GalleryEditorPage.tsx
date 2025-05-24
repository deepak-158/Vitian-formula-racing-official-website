import React from 'react';
import ContentModelEditor from '../../components/admin/ContentModelEditor';
import adminCmsService from '../../services/adminCmsService';

const GalleryEditorPage: React.FC = () => {
  return (
    <ContentModelEditor
      title="Gallery"
      dataType="gallery"
      description="Edit gallery images and albums for your racing team. You can upload new images, update captions, and organize images into categories."
      imageFolder="gallery"
      fetchData={adminCmsService.getGallery}
      saveData={adminCmsService.saveGallery}
    />
  );
};

export default GalleryEditorPage;
