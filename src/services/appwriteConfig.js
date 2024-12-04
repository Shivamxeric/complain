// src/appwrite.js
import { Client, Databases, Storage, Account } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Appwrite API endpoint from .env
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Appwrite Project ID from .env

// Initialize the databases, storage, and account services
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Export the client, account, databases, and storage to be used in other parts of your project
export { client, account, databases, storage };
