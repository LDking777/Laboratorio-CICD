const request = require("supertest");
const app = require("./index");

describe("API Tiendita", () => {
  test("GET /api/health debe responder con status 200", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
  });

  test("GET /api/products debe responder con status 200 y una lista de productos", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(3);
  });

  test("GET /api/hello debe responder con status 200", async () => {
    const res = await request(app).get("/api/hello");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Hola desde DevOps");
  });
});