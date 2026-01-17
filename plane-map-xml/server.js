const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const FILE = "routes.json";

// получить маршруты
app.get("/routes", (req, res) => {
  if (!fs.existsSync(FILE)) return res.json([]);
  const data = fs.readFileSync(FILE, "utf8");
  res.json(JSON.parse(data || "[]"));
});

// сохранить маршруты
app.post("/routes", (req, res) => {
  fs.writeFileSync(FILE, JSON.stringify(req.body));
  res.json({ status: "ok" });
});

// порт Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
