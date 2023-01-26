import express from "express";
import path from "path";
import sharp from "sharp";

const app = express();
const port = 3000;
const hostname = "localhost";

interface Query {
  fillname: string;
  width: string;
  height: string;
}

const resizeImage = async (
  req: express.Request,
  res: express.Response,
  next: () => void
): Promise<void> => {
  const { fillname, width, height } = req.query as unknown as Query;
  const filePath = path.resolve(__dirname, "..", "full", `${fillname}`);
  const outputPath = path.resolve(__dirname, "..", "thumb", `${fillname}`);

  await sharp(filePath)
    .resize({ width: parseInt(width), height: parseInt(height) })
    .toFile(outputPath);
  next();
};

app.get(
  "/api/images",
  resizeImage,
  (req: express.Request, res: express.Response) => {
    const { fillname } = req.query as unknown as Query;
    const filePath = path.resolve(__dirname, "..", "thumb", `${fillname}`);
    res.sendFile(filePath);
  }
);

app.listen(port, hostname, () => {
  console.log(`server is running on http://${hostname}:${port}`);
});
