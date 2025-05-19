import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';   // new import
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import AddJob from './AddJob';
import EditJob from './EditJob';
import './styles.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />    {/* Landing page at root */}
        <Route path="/login" element={<Login />} />      {/* separate login route */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
      </Routes>
    </Router>
  );
}

export default App;
