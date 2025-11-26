const app = require("./app");

const PORT = 5000;

function startServer() {
  try {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`TwinOS backend running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();
