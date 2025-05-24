import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  imageUrl: string;
  isUpcoming: boolean;
  registrationLink?: string;
  registrationDeadline?: string;
}

const FeaturedEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/data/events.json');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventsData: Event[] = await response.json();
        
        // Filter for upcoming events and limit to 3 for featured section
        const upcomingEvents = eventsData
          .filter(event => event.isUpcoming)
          .slice(0, 3);
        
        setEvents(upcomingEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Upcoming Events" 
            subtitle="Join us for these exciting events and be part of our racing community"
          />
          <div className="text-center">Loading events...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Upcoming Events" 
            subtitle="Join us for these exciting events and be part of our racing community"
          />
          <div className="text-center text-red-600">Error loading events: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <SectionTitle 
          title="Upcoming Events" 
          subtitle="Join us for these exciting events and be part of our racing community"
        />
        
        {events.length === 0 ? (
          <div className="text-center">
            <p>No upcoming events at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <Card
                key={event.id}
                title={event.title}
                description={`${new Date(event.date).toLocaleDateString()} - ${event.description}`}
                image={event.imageUrl}
                link={`/events/${event.id}`}
                linkText="Event Details"
              />
            ))}
          </div>
        )}
        
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