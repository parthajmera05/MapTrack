import prisma from "../prisma/client.js";

export const getAllLocations = async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { name: "asc" },
    });
    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

export const getLocationById = async (req, res) => {
  const id = req.params.id;
  try {
    const location = await prisma.location.findUnique({ where: { id } });
    if (!location) return res.status(404).json({ error: "Location not found" });
    res.json(location);
  } catch (error) {
    console.error("Error fetching location:", error);
    res.status(500).json({ error: "Failed to fetch location" });
  }
};

export const getMapConfig = (req, res) => {
  res.json({
    defaultCenter: [28.6139, 77.2090],
    defaultZoom: 10,
  });
};
