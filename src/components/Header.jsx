import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Function to toggle the side menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Function to close the menu when clicking outside
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
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <header className="bg-blue-600 text-white px-4 py-3">
      <div className="flex justify-between items-center">
        {/* Company Icon */}
        <div className="flex items-center space-x-2">
          <div className="bg-white text-blue-600 p-2 rounded-full">
            <i className="fas fa-building"></i>
          </div>
          <h1 className="text-xl font-bold hidden lg:block">Complaint Portal</h1>
        </div>

        {/* Search Bar (only visible on mobile) */}
        <div className="lg:hidden flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 bg-white text-black rounded"
          />
        </div>

        {/* User Profile Icon and Menu */}
        <div>
          <button onClick={toggleMenu} className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="rounded-full w-8 h-8"
            />
            <span className="text-white hidden lg:inline">Username</span>
          </button>
        </div>
      </div>

      {/* Side Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 bg-white shadow-md h-full w-64 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="p-4">
          {/* User Info */}
          <div className="flex items-center space-x-2 mb-6">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="rounded-full w-10 h-10"
            />
            <span className="text-gray-800 font-semibold">Username</span>
          </div>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Home
              </Link>
            </li>
            <li>
              <a
                href="/complain"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Complaints
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay (closes side menu when clicked) */}
      {menuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}
    </header>
  );
}

export default Header;
