import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  // Function to handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to Home page
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  // Function to handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/"); // Redirect to Home page
      alert("Google login successful!");
    } catch (err) {
      setError("Google login failed");
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md animate-slide-in-up">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:scale-105 transform transition-all duration-300 hover:shadow-xl"
          >
            Login
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transform transition-all duration-300 hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 48 48"
              fill="currentColor"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.13 0 5.9 1.1 8.1 2.9l6-6C33.9 3 29.3 1 24 1 14.7 1 6.9 6.9 3.9 15.2l7.5 5.8C13.1 14.2 18 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M24 47c6.4 0 11.7-2.1 15.6-5.7l-7.2-5.6C29.4 37.7 26.9 39 24 39c-5.4 0-10-3.7-11.6-8.8l-7.5 5.8C9 42.6 15.6 47 24 47z"
              />
              <path
                fill="#4A90E2"
                d="M47 24c0-1.7-.2-3.3-.5-4.9H24v9.4h12.9c-.6 3.2-2.3 5.8-4.8 7.7l7.2 5.6C43.2 38.1 47 31.6 47 24z"
              />
              <path
                fill="#FBBC05"
                d="M12.4 30.2c-.9-2.5-1.4-5.1-1.4-7.7s.5-5.3 1.4-7.7L4.9 9C2.9 13.1 1.9 18 1.9 24s1 10.9 3 15l7.5-5.8z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-600 hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
