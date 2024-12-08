import React, { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import complain from './complaint.jpg';


function Header({ authenticated, setAuthenticated }) {
  const [menuOpen , setMenuOpen] = useState(false);
  const [darkMode , setDarkMode] = useState(false); // State for theme toggle
  const menuRef = useRef();
  const navigate = useNavigate();

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    document.documentElement.classList.toggle("dark");
  };


  // Function to toggle the side menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Function to close the menu when clicking outside   
  //  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("authenticated");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <header
    className={`px-4 py-3 ${
      darkMode
        ? "bg-gradient-to-r to-blue-300 from-blue-800 text-gray-900"
        : "bg-gradient-to-r from-blue-300 to-blue-800 text-white"
    }`}>      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-extrabold lg:block">Complaint Portal</h1>
        </div>

        <div className="flex-grow mx-4 relative">
          <input
            type="text"
            placeholder="Search..."
            className={ `${darkMode ? "w-full p-2 pr-10 bg-black text-black rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform focus:scale-105  dark:text-white"
:             "w-full p-2 pr-10 bg-white text-black font-extrabold rounded-full shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform focus:scale-105  "


            }`
             } />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:scale-110 transition-all duration-300 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a7 7 0 017 7c0 3.866-3.134 7-7 7-3.866 0-7-3.134-7-7 0-3.866 3.134-7 7-7zm0 0v8m0 0v8m7-7h-8"
            />
          </svg>
        </div>

        <div>
          <button onClick={toggleMenu} 
          
          className={
            `${
           darkMode? "bg-black text-white p-2 rounded-full"
           : "bg-white  p-2 rounded-full"
          
          }`}>
            👤
            <span className="hidden lg:inline">Username</span>
          </button>
        </div>
      </div>
<div className="bg-white">
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 bg-white shadow-md h-full w-64 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 dark:bg-gray-900 `}
      >
  

        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <img src={complain} alt="User" className="rounded-full w-10 h-10" />
              <span className="text-gray-800 font-semibold dark:text-gray-200">Company Portal</span>
            </div>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
              title="Toggle Theme"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>

          <ul className="space-y-4">
            <li>
              <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                Home
              </Link>
            </li>
            <li>
              <a
                href="/complain"
                className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 ${
                  !authenticated ? "pointer-events-none opacity-50" : ""
                }`}
              >
                Complaints
              </a>
            </li>
          </ul>
        </div>
        {/* Logout Button at the Bottom */}
        <div className="absolute bottom-4 w-full px-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition dark:bg-red-700 dark:hover:bg-red-800"
          >
            Logout
          </button>
        </div>
      </div>
</div>      {menuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}
    </header>
  );
}

export default Header;
