import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
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

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
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

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
