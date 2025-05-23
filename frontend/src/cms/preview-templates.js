// Preview components for Netlify CMS
import React from 'react';
import CMS from 'netlify-cms-app';

// Preview component for team members
const TeamMemberPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        marginBottom: '2rem'
      }}>
        <div style={{
          width: '100%',
          height: '300px',
          overflow: 'hidden',
          backgroundColor: '#f3f4f6',
          position: 'relative'
        }}>
          <img 
            src={data.image_url || 'https://via.placeholder.com/400x400'} 
            alt={data.name} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ 
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '0.5rem'
          }}>
            {data.name || 'Member Name'}
          </h3>
          
          <p style={{ 
            fontSize: '1rem',
            color: 'var(--color-primary-600, #e41f1a)',
            marginBottom: '1rem',
            fontWeight: '500'
          }}>
            {data.role || 'Role'}
          </p>
          
          <p style={{ 
            color: '#4b5563',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            marginBottom: '1.5rem'
          }}>
            {data.bio || 'Member bio will appear here.'}
          </p>
          
          <div style={{ 
            display: 'flex',
            gap: '1rem',
            marginTop: 'auto'
          }}>
            {data.social_links?.linkedin && (
              <a 
                href={data.social_links.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#666',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                LinkedIn
              </a>
            )}
            {data.social_links?.twitter && (
              <a 
                href={data.social_links.twitter}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#666',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                Twitter/X
              </a>
            )}
            {data.social_links?.github && (
              <a 
                href={data.social_links.github}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#666',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
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
