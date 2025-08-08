import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../ulils/multer.js";
import {
  createCourse,
  editCourse,
  getcreatorCourses,
  getCourseById,
  createLecture,
  getCourseLecture,
  removeLecture,
  getLectureById,
  editLecture,
  togglePublishCourse,
  getPublishedCourse,
  searchCourse,
} from "../controller/coursecontroller.js";
const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated, searchCourse)
router.route("/published-course").get(isAuthenticated, getPublishedCourse);
router.route("/").get(isAuthenticated, getcreatorCourses);

router
  .route("/:courseId")
  .put(isAuthenticated, upload.single("thumbnail"), editCourse);

router.route("/:courseId").get(isAuthenticated, getCourseById);

router.route("/:courseId/lecture").post(isAuthenticated, createLecture);

router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);

router
  .route("/:courseId/lecture/:lectureId")
  .post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);

export default router;
