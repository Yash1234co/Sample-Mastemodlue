const Image = require('../Models/Images');
const Product = require('../Models/Product'); 

const imageUploaderForProducts = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        
        // Construct the correct relative path for the URL
        const relativePath = `uploads/${req.file.filename}`;

        const newImage = new Image({
            Products: productId, 
            filename: req.file.filename,
            path: relativePath 
        });
        await newImage.save();

        await Product.findByIdAndUpdate(
            productId,
          
            { $set: { imageUrl: relativePath } }, 
            { new: true }
        );

        res.status(200).json({ 
            message: "Image uploaded and product updated successfully", 
            image: newImage 
        });

    } catch (err) {
        console.error("Error during image upload", err);
        res.status(500).json({ message: "Image upload failed", error: err.message });
    }
}



const getImageForProducts = async (req, res) => {
    try {
        const { productId } = req.params;

        const images = await Image.find({ Products: productId }).sort({ createdAt: -1 });

        res.status(200).json({ message: "Images fetched successfully", images });

    } catch (err) {
        console.error("Error fetching images:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

exports.getImageForProducts = getImageForProducts;

exports.imageUploaderForProducts = imageUploaderForProducts;