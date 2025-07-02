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
          path: `uploads/${file.filename}`, // ✅ full relative path stored
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

exports.imageUpload = imageUpload;
