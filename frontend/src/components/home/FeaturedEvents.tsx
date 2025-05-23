import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';

// Mock data - would come from API in a real implementation
const featuredEvents = [
  {
    id: 1,
    title: 'Annual Racing Championship',
    date: 'June 15, 2023',
    description: 'Join us for our annual championship race where teams compete for the prestigious Racing Cup.',
    image: '/images/event1.jpg',
    link: '/events/1',
  },
  {
    id: 2,
    title: 'Engine Design Workshop',
    date: 'July 10, 2023',
    description: 'Learn from industry experts how to optimize engine performance for competitive racing.',
    image: '/images/event2.jpg',
    link: '/events/2',
  },
  {
    id: 3,
    title: 'Networking with Sponsors',
    date: 'August 5, 2023',
    description: 'Meet our sponsors and learn about career opportunities in the automotive industry.',
    image: '/images/event3.jpg',
    link: '/events/3',
  },
];

const FeaturedEvents: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <SectionTitle 
          title="Upcoming Events" 
          subtitle="Join us for these exciting events and be part of our racing community"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map(event => (
            <Card
              key={event.id}
              title={event.title}
              description={`${event.date} - ${event.description}`}
              image={event.image}
              link={event.link}
              linkText="Event Details"
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/events" className="btn btn-primary">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents; 