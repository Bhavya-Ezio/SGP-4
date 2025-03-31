import express from "express";
import { StatusCodes } from "http-status-codes";
import upload from "../middleware/multerMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import { uploadFile, getTranscript, getProgress } from "../controllers/audioController.js";

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/upload", upload.single("file"), uploadFile);

router.get("/transcript/:id", getTranscript)

router.get("/getProgress/:id", getProgress);
export default router;