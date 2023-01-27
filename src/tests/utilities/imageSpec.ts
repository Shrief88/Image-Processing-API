import resizeImage from "../../utilities/image";
import path from "path";
import fs from "fs";

describe("Test image processing function", () => {
  it("create new file in thumb folder", async () => {
    const filePath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "full",
      `fjord.jpg`
    );
    const outputPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "thumb",
      "fjord-200-200.jpg"
    );

    if (fs.existsSync(outputPath)) {
      await fs.promises.unlink(outputPath);
    }

    await resizeImage(filePath, outputPath, 200, 200);
    expect(fs.existsSync(outputPath)).toBe(true);
  });
});

// it("create new file in thumb folder", async () => {
//     await request.get("/api/images").query({
//       filename: "fjord",
//       width: "200",
//       height: "200",
//     });
//     const outputPath = path.resolve(
//       __dirname,
//       "..",
//       "..",
//       "thumb",
//       "fjord-200-200.jpg"
//     );
//     expect(fs.existsSync(outputPath)).toBe(true);
//   });
