import supertest from "supertest";
import app from "..";

const request = supertest(app);
describe("Test endpoint response", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get("/api/images").query({
      fillname: "fjord",
      width: "200",
      height: "200",
    });
    expect(response.status).toBe(200);
  });
});
