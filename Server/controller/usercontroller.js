import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../ulils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../ulils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to register",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    

    // Send token using your generateToken function
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};
// export const logout = async (_, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged out successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to logout",
//     });
//   }
// };



export const logout = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in production
        sameSite: "none", // must match login cookie
        expires: new Date(0), // immediately expire cookie
      })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id; // ✅ Corrected: req._id ❌ → req.id ✅
    // console.log(userId, "userIduserId");

    const user = await User.findById(userId).select("-password").populate("enrolledCourse");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};


// export const updateProfile = async(req,res)=>{
//   try {

//     const userId = req.id;
//     const {name} = req.body;

//     const profilePhoto = req.file;

//     const user = await User.findById(userId);
//     if(!user){
//       return res.status(404).json({
//         message:"User not found",
//         success:false
//       })
//     }
//     if(user.photoUrl){
//       const publicId = user.photoUrl.split("/").pop().split(".")[0]
//        deleteMediaFromCloudinary(publicId)
//     }

//     const cloudResponse = await uploadMedia(profilePhoto.path)
//     const photoUrl= cloudResponse.secure_url
//     const updatedData = {name,photoUrl};
//     const updatedUser = await User.findByIdAndUpdate(userId,updatedData,{new:true}.select("-password"))
//     return res.status(200),json({
//       success:true,
//       user:updatedUser,
//       message:"Profile updated successfully"
//     })
//   } catch (error) {
//    console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to load user",
//     }); 
//   }
// }




export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    if (!profilePhoto) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    console.log("📂 Multer file received:", profilePhoto.path);

    // ✅ Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // ✅ Delete old photo if exists
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0];
      await deleteMediaFromCloudinary(publicId);
    }

    // ✅ Upload new photo to Cloudinary
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;

    // ✅ Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, photoUrl },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });

  } catch (error) {
    console.log("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};


// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.id; // ✅ From middleware
//     const { name } = req.body;
//     const profilePhoto = req.file;

//     // ✅ Find user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found", success: false });
//     }

//     // ✅ Delete old photo if exists
//     if (user.photoUrl) {
//       const publicId = user.photoUrl.split("/").pop().split(".")[0];
//       await deleteMediaFromCloudinary(publicId);
//     }

//     // ✅ Upload new photo
//     let photoUrl = user.photoUrl;
//     if (profilePhoto) {
//       const cloudResponse = await uploadMedia(profilePhoto.path);
//       photoUrl = cloudResponse.secure_url;  // ✅ FIXED: Use secure_url
//     }

//     // ✅ Update user
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { name, photoUrl },
//       { new: true }
//     ).select("-password");

//     return res.status(200).json({
//       success: true,
//       user: updatedUser,
//       message: "Profile updated successfully",
//     });

//   } catch (error) {
//     console.log("Update Profile Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update profile",
//     });
//   }
// };
