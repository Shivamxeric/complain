import React, { useState } from "react";
import fight from './fight.png'
import { Client, Databases, Storage } from "appwrite";

function ComplaintForm() {
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // SSSHOvam Jha  Shivam JhaState for showing the separate image preview

  // Initialize Appwrite Client
  const client = new Client();
  const databases = new Databases(client);
  const storage = new Storage(client);

  client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a valid file.");
      return;
    }
    setMedia(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting complaint...");

      let mediaUrl = null;
      if (media) {
        console.log("Uploading media...");
        const response = await storage.createFile(
          import.meta.env.VITE_APPWRITE_BUCKET_ID,
          "unique()",
          media
        );
        console.log("Media uploaded:", response);
        mediaUrl = `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${
          import.meta.env.VITE_APPWRITE_BUCKET_ID
        }/files/${response.$id}/view?project=${
          import.meta.env.VITE_APPWRITE_PROJECT_ID
        }`;
      }

      console.log("Saving complaint to database... ");     
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        "unique()",
        {
          heading,
          paragraph,
          media: mediaUrl,
        }
      );

      console.log("Complaint submitted successfully.");
      alert("Complaint submitted successfully! 👍");
      setHeading("");
      setParagraph("");
      setMedia(null);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Something went wrong.  Please try again. 🥺");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 relative">
      <h2 className="font-extrabold text-3xl mb-4 text-center " >Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl p-6 rounded-3xl">
        <div className="mb-4">
          <label className="block font-bold mb-2">Complain Heading</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full border rounded px-4 py-2"
            placeholder="Enter heading"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Complain about</label>
          <textarea
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            className="w-full border rounded px-4 py-2"
            placeholder="Enter a complaint about all things"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Upload Image/Video</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaUpload}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        {media && (
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Preview:</p>
            {media.type.startsWith("video") ? (
              <video controls className="w-full h-48">
                <source src={URL.createObjectURL(media)} type={media.type} />
              </video>
            ) : (
              <img
                src={URL.createObjectURL(media)}
                alt="Uploaded"
                className="w-full h-48 object-cover"
              />
            )}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>

      {/* New Feature: Button for Previewing a Separate Image */}
      <button
      
        className="fixed bottom-4 mb-11 right-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
        onClick={() => setShowPreview(true)}
      >
        How to submit Complaint    
      </button>

      {/* New Feature: Image Preview Modal */}             
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative w-3/4 h-3/4 bg-white rounded-lg overflow-hidden">
            <button
              className="absolute top-2 mt-11 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              onClick={() => setShowPreview(false)}
            >
              ✖
            </button>
            <img
              src={fight}// Replace with your image URL
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintForm;
