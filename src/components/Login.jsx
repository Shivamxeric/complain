import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthenticated }) => {
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (passkey === "0001") {
      setAuthenticated(true); // Set user as authenticated
      sessionStorage.setItem("authenticated", "true");
      navigate("/complain"); // Redirect to complaints page
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Login with Passkey</h2>
        <input
          type="text"
          placeholder="Enter passkey"
          className="w-full p-2 mb-4 border rounded"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
