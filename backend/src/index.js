import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes.js";
import audioRoutes from "./routes/audioRoutes.js";
import './MQ/workers.js';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Basic Routes
app.use("/user", userRoutes);
app.use("/audio", audioRoutes);

// Start the server
mongoose.connect(process.env.MONGODB_URI);
console.log("connected to db");

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
