import React, { useState } from "react";

const UploadImage = ({ uploadImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file && ["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      uploadImage(file);
    } else {
      alert("Please select a valid image file (PNG, JPG, JPEG)");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Image Preview */}
      {previewURL && (
        <img
          src={previewURL}
          alt="Preview"
          className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-md"
        />
      )}

      {/* Upload Button */}
      <label
        htmlFor="fileInput"
        className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-yellow-800 text-white rounded-md shadow-md hover:bg-yellow-900 transition duration-300"
        aria-label="Upload an image"
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L12 16M12 16L8 12M12 16L16 12M3 20H21"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{selectedFile ? selectedFile.name : "Upload Image"}</span>
      </label>

      {/* Hidden File Input */}
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept=".png, .jpeg, .jpg"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default UploadImage;
