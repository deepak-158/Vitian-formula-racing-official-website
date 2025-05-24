import React from 'react';
import ContentModelEditor from '../../components/admin/ContentModelEditor';
import adminCmsService from '../../services/adminCmsService';

const NewsEditorPage: React.FC = () => {
  return (
    <ContentModelEditor
      title="News"
      dataType="news"
      description="Edit news articles for your racing team. You can update article details, add new posts, and upload news images."
      imageFolder="news"
      fetchData={adminCmsService.getNews}
      saveData={adminCmsService.saveNews}
    />
  );
};

export default NewsEditorPage;
