import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ComplaintForm from './components/ComplaintForm';
import Complain from './components/Complain';
import Login from './components/Login';

function App() {
  const [complaints, setComplaints] = useState([]);
  const [authenticated, setAuthenticated] = useState(false); // Track login state

  const addComplaint = (complaint) => {
    setComplaints([...complaints, complaint]);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header Component */}
        <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
        
        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-4">
          <Routes>
            {/* Default Route (ComplaintForm) */}
            <Route path="/" element={<ComplaintForm addComplaint={addComplaint} />} />
            
            {/* Complain Page (Login required) */}
            <Route 
              path="/complain" 
              element={
                authenticated ? (
                  <Complain complaints={complaints} />
                ) : (
                  <Login setAuthenticated={setAuthenticated} />
                )
              } 
            />

            {/* Signup Page */}

            {/* Login Page */}
            <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          </Routes>
        </main>

        {/* Footer Component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
