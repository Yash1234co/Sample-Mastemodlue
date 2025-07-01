const Images = require('../Models/Images');
const path = require('path');
const fs = require('fs');

const updateimages = async (req, res) => {
  try {
    const { imageId } = req.params;

    const image = await Images.findById(imageId);
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
