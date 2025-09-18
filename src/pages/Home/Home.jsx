import React from 'react';
import Banner from '../../components/Banner/Banner';
import HomeNewsSection from '../../components/HomeNewsSection';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Banner />
      <HomeNewsSection />
    </div>
  );
};

export default Home;
