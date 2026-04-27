const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const FILE_PATH = "./data/dogs.json";

const readData = () => {
  try {
    if (!fs.existsSync(FILE_PATH)) return {};
    const data = fs.readFileSync(FILE_PATH);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading data:", err);
    return {};
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing data:", err);
  }
};

app.get("/", (req, res) => {
  res.send("Dog API is running");
});

app.get("/dogs", (req, res) => {
  const data = readData();
  res.json(data);
});

app.post("/dogs", (req, res) => {
  const { breed, subBreeds } = req.body;

  if (!breed) {
    return res.status(400).json({ message: "Breed is required" });
  }

  const data = readData();

  if (data[breed]) {
    return res.status(400).json({ message: "Breed already exists" });
  }

  data[breed] = subBreeds || [];
  writeData(data);
  res.json({ message: "Dog added successfully" });
});

app.put("/dogs/:breed", (req, res) => {
  const { breed } = req.params;
  const { subBreeds } = req.body;
  const data = readData();

  if (!data[breed]) {
    return res.status(404).json({ message: "Breed not found" });
  }

  data[breed] = subBreeds || [];
  writeData(data);
  res.json({ message: "Dog updated successfully" });
});

app.delete("/dogs/:breed", (req, res) => {
  const { breed } = req.params;
  const data = readData();

  if (!data[breed]) {
    return res.status(404).json({ message: "Breed not found" });
  }

  delete data[breed];
  writeData(data);
  res.json({ message: "Dog deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
