export async function fetchSystemStats() {
  try {
    const response = await fetch("http://localhost:5000/api/stats");
    return await response.json();
  } catch (err) {
    console.error("Failed to fetch stats:", err);
    return null;
  }
}
