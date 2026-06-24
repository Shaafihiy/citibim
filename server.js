const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// HOME ROUTE (fixes Cannot GET /)
app.get("/", (req, res) => {
  res.send("CITIBIM Backend Running ✔");
});

// TEST ROUTE
app.get("/test", (req, res) => {
  res.json({ status: "OK" });
});

// PORT (CRITICAL FOR RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});