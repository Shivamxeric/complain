import React from "react";

function Modal({ complaint, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">{complaint.heading}</h2>
        <p className="text-gray-700 mb-4">{complaint.description}</p>
        {complaint.media && (
          <div className="mb-4">
            <img
              src={complaint.media}
              alt="Complaint Media"
              className="w-full h-auto rounded"
            />
          </div>
        )}
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
