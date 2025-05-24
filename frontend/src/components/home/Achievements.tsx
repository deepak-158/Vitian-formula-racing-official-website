import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';
import dataService, { Achievement } from '../../services/dataService';


const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  useEffect(() => {
    // Get the top 3 recent achievements
    const fetchAchievements = async () => {
      try {
        const recentAchievements = await dataService.getRecentAchievements(3);
        setAchievements(recentAchievements);
      } catch (error) {
        console.error('Error loading recent achievements:', error);
      }
    };
    
    fetchAchievements();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <SectionTitle 
          title="Our Achievements" 
          subtitle="Celebrating our team's dedication and success in competitive racing"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map(achievement => (
            <Card
              key={achievement.id}
              title={achievement.title}
              description={`${new Date(achievement.date).getFullYear()} - ${achievement.description}`}
              image={achievement.imageUrl}
              // link={achievement.link}
              // linkText="View Details"
              className="achievement-card"
            />
          ))}        </div>
        
        <div className="text-center mt-12">
          <Link to="/about#achievements" className="btn btn-secondary">
            See All Achievements
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Achievements; 