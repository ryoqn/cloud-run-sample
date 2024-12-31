import express from "express";

const app = express();
const port = process.env.PORT || 8080;

app.get("/api", (req, res) => {
  res.send("Hello from TypeScript on Cloud Run!!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
