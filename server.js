import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

//import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

// import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de Sistema-AntiBurocracia funcionando" });
});

app.use("/auth", authRoutes);
// app.use("/users", userRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.log("Erro ao iniciar o servidor:", error.message);
  }
};

startServer();