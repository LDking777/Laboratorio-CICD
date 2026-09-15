const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.APP_ENVIRONMENT || "LOCAL";

const products = [
  { id: 1, nombre: "Coca-Cola 600ml", precio: 18.5, stock: 50 },
  { id: 2, nombre: "Papitas Doritos", precio: 22.0, stock: 35 },
  { id: 3, nombre: "Galletas Marías", precio: 15.0, stock: 40 },
  { id: 4, nombre: "Agua Bonafont 1L", precio: 12.0, stock: 60 },
];

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", environment: ENV });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hola desde DevOps", environment: ENV });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Tiendita corriendo en http://localhost:${PORT} (ambiente: ${ENV})`);
  });
}

module.exports = app;