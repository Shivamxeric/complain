import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ComplaintForm from './components/ComplaintForm';
import Complain from './components/Complain';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
                                                             
  const [complaints, setComplaints] = useState([]);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addComplaint = (complaint) => {
    setComplaints([...complaints, complaint]);    
  };

  // const handleLogin = (passkey) => {
  //   if (passkey === '0001') {
  //     setIsLoggedIn(true);
  //   } else {
  //     alert('Invalid passkey. Access denied.');
  //   }
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header  />
        <main className="flex-grow bg-gray-100 p-4">
          <Routes>
            <Route
              path="/"
              element={<ComplaintForm addComplaint={addComplaint} />}
            />

            <Route path='/complain' element={<Complain   complaints={complaints}/>}/>
            {/* <Route
              path="/complain"
              element={
                isLoggedIn ? (
                  <Complain  complaints={complaints} />
                ) : (
                  <Login  onLogin={handleLogin} />
                )
              }
            /> */}
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);












// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Header from './components/Header';
// import Footer from './components/Footer';
// import ComplaintForm from './components/ComplaintForm';
// import Complain from './components/Complain';
// import Login from './components/Login';
// import Signup from './components/Signup';

// function App() {
                                                             
//   const [complaints, setComplaints] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const addComplaint = (complaint) => {
//     setComplaints([...complaints, complaint]);    
//   };

//   const handleLogin = (passkey) => {
//     if (passkey === '0001') {
//       setIsLoggedIn(true);
//     } else {
//       alert('Invalid passkey. Access denied.');
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col">
//         <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//         <main className="flex-grow bg-gray-100 p-4">
//           <Routes>
//             <Route
//               path="/"
//               element={<ComplaintForm addComplaint={addComplaint} />}
//             />
//             <Route
//               path="/complain"
//               element={
//                 isLoggedIn ? (
//                   <Complain  complaints={complaints} />
//                 ) : (
//                   <Login  onLogin={handleLogin} />
//                 )
//               }
//             />
//             <Route path='/signup' element={<Signup/>}/>
//             <Route path='/login' element={<Login/>}/>
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
