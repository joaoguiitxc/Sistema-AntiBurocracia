import express from "express";
import dotenv from "dotenv";
//import cors from "cors"

import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de Sistema-AntiBurocracia funcionando" });
});


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