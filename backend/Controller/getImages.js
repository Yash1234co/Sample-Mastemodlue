
const Image = require('../Models/Images');

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

exports.getImagesBySample=getImagesBySample
