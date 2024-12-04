// src/services/authService.js
import { account } from './appwriteConfig';

// Function to handle login
export const login = async (email, password) => {
  try {
    await account.createSession(email, password);
    console.log('Login successful!');
  } catch (error) {
    console.error('Login failed: ', error.message);
  }
};

// Function to handle logout
export const logout = async () => {
  try {
    await account.deleteSession('current');
    console.log('Logout successful!');
  } catch (error) {
    console.error('Logout failed: ', error.message);
  }
};

// Function to register new user
export const register = async (email, password) => {
  try {
    await account.create('unique()', email, password);
    console.log('Registration successful!');
  } catch (error) {
    console.error('Registration failed: ', error.message);
  }
};
