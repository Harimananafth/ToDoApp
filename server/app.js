const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur de la to-do list ! 🚀");
});
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
