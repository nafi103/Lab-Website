import React from 'react';
import Banner from '../../components/Banner/Banner';
import HomeNewsSection from '../../components/HomeNewsSection';
import HomePublicationSection from '../../components/HomePublicationSection';
import HomePeopleSection from '../../components/HomePeopleSection';
import './Home.css';

// This is the landing page - first impression is everything!
// I organized it to show our best content upfront
const Home = () => {
  return (
    <div className="page-content">
      {/* Eye-catching banner to welcome visitors */}
      <Banner />
      
      {/* Latest news - keeps the homepage dynamic and fresh */}
      <HomeNewsSection />
      
      {/* Featured publications - showcasing our research achievements */}
      <HomePublicationSection />
      
      {/* Meet the team - putting faces to the research */}
      <HomePeopleSection />
    </div>
  );
};

export default Home;
