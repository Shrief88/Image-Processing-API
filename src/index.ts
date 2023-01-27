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

  if (isNaN(parseInt(height)) || isNaN(parseInt(width))) {
    throw new Error("you should send proper values for height and width");
  }

  try {
    await sharp(filePath)
      .resize({ width: parseInt(width), height: parseInt(height) })
      .toFile(outputPath);
  } catch (e) {
    throw new Error("no such files");
  }
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
    try {
      await resizeImage(req);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  res.sendFile(filePath);
});

app.listen(port, hostname, () => {
  console.log(`server is running on http://${hostname}:${port}`);
});

export default app;
