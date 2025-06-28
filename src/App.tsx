import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LaunchPage from './pages/LaunchPage';
import LabPage from './pages/LabPage';
import InstancesPage from './pages/InstancesPage';
import { VMProvider } from './context/VMContext';

function App() {
  return (
    <VMProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-900 text-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/launch" element={<LaunchPage />} />
              <Route path="/lab/:instanceId" element={<LabPage />} />
              <Route path="/instances" element={<InstancesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </VMProvider>
  );
}

export default App;