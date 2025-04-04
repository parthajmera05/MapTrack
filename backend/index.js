import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import locationRoutes from "./routes/locationroutes.js";

dotenv.config();

const app = express();



app.use(cors({
  origin: true,
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
