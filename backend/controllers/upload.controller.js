import multer from 'multer';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';
dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer configuration using memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Image upload handler
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    // Optional: Check if file is an image
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ success: false, message: "Invalid file type" });
    }

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder: "uploads", resource_type: "image" }, // Folder name
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Call streamUpload function with file buffer
    const result = await streamUpload(req.file.buffer);
    console.log("Uploaded Image:", result);
    res.json({ success: true, imageUrl: result.secure_url });
  } catch (error) {
    console.error("Server error in uploading image:", error);
    res.status(500).json({ success: false, message: "Server error in uploading image" });
  }
};

export { uploadImage, upload };
