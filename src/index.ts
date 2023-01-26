import express from "express";

const app = express();
const port = 3000;
const hostname = "localhost";

app.listen(port, hostname, () => {
  console.log(`server is running on http://${hostname}:${port}`);
});
