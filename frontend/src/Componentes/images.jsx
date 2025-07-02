import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import getCroppingImage from "./cropImage";

export default function SampleImageManager() {
  const { sampleId } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageToUpdate, setImageToUpdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rawFile, setRawFile] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/images/${sampleId}`);
        setImages(res.data.images);
      } catch (err) {
        console.error("Failed to load images:", err);
        setMessage("Failed to load images.");
      }
    };

    if (sampleId) fetchImages();
  }, [sampleId]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (!newFile) return;

    if (newFile.size > 5 * 1024 * 1024) {
      setMessage("File size exceeds 5MB limit.");
      return;
    }

    const objectUrl = URL.createObjectURL(newFile);
    setRawFile(newFile);
    setPreview(objectUrl);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setImageToUpdate(null);
    setMessage("Ready to upload image.");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleUpload = async () => {
    if (!preview) {
      setMessage("Please select an image.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      if (imageToUpdate) {
        if (!croppedAreaPixels) {
          setMessage("Crop area not selected.");
          setLoading(false);
          return;
        }
        const croppedFile = await getCroppingImage(preview, croppedAreaPixels);
        formData.append("image", croppedFile);
      } else {
        formData.append("images", rawFile);
      }

      const url = imageToUpdate
        ? `http://localhost:3000/updateimages/${imageToUpdate._id}`
        : `http://localhost:3000/upload/${sampleId}`;

      const method = imageToUpdate ? axios.put : axios.post;
      await method(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(imageToUpdate ? "Image updated successfully." : "Image uploaded successfully.");
      setPreview(null);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
      setImageToUpdate(null);
      setRawFile(null);

      const res = await axios.get(`http://localhost:3000/images/${sampleId}`);
      setImages(res.data.images);
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate("/sample")}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
      >
        ← Back to Samples
      </button>

      <h2 className="text-2xl font-bold mb-4">
        Sample Image Manager –{" "}
        <span className="text-blue-600">{images[0]?.Sample?.SampleRef}</span>
      </h2>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded text-center mb-4 cursor-pointer ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
          }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive ? "Drop the image here..." : "Drag & drop an image (max 5MB), or click to select one."}
        </p>
      </div>

      {preview && (
        <div className="mb-4">
          {imageToUpdate ? (
            <div className="relative w-full h-[300px] bg-gray-100">
              <Cropper
                image={preview}
                crop={crop}
                zoom={zoom}
                minZoom={1}
                maxZoom={5}
                aspect={16 / 9}
                cropSize={{ width: 300, height: 400 }} // Optional: force crop size
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          ) : (
            <img src={preview} alt="Preview" className="w-full h-[300px] object-contain rounded mb-2" />
          )}

          <div className="flex items-center gap-4 mt-2">
            {imageToUpdate && (
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-48"
              />
            )}
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : imageToUpdate
                  ? "Update Cropped Image"
                  : "Upload Image"}
            </button>
          </div>
        </div>
      )}

      {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Uploaded Images</h3>
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img._id} className="border rounded shadow p-2">
                <img
                  src={`http://localhost:3000/${img.path}`}
                  alt={img.filename}
                  className="w-full h-40 object-cover rounded"
                />
                <p className="text-xs text-gray-700 mt-1 truncate">{img.filename}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setImageToUpdate(img);
                      setPreview(`http://localhost:3000/${img.path}`);
                      setCrop({ x: 0, y: 0 });
                      setZoom(1);
                      setRawFile(null);
                      setMessage("Now cropping for update...");
                    }}
                    className="bg-yellow-500 text-white text-xs px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
