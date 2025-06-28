import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Showcase from '../components/Showcase';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Showcase />
    </div>
  );
};

export default HomePage;