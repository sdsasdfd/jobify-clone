import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(express.json());

app.use("/api/jobs", authenticateUser, jobRouter);
app.use("/api/users", authenticateUser, userRouter);
app.use("/api/auth", authRouter);

app.get("/api/test", (req, res) => {
  res.json("hello");
});

// app.post("/api/test", validateTest, (req, res) => {
//   res.json({ msy: `hello ${req.body.name}` });
// });

app.use("*", (req, res) => {
  res.status(404).json({ msy: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => console.log("Runn...", port));
} catch (error) {
  console.log(error);
  process.exit(1);
}
