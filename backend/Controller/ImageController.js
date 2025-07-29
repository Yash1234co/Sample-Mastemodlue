const Image = require('../Models/Images');

const imageUpload = async (req, res) => {
  try {
    const { sampleId } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const savedImages = await Promise.all(
      req.files.map(async (file) => {
        const newImage = new Image({
          Sample: sampleId,
          filename: file.filename,
          path: `uploads/${file.filename}`, 
        });

        await newImage.save();
        return newImage;
      })
    );

    res.status(200).json({ message: "Images uploaded successfully", images: savedImages });
  } catch (err) {
    console.error("Error during image upload:", err);
    res.status(500).json({ message: "Image upload failed", error: err.message });
  }
};




const getImagesBySample = async (req, res) => {
  try {
    const { sampleId } = req.params;

    const images = await Image.find({ Sample: sampleId }).sort({createdAt:-1}).populate('Sample','SampleRef DueDate')
    if (!images || images.length === 0) {
      return res.status(404).json({ message: "No images found for this sample." });
    }

    res.status(200).json({ message: "Images fetched successfully", images });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const path = require('path');
const fs = require('fs');

const updateimages = async (req, res) => {
  try {
    const { imageId } = req.params;

    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const newFile = req.file;
    if (!newFile) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // Delete old image file
    const oldPath = path.join(__dirname, "..", image.path);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    // Update DB record
    image.filename = newFile.filename;
    image.path = `uploads/${newFile.filename}`;
    image.uploadAt = new Date();
    await image.save();

    res.status(200).json({ 
      message: "Image updated successfully", 
      imageUrl: `http://localhost:5000/uploads/${newFile.filename}`, 
      image 
    });

  } catch (err) {
    console.error("Update image error:", err);
    res.status(500).json({ message: "Update Failed", error: err.message });
  }
};

exports.updateimages = updateimages;

exports.getImagesBySample=getImagesBySample
exports.imageUpload = imageUpload;
