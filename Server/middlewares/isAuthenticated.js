// import jwt from "jsonwebtoken";

// // middleware/authMiddleware.js
// const isAuthenticated = (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ success: false, message: "Token missing" });
//     }

//     const decode = jwt.verify(token, process.env.SECRET_KEY);
//     req.id = decode.userId; // ✅ attaches userId to request
//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }

// };

// export default isAuthenticated;

// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({
//         message: "User not authenticated",
//         success: false,
//       });
//     }
//     const decode = await jwt.verify(token, process.env.SECRET_KEY);
//     if (!decode) {
//       return res.status(401).json({
//         message: "Invalid token",
//         success: false,
//       });
//     }
//     req.id = decode.userId;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default isAuthenticated;


import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
      });
    }

    req.userId = decoded.userId; // clear naming
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(500).json({
      message: "Internal Server Error in authentication",
      success: false,
    });
  }
};

export default isAuthenticated;
