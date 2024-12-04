import React, { useState } from "react";
import { Client, Databases, Storage } from "appwrite";

function ComplaintForm() {
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [use,setUse] = useState(false);

  // const hide = () => {
  //   setUse((prevUse) => !prevUse);
  // }

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
    
        console.log("Saving complaint to database...");
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
        alert("Complaint submitted successfully!");
        setHeading("");
        setParagraph("");
        setMedia(null);
      } catch (error) {
        console.error("Error submitting complaint:", error);
        alert("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Submit a Complaint</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded">
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
            placeholder="Enter a complain about all things"
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
      {/* <div className=" w-full">
      <button className="ml-96 mt-24 p-2 py-2 bg-gray-400 text-white rounded " onClick={hide}>{!use ? 'how to use': 'close'} </button>
      {use && (
      <div className="h-32 w-32" style={{border:'3px  solid gray'}}>
      <h3>Logic</h3>
      <p>Is More Important to code</p>
      <button onClick={hide}>close</button>
      </div>
      )}
</div> */}
    </div>
  );
}

export default ComplaintForm;
