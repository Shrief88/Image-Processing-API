import sharp from "sharp";

const resizeImage = async (
  filePath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> => {
  await sharp(filePath).resize({ width, height }).toFile(outputPath);
};

export default resizeImage;
