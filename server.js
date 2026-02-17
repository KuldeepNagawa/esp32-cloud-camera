const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static(__dirname));
app.use(express.raw({ type: "image/jpeg", limit: "10mb" }));

const FRAME_PATH = path.join(__dirname, "frame.jpg");

app.post("/upload", (req, res) => {
  fs.writeFileSync(FRAME_PATH, req.body);
  res.send("Frame received");
});

app.get("/live", (req, res) => {
  if (fs.existsSync(FRAME_PATH)) {
    res.setHeader("Content-Type", "image/jpeg");
    res.sendFile(FRAME_PATH);
  } else {
    res.send("No frame yet");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
