// Preview components for Netlify CMS
import React from 'react';
import CMS from 'netlify-cms-app';

// Preview component for team members
const TeamMemberPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>Member Preview</h2>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ width: '120px', height: '120px', overflow: 'hidden', borderRadius: '60px', marginRight: '20px' }}>
          <img 
            src={data.image_url || 'https://via.placeholder.com/150'} 
            alt={data.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div>
          <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{data.name || 'Name'}</h3>
          <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#666' }}>{data.role || 'Role'}</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {data.social_links?.linkedin && (
              <a href={data.social_links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            )}
            {data.social_links?.twitter && (
              <a href={data.social_links.twitter} target="_blank" rel="noreferrer">Twitter</a>
            )}
            {data.social_links?.github && (
              <a href={data.social_links.github} target="_blank" rel="noreferrer">GitHub</a>
            )}
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#f7f7f7', padding: '15px', borderRadius: '5px' }}>
        <p style={{ margin: '0', lineHeight: '1.5' }}>{data.bio || 'Bio information will appear here.'}</p>
      </div>
    </div>
  );
};

// Preview component for events
const EventPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();
  
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>Event Preview</h2>
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <img 
          src={data.imageUrl || 'https://via.placeholder.com/500x300'} 
          alt={data.title} 
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
        />
        {data.isUpcoming && (
          <span style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px',
            background: '#e41f1a', 
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>Upcoming</span>
        )}
      </div>
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{data.title || 'Event Title'}</h3>
      <div style={{ display: 'flex', marginBottom: '10px', fontSize: '14px', color: '#666' }}>
        <div style={{ marginRight: '20px' }}>
          <strong>Date:</strong> {data.date || 'TBD'}
        </div>
        <div>
          <strong>Location:</strong> {data.location || 'TBD'}
        </div>
      </div>
      <div style={{ backgroundColor: '#f7f7f7', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
        <p style={{ margin: '0', lineHeight: '1.5' }}>{data.description || 'Event description will appear here.'}</p>
      </div>
      {data.registrationLink && (
        <a 
          href={data.registrationLink} 
          target="_blank" 
          rel="noreferrer"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#e41f1a',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Register Now
        </a>
      )}
    </div>
  );
};

// Register the preview templates
CMS.registerPreviewTemplate('team-members', TeamMemberPreview);
CMS.registerPreviewTemplate('events', EventPreview);

export { TeamMemberPreview, EventPreview };
