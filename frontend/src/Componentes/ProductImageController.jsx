import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import getCroppedImage from "./cropImage";

export default function ProductImageUploader({ productId, onImageUpdate }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixelCrop, setPixelCrop] = useState(null);
  const [rawFile, setRawFile] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!productId) return;
      try {
        const res = await axios.get(`http://localhost:3000/getImagesForProduct/${productId}`);
        setImages(res.data.images || []);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images.");
      }
    };
    fetchImages();
  }, [productId]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB.");
      return;
    }

    setRawFile(file);
    setImageToCrop(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setPixelCrop(croppedAreaPixels);
  }, []);

  const resetUploaderState = useCallback(() => {
    if (imageToCrop) {
      URL.revokeObjectURL(imageToCrop);
    }
    setImageToCrop(null);
    setPixelCrop(null);
    setRawFile(null);
  }, [imageToCrop]);

  const handleUpload = async () => {
    if (!imageToCrop || !pixelCrop || !rawFile) {
      toast.warn("Please crop the image before uploading.");
      return;
    }
    setLoading(true);

    try {
      const croppedImageBlob = await getCroppedImage(imageToCrop, pixelCrop, rawFile.name);
      
      const formData = new FormData();
      formData.append("image", croppedImageBlob);

      const res = await axios.post(`http://localhost:3000/uploadImagesForProduct/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newImage = res.data.image;
      toast.success("Image uploaded successfully!");
      setImages((prevImages) => [...(prevImages || []), newImage]);
      
      if (onImageUpdate && newImage) {
        onImageUpdate(productId, newImage.path);
      }

      resetUploaderState();

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload image.");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageIdToDelete) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/images/${imageIdToDelete}`);
      setImages((currentImages) =>
        currentImages.filter((img) => img._id !== imageIdToDelete)
      );
      toast.success("Image deleted successfully");
    } catch (err) {
      toast.error("Failed to delete image.");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {/* FIX: Added robust checks to prevent crashing */}
        {Array.isArray(images) && images.map((img, index) => {
   
          if (!img || !img.path) {
            return null;
          }
          
          const imageUrl = `http://localhost:3000/${String(img.path).replace(/\\/g, '/')}`;
      
          const key = img._id || `temp-image-${index}`;

          return (
            <div key={key} className="relative group">
              <img src={imageUrl} alt="Product" className="w-16 h-16 object-cover rounded" />
              <button
                onClick={() => img._id && handleDelete(img._id)}
                disabled={!img._id}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                title="Delete Image"
              >
                &times;
              </button>
            </div>
          );
        })}
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>

      <div {...getRootProps()} className={`border-2 border-dashed p-4 rounded text-center cursor-pointer ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400"}`}>
        <input {...getInputProps()} />
        <p className="text-xs text-gray-600">Drop new image here, or click to select.</p>
      </div>

      {imageToCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-[100]">
          <div className="relative w-full max-w-lg h-96 bg-gray-800">
            <Cropper image={imageToCrop} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete}/>
          </div>
          <div className="mt-4 flex gap-4">
            <button onClick={handleUpload} disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
              {loading ? "Uploading..." : "Save Image"}
            </button>
            <button onClick={resetUploaderState} className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
