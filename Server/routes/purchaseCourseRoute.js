// import express from "express";
// import {isAuthenticated} from "../middlewares/isAuthenticated.js"
// import { createCheckoutSession, stripeWebhook } from "../controller/coursePurchaseController.js";

// const router = express.Router();

// router.route("/checkout/create-checkout-session").post(isAuthenticated,createCheckoutSession);
// router.route("/webhook").post(express.raw({type:"application/json"}),stripeWebhook);
// router.route("/course/:courseId/detail-with-status").get();

// router.route("/").get();
// export default router;

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  getAllPurchaseCourse,
  getCoursedeatilWithPurchaseStatus,
  stripeWebhook,
  //   getCourseDetailWithStatus,
  //   getAllCheckouts
} from "../controller/coursePurchaseController.js";

const router = express.Router();

// ✅ Create checkout session (requires login)
router.post(
  "/checkout/create-checkout-session",
  isAuthenticated,
  createCheckoutSession
);

// ✅ Stripe webhook (raw body required)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

router.get(
  "/course/:courseId/detail-with-status",isAuthenticated,
  getCoursedeatilWithPurchaseStatus
);
router.get("/",isAuthenticated, getAllPurchaseCourse);
// ✅ Get course details with purchase status
// router.get("/course/:courseId/detail-with-status", isAuthenticated, getCourseDetailWithStatus);

// ✅ Get all checkout records (for admin/dashboard)
// router.get("/", isAuthenticated, getAllCheckouts);

export default router;
