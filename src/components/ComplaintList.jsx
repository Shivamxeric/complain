import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);

  // Initialize Appwrite Client
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

  useEffect(() => {
    // Fetch complaints from Appwrite
    const fetchComplaints = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          {
            queries: [
              // Optional: Sorting by createdAt descending
              "orderDesc(createdAt)",
            ],
          }
        );

        setComplaints(response.documents);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Complaints</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint.$id} className="p-4 border-b">
            <p className="font-bold">{complaint.heading || "No Heading"}</p>
            <p>{complaint.paragraph || "No Paragraph"}</p>
            {complaint.media && (
              <a
                href={complaint.media}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Attachment
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintList;