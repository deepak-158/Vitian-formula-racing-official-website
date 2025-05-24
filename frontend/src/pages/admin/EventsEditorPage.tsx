import React from 'react';
import ContentModelEditor from '../../components/admin/ContentModelEditor';
import adminCmsService from '../../services/adminCmsService';

const EventsEditorPage: React.FC = () => {
  return (
    <ContentModelEditor
      title="Events"
      dataType="events"
      description="Edit upcoming and past events for your racing team. You can update event details, dates, locations, and upload event images."
      imageFolder="events"
      fetchData={adminCmsService.getEvents}
      saveData={adminCmsService.saveEvents}
    />
  );
};

export default EventsEditorPage;
