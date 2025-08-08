// // // import multer from "multer";

// // // const upload = multer({ dest: "upload/" });
// // // export default upload;


// // import multer from "multer";
// // import path from "path";

// // // ✅ Set storage engine
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/"); // ✅ use 'uploads' folder (not 'upload/')
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname)); // e.g. 1690548762345.jpg
// //   },
// // });

// // // ✅ File filter (optional: only allow images)
// // const fileFilter = (req, file, cb) => {
// //   const allowedTypes = /jpeg|jpg|png|gif/;
// //   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
// //   const mimetype = allowedTypes.test(file.mimetype);

// //   if (extname && mimetype) {
// //     cb(null, true);
// //   } else {
// //     cb(new Error("Only images are allowed"));
// //   }
// // };

// // // ✅ Export multer instance
// // const upload = multer({
// //   storage,
// //   fileFilter,
// //   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// // });

// // export default upload;

// // import multer from "multer";
// // import path from "path";

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/"); // ✅ Local temp folder
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname)); // unique name
// //   },
// // });

// // const fileFilter = (req, file, cb) => {
// //   const allowedTypes = /jpeg|jpg|png|gif/;
// //   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
// //   const mimetype = allowedTypes.test(file.mimetype);

// //   if (extname && mimetype) {
// //     cb(null, true);
// //   } else {
// //     cb(new Error("Only images are allowed"));
// //   }
// // };

// // const upload = multer({
// //   storage,
// //   fileFilter,
// //   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
// // });

// // export default upload;




// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Temp folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed"));
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });

// export default upload;


// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed"));
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// export default upload;



import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ✅ Store temp files here
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ✅ Unique file name
  },
});

// ✅ Allow both images & videos
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|gif/;
  const allowedVideoTypes = /mp4|mov|avi|mkv|webm/;

  const extname = path.extname(file.originalname).toLowerCase().substring(1); // remove dot
  const isImage = allowedImageTypes.test(extname);
  const isVideo = allowedVideoTypes.test(extname);

  if (isImage || isVideo) {
    cb(null, true);
  } else {
    cb(new Error("Only image or video files are allowed"));
  }
};

// ✅ 100 MB file limit (for videos)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 },
});

export default upload;
