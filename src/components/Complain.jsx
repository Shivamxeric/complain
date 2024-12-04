import React, { useEffect, useState } from "react";
import { Client, Account, Databases } from "appwrite";

// Appwrite Client setup
const client = new Client();
const account = new Account(client);
const databases = new Databases(client);

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Vite's import.meta.env for Appwrite endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Appwrite Project ID

function complain() {
  const [complaints, setComplaints] = useState([]); // Stores complaints fetched from Appwrite
  const [expandedComplaintId, setExpandedComplaintId] = useState(null); // Tracks expanded complaint
  const [deleteComplaintId, setDeleteComplaintId] = useState(null); // Tracks delete menu visibility

  // Fetch complaints from Appwrite
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID
        );
        setComplaints(response.documents);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // Delete a complaint
  const deleteComplaint = async (id) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        id
      );
      setComplaints((prev) => prev.filter((complaint) => complaint.$id !== id)); // Update state
      setDeleteComplaintId(null);
      alert("Complaint deleted successfully!");
    } catch (error) {
      console.error("Error deleting complaint:", error);
      alert("Failed to delete complaint. Please try again.");
    }
  };

  // Toggle expand/collapse for complaint details
  const toggleExpandComplaint = (id) => {
    setExpandedComplaintId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Complaints</h2>

      {/* Complaints List */}
      {complaints.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {complaints.map((complaint) => (
            <div
              key={complaint.$id} // Correct unique key usage
              className="relative bg-white shadow-md rounded overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Media Section */}
              {complaint.media && (
                <div
                  className={`w-full ${
                    expandedComplaintId === complaint.$id ? "h-auto" : "h-48"
                  }`}
                  onClick={() => toggleExpandComplaint(complaint.$id)}
                >
                  {complaint.media.startsWith("data:video") ? (
                    <video
                      className={`w-full ${
                        expandedComplaintId === complaint.$id
                          ? "h-auto"
                          : "h-full object-cover"
                      }`}
                      controls={expandedComplaintId === complaint.$id}
                    >
                      <source src={complaint.media} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={complaint.media}
                      alt="Complaint Media"
                      className={`w-full ${
                        expandedComplaintId === complaint.$id
                          ? "h-auto"
                          : "h-full object-cover"
                      }`}
                    />
                  )}
                </div>
              )}

              {/* Complaint Text */}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{complaint.heading || "Untitled"}</h3>
                <p className="text-gray-600">
  {expandedComplaintId === complaint.$id
    ? complaint.paragraph // Display full description
    : complaint.paragraph
    ? `${complaint.paragraph.substring(0, 50)}...`
    : "No description available."}
</p>
              </div>

              {/* Three-dot menu */}
              <div
                className="absolute top-2 right-2"
                onClick={(e) => e.stopPropagation()} // Prevent card click from triggering menu
              >
                <button
                  className="text-black font-extrabold hover:text-gray-800"
                  onClick={() => setDeleteComplaintId(complaint.$id)}
                >
                  ⋮
                </button>

                {/* Delete Button */}
                {deleteComplaintId === complaint.$id && (
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg"
                    onClick={(e) => e.stopPropagation()} // Prevent event propagation
                  >
                    <button
                      onClick={() => deleteComplaint(complaint.$id)}
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No complaints to display!</p>
      )}
    </div>
  );
}

export default complain;
