import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import locationRoutes from "./routes/locationroutes.js";

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:5173", "https://maptrack-production.up.railway.app/"];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.get("/good", (req, res) => {
  res.status(200).json({ message: "Good" });
});

app.use(authRoutes);
app.use(locationRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
