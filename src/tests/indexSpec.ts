import supertest from "supertest";
import app from "..";
import path from "path";
import fs from "fs";

const request = supertest(app);
describe("Test endpoint response", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get("/api/images").query({
      filename: "fjord",
      width: "200",
      height: "200",
    });
    expect(response.status).toBe(200);
    await fs.promises.unlink(
      path.resolve(__dirname, "..", "..", "thumb", "fjord-200-200.jpg")
    );
  });

  describe("throw an error when user enter unvaild file name", () => {
    it("throw an error when user does not provide value", async () => {
      const response = await request.get("/api/images").query({
        width: "200",
        height: "200",
      });
      expect(response.status).toBe(404);
    });

    it("throw an error when user enters wrong value", async () => {
      const response = await request.get("/api/images").query({
        filename: "ford",
        width: "200",
        height: "200",
      });
      expect(response.status).toBe(404);
    });

    it("throw an error when user enters wrong key value", async () => {
      const response = await request.get("/api/images").query({
        fillllname: "fjord",
        width: "200",
        height: "200",
      });
      expect(response.status).toBe(404);
    });
  });

  describe("throw an error when user enter unvaild width", () => {
    it("throw an error when user does not provide value", async () => {
      const response = await request.get("/api/images").query({
        filename: "fjord",
        height: "200",
      });
      expect(response.status).toBe(400);
    });

    it("throw an error when user enter negative value", async () => {
      const response = await request.get("/api/images").query({
        filename: "fjord",
        width: "-200",
        height: "200",
      });
      expect(response.status).toBe(400);
    });

    it("throw an error when user enters wrong key value", async () => {
      const response = await request.get("/api/images").query({
        filename: "fjord",
        widttth: "200",
        height: "200",
      });
      expect(response.status).toBe(400);
    });

    it("throw an error when user enters NAN value", async () => {
      const response = await request.get("/api/images").query({
        filename: "fjord",
        width: "NAN",
        height: "200",
      });
      expect(response.status).toBe(400);
    });
  });

  describe("throw an error when user enter unvaild height", () => {
    it("throw an error when user does not provide value", async () => {
      const response = await request.get("/api/images").query({
        filename: "fjord",
        width: "200",
      });
      expect(response.status).toBe(400);
    });

    it("throw an error when user enter negative value", async () => {
      const response = await request.get("/api/images").query({
        filename: "fjord",
        width: "200",
        height: "-200",
      });
      expect(response.status).toBe(400);
    });

    it("throw an error when user enters wrong key value", async () => {
      const response = await request.get("/api/images").query({
        filename: "fjord",
        width: "200",
        heiggght: "200",
      });
      expect(response.status).toBe(400);
    });

    it("throw an error when user enters NAN value", async () => {
      const response = await request.get("/api/images").query({
        filename: "fjord",
        width: "200",
        height: "NAN",
      });
      expect(response.status).toBe(400);
    });
  });
});
