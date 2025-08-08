// // import { v2 as cloudinary } from "cloudinary";
// // import dotenv from "dotenv";
// // dotenv.config();

// // cloudinary.config({
// //   cloud_name: process.env.CLOUD_NAME,
// //   api_secret: process.env.API_SECRET,
// //   api_key: process.env.API_KEY,
// // });

// // export const uploadMedia = async (file) => {
// //   try {
// //     const uploadResponse = await cloudinary.uploader.upload(file, {
// //       resource_type: "auto",
// //     });
// //     return uploadResponse;
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // export const deleteMediaFromCloudinary = async (publicId) => {
// //   try {
// //     await cloudinary.uploader.destroy(publicId);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };


// // export const deleteVideoFromCloudinary = async (publicId) => {
// //   try {
// //     await cloudinary.uploader.destroy(publicId,{resource_type:"video"});
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };



// // ✅ Upload file to Cloudinary
// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET, // ✅ Required for signed uploads
// });

// // ✅ Upload file to Cloudinary (Signed)
// export const uploadMedia = async (file) => {
//   try {
//     const uploadResponse = await cloudinary.uploader.upload(file, {
//       folder: "mern_uploads",   // ✅ Optional: Store all images in this folder
//       resource_type: "auto",    // ✅ Handles images/videos automatically
//     });
//     return uploadResponse;
//   } catch (error) {
//     console.log("Cloudinary Upload Error:", error);
//     throw new Error("Failed to upload image");
//   }
// };



// // ✅ Delete file from Cloudinary by publicId
// export const deleteMediaFromCloudinary = async (publicId) => {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     console.log("Cloudinary Delete Error:", error);
//   }
// };



import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// ✅ Load Cloudinary config from .env
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // ✅ THIS must exist
});

// ✅ Upload file to Cloudinary (SIGNED)
export const uploadMedia = async (file) => {
  try {
    console.log("📤 Uploading file to Cloudinary:", file); // debug

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "mern_uploads", // ✅ optional folder in Cloudinary
      resource_type: "auto",  // ✅ handles image or video
    });

    console.log("✅ Cloudinary Upload Success:", uploadResponse.api_secret);
    return uploadResponse;
  } catch (error) {
    console.log("❌ Cloudinary Upload Error:", error);
    throw new Error("Failed to upload image");
  }
};

// ✅ Delete from Cloudinary
export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("❌ Cloudinary Delete Error:", error);
  }
};













// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// dotenv.config();

// // ✅ Load Cloudinary config from .env
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ✅ Upload file to Cloudinary (works for image OR video)
// export const uploadMedia = async (file) => {
//   try {
//     console.log("📤 Uploading file to Cloudinary:", file);

//     const uploadResponse = await cloudinary.uploader.upload(file, {
//       folder: "mern_uploads", // ✅ optional folder in Cloudinary
//       resource_type: "auto",  // ✅ auto-detect image/video
//     });

//     console.log("✅ Cloudinary Upload Success:", uploadResponse.secure_url);

//     // ✅ Return only safe info (DO NOT return api_secret)
//     return {
//       url: uploadResponse.secure_url,
//       publicId: uploadResponse.public_id,
//       resourceType: uploadResponse.resource_type,
//     };
//   } catch (error) {
//     console.log("❌ Cloudinary Upload Error:", error);
//     throw new Error("Failed to upload media");
//   }
// };

// // ✅ Delete from Cloudinary (works for image OR video)
// export const deleteMediaFromCloudinary = async (publicId) => {
//   try {
//     await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
//     console.log(`🗑 Deleted from Cloudinary: ${publicId}`);
//   } catch (error) {
//     console.log("❌ Cloudinary Delete Error:", error);
//   }
// };
