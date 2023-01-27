import express from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";

const app = express();
const port = 3000;
const hostname = "localhost";

interface Query {
  fillname: string;
  width: string;
  height: string;
}

const resizeImage = async (req: express.Request): Promise<void> => {
  const { fillname, width, height } = req.query as unknown as Query;
  const filePath = path.resolve(__dirname, "..", "full", `${fillname}.jpg`);
  const outputPath = path.resolve(
    __dirname,
    "..",
    "thumb",
    `${fillname}-${width}-${height}.jpg`
  );

  await sharp(filePath)
    .resize({ width: parseInt(width), height: parseInt(height) })
    .toFile(outputPath);
};

app.get("/api/images", async (req: express.Request, res: express.Response) => {
  const { fillname, width, height } = req.query as unknown as Query;
  const filePath = path.resolve(
    __dirname,
    "..",
    "thumb",
    `${fillname}-${width}-${height}.jpg`
  );

  if (!fs.existsSync(filePath)) {
    await resizeImage(req);
  }

  res.sendFile(filePath);
});

app.listen(port, hostname, () => {
  console.log(`server is running on http://${hostname}:${port}`);
});

export default app;
