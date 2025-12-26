import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Philosophy from './components/sections/Philosophy';
import Services from './components/sections/Services';
import Performance from './components/sections/Performance';
import Insights from './components/sections/Insights';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Philosophy />
        <Services />
        <Performance />
        <Testimonials />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
