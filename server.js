const express = require("express");
const app = express();
require("dotenv").config();
const fs = require("fs");
const path = require("path");
// middle ware
app.use(express.json());
// Root route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the API Server! Available APIs: /api/products, /api/food"
  );
});
// Products API
app.get("/api/products", (req, res) => {
  const productsData = fs.readFileSync(
    path.join(__dirname, "data/products.json")
  );
  res.json(JSON.parse(productsData));
});
// Food API
app.get("/api/food", (req, res) => {
  const foodData = fs.readFileSync(path.join(__dirname, "data/food.json"));
  res.json(JSON.parse(foodData));
});
// Add new product (POST request)
app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  let productsData = fs.readFileSync(
    path.join(__dirname, "data/products.json")
  );
  let products = JSON.parse(productsData);

  products.push(newProduct);
  fs.writeFileSync(
    path.join(__dirname, "data/products.json"),
    JSON.stringify(products, null, 2)
  );

  res
    .status(201)
    .json({ message: "Product added successfully", product: newProduct });
});
// Add new food item (POST request)
app.post("/api/food", (req, res) => {
  const newFood = req.body;
  let foodData = fs.readFileSync(path.join(__dirname, "data/food.json"));
  let foodItems = JSON.parse(foodData);

  foodItems.push(newFood);
  fs.writeFileSync(
    path.join(__dirname, "data/food.json"),
    JSON.stringify(foodItems, null, 2)
  );

  res
    .status(201)
    .json({ message: "Food item added successfully", food: newFood });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
