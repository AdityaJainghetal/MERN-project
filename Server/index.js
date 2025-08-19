// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDb from "./database/dbConnect.js";
// import userRoute from "./routes/userRoute.js";

// import courseRoute from "./routes/courseRoute.js";
// import mediaRoute from "./routes/mediaRoute.js";
// import purchaseRoute from "./routes/purchaseCourseRoute.js";
// import courseProgressRoute from "./routes/courseProgressRoute.js"
// dotenv.config({});

// connectDb();

// const app = express();

// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use("/api/v1/media", mediaRoute);
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/course", courseRoute);
// app.use("/api/v1/progress",courseProgressRoute)
// app.use(
//   "/api/v1/purchase",
//   express.raw({ type: "application/json" }),
//   purchaseRoute
// );


// app.listen(PORT, () => {
//   console.log(`Server listen at port ${PORT}`);
// });



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./database/dbConnect.js";

import userRoute from "./routes/userRoute.js";
import courseRoute from "./routes/courseRoute.js";
import mediaRoute from "./routes/mediaRoute.js";
import purchaseRoute from "./routes/purchaseCourseRoute.js";
import courseProgressRoute from "./routes/courseProgressRoute.js";

dotenv.config({});
connectDb();

const app = express();

// ⚡ Stripe webhook route (raw body)
app.use(
  "/api/v1/purchase/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    // Stripe webhook handler code
    res.sendStatus(200);
  }
);

// ✅ Dynamic CORS (automatic adjust)
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      callback(null, true); // accept all origins
    },
    credentials: true,
  })
);

// ✅ Global headers fallback (for OPTIONS preflight)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Normal middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/progress",courseProgressRoute)
app.use(
  "/api/v1/purchase",
  express.raw({ type: "application/json" }),
  purchaseRoute
);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
