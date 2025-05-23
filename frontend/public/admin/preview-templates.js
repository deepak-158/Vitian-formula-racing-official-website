/**
 * This file configures custom preview templates for Netlify CMS
 * It's loaded directly by the CMS through script tag
 */

// Add custom preview templates
if (window.CMS) {
  /**
   * Custom preview styles
   */
  const styles = `
    .preview-container {
      max-width: 800px;
      margin: 0 auto;
      font-family: sans-serif;
      padding: 20px;
    }
    .preview-container img {
      max-width: 100%;
      height: auto;
    }
    .preview-header {
      margin-bottom: 20px;
    }
    .preview-header h2 {
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .preview-member {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }
    .preview-member-image {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
    }
    .preview-member-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .preview-member-info {
      flex: 1;
    }
    .preview-member-name {
      font-size: 24px;
      margin: 0;
    }
    .preview-member-role {
      color: #666;
      font-weight: bold;
      margin: 5px 0 10px;
    }
    .preview-social-links {
      display: flex;
      gap: 10px;
    }
    .preview-social-link {
      padding: 5px 10px;
      background: #f0f0f0;
      border-radius: 4px;
      text-decoration: none;
      color: #333;
    }
    .preview-bio {
      background: #f7f7f7;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
    }
    .preview-event {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .preview-event-image {
      position: relative;
      height: 200px;
    }
    .preview-event-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .preview-event-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #e41f1a;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-weight: bold;
    }
    .preview-event-content {
      padding: 20px;
    }
    .preview-event-title {
      margin-top: 0;
    }
    .preview-event-meta {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
      color: #666;
    }
    .preview-event-description {
      line-height: 1.6;
    }
    .preview-event-button {
      display: inline-block;
      margin-top: 15px;
      padding: 8px 20px;
      background: #e41f1a;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  `;

  // Add styles to head
  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // Team Member Preview
  const TeamMemberPreview = createClass({
    render: function() {
      const entry = this.props.entry;
      const member = entry.getIn(['data']).toJS();
      
      return h('div', { className: 'preview-container' },
        h('div', { className: 'preview-header' },
          h('h2', {}, 'Team Member Preview')
        ),
        h('div', { className: 'preview-member' },
          h('div', { className: 'preview-member-image' },
            h('img', { src: member.image_url || 'https://via.placeholder.com/150', alt: member.name })
          ),
          h('div', { className: 'preview-member-info' },
            h('h3', { className: 'preview-member-name' }, member.name || 'Member Name'),
            h('p', { className: 'preview-member-role' }, member.role || 'Role Title'),
            h('div', { className: 'preview-social-links' },
              member.social_links?.linkedin ? h('a', { className: 'preview-social-link', href: member.social_links.linkedin, target: '_blank' }, 'LinkedIn') : null,
              member.social_links?.twitter ? h('a', { className: 'preview-social-link', href: member.social_links.twitter, target: '_blank' }, 'Twitter') : null,
              member.social_links?.github ? h('a', { className: 'preview-social-link', href: member.social_links.github, target: '_blank' }, 'GitHub') : null
            )
          )
        ),
        h('div', { className: 'preview-bio' },
          h('p', {}, member.bio || 'Bio information will appear here.')
        )
      );
    }
  });

  // Event Preview
  const EventPreview = createClass({
    render: function() {
      const entry = this.props.entry;
      const event = entry.getIn(['data']).toJS();
      
      return h('div', { className: 'preview-container' },
        h('div', { className: 'preview-header' },
          h('h2', {}, 'Event Preview')
        ),
        h('div', { className: 'preview-event' },
          h('div', { className: 'preview-event-image' },
            h('img', { src: event.imageUrl || 'https://via.placeholder.com/800x400', alt: event.title }),
            event.isUpcoming ? h('div', { className: 'preview-event-badge' }, 'Upcoming') : null
          ),
          h('div', { className: 'preview-event-content' },
            h('h3', { className: 'preview-event-title' }, event.title || 'Event Title'),
            h('div', { className: 'preview-event-meta' },
              h('div', {}, h('strong', {}, 'Date: '), event.date || 'TBD'),
              h('div', {}, h('strong', {}, 'Location: '), event.location || 'TBD')
            ),
            h('div', { className: 'preview-event-description' },
              h('p', {}, event.description || 'Event description will appear here.')
            ),
            event.registrationLink ? 
              h('a', { 
                className: 'preview-event-button',
                href: event.registrationLink, 
                target: '_blank'
              }, 'Register Now') : null
          )
        )
      );
    }
  });

  // Register preview templates
  CMS.registerPreviewTemplate('team-members', TeamMemberPreview);
  CMS.registerPreviewTemplate('events', EventPreview);
  
  console.log('Custom preview templates registered!');
}
