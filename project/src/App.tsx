import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import DashboardPage from './pages/DashboardPage';
import DeveloperPage from './pages/DeveloperPage';
import CommunityPage from './pages/CommunityPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/developers" element={<DeveloperPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;