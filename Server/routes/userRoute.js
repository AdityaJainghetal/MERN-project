import express from "express";
import { getUserProfile, login, logout, register, updateProfile } from "../controller/usercontroller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../ulils/multer.js"
const router = express.Router();

router.route("/register").post(register);
router.post("/login",login);
router.route("/logout").get(logout)
router.route("/profile").get(isAuthenticated,getUserProfile);


// router.route("/profile/update").put(isAuthenticated,upload.single("image"),updateProfile);
router.route("/profile/update")
  .put(isAuthenticated, upload.single("profilePhoto"), updateProfile);


export default router;