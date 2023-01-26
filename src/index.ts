import express from "express";
import path from "path";

const app = express();
const port = 3000;
const hostname = "localhost";

app.get("/api/images", (req: express.Request, res: express.Response) => {
  const filePath = path.resolve(
    __dirname,
    "..",
    "full",
    `${req.query.fillname}`
  );
  res.sendFile(filePath);
});

app.listen(port, hostname, () => {
  console.log(`server is running on http://${hostname}:${port}`);
});
