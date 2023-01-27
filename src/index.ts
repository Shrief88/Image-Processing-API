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

const resizeImage = async (
  filePath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> => {
  try {
    await sharp(filePath).resize({ width, height }).toFile(outputPath);
  } catch (e) {
    throw new Error("something went wrong");
  }
};

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
      await resizeImage(
        filePath,
        outputPath,
        parseInt(width),
        parseInt(height)
      );
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }

  res.sendFile(outputPath);
});

app.listen(port, hostname, () => {
  console.log(`server is running on http://${hostname}:${port}`);
});

export { app, resizeImage };
