import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';
dotenv.config();
// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// multer configuration using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" })
    }
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "uploads", resource_type: "image" }, // Add folder name
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
    
    // call streamupload function and pass the file buffer
    const result = await streamUpload(req.file.buffer);
    res.json({ success: true, imageUrl:result.secure_url });
  }
  catch (error) {
    console.error("Server error in uploading image", error);
    res.status(500).json({ success: false, message: "Server error in uploading image" });
  }
}

export { uploadImage, upload };