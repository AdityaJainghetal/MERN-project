// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import {
//   getCourseProgress,
//   markAsCompleted,
//   updateLectureProgress,
//   markAsInCompleted,
// } from "../controller/coursePorgressController.js";
// const router = express.Router();

// router.route("/:courseId").get(isAuthenticated, getCourseProgress);
// router
//   .route("/:courseId/lecture/:lectureId/view")
//   .post(isAuthenticated, getCourseProgress, updateLectureProgress);
// router.route("/:courseId/complete").post(isAuthenticated, markAsCompleted);
// router.route("/:courseId/incomplete").post(isAuthenticated, markAsInCompleted);

// export default router;




import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCourseProgress,
  markAsCompleted,
  updateLectureProgress,
  markAsInCompleted,
} from "../controller/coursePorgressController.js";

const router = express.Router();

router.route("/:courseId").get(isAuthenticated, getCourseProgress);
router
  .route("/:courseId/lecture/:lectureId/view")
  .post(isAuthenticated, updateLectureProgress);
router.route("/:courseId/complete").post(isAuthenticated, markAsCompleted);
router.route("/:courseId/incomplete").post(isAuthenticated, markAsInCompleted);

export default router;