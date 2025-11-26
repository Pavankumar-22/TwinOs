const { fetchSystemStats } = require("../services/statsService");

const getSystemStats = async (req, res) => {
  try {
    const data = await fetchSystemStats();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching system stats:", error);
    return res.status(500).json({ message: "Failed to fetch system statistics" });
  }
};

module.exports = {
  getSystemStats,
};
