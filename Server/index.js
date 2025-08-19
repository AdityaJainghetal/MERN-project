import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./database/dbConnect.js";
import userRoute from "./routes/userRoute.js";

import courseRoute from "./routes/courseRoute.js";
import mediaRoute from "./routes/mediaRoute.js";
import purchaseRoute from "./routes/purchaseCourseRoute.js";
import courseProgressRoute from "./routes/courseProgressRoute.js"
import { stripeWebhook } from "./controller/coursePurchaseController.js";
dotenv.config({});

connectDb();

const app = express();

const PORT = process.env.PORT || 3000;


app.use(
  "/api/v1/purchase/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );


app.use(
  cors({
    origin: [
      "http://localhost:5173", // local development
      "https://mern-project-am1o.vercel.app" // deployed frontend
    ],
    credentials: true,
  })
);

app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/progress",courseProgressRoute)
app.use(
  "/api/v1/purchase",
  express.raw({ type: "application/json" }),
  purchaseRoute
);


app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
