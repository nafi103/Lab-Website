import React from 'react';
import Banner from '../../components/Banner/Banner';
import HomeNewsSection from '../../components/HomeNewsSection';
import HomePeopleSection from '../../components/HomePeopleSection';
import './Home.css';

const Home = () => {
  return (
    <div className="page-content">
      <Banner />
      <HomeNewsSection />
      <HomePeopleSection />
    </div>
  );
};

export default Home;
