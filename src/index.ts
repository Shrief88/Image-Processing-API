import express from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";

const app = express();
const port = 3000;
const hostname = "localhost";

interface Query {
  filename: string;
  width: string;
  height: string;
}

app.get("/api/images", async (req: express.Request, res: express.Response) => {
  const { filename, width, height } = req.query as unknown as Query;
  const filePath = path.resolve(__dirname, "..", "full", `${filename}.jpg`);

  const outputPath = path.resolve(
    __dirname,
    "..",
    "thumb",
    `${filename}-${width}-${height}.jpg`
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("No such file");
  }
  if (
    isNaN(parseInt(height)) ||
    isNaN(parseInt(width)) ||
    parseInt(width) < 0 ||
    parseInt(height) < 0
  ) {
    return res
      .status(400)
      .send("you should send proper values for height and width");
  }

  if (!fs.existsSync(outputPath)) {
    try {
      await sharp(filePath)
        .resize({ width: parseInt(width), height: parseInt(height) })
        .toFile(outputPath);
    } catch (e) {
      return res.status(500).send("something went wrong");
    }
  }

  res.sendFile(outputPath);
});

app.listen(port, hostname, () => {
  console.log(`server is running on http://${hostname}:${port}`);
});

export default app;
