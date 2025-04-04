import express from "express";
import {
  getAllLocations,
  getLocationById,
  getMapConfig,
} from "../controllers/locationcontroller.js";

const router = express.Router();

router.get("/locations", getAllLocations);
router.get("/map/:id", getLocationById);
router.get("/map", getMapConfig);

export default router;
