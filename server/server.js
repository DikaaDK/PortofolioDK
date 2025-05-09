import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Together } from "together-ai";
import fs from "fs";
const systemPrompt = fs.readFileSync("./server/data_dikaAI.txt", "utf-8");


//npm install express cors dotenv together-ai

dotenv.config();
console.log("API Key Loaded:", process.env.TOGETHER_API_KEY);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const together = new Together({
  apiKey:
    process.env.TOGETHER_API_KEY ||
    "2189514e013188e5feff5cdf6d5d558055c7e0a9f06f17ca56b62b46e20f15e6",
});

app.post("/api/chatai", async (req, res) => {
  try {
    const { message = "" } = req.body;

    if (!message.trim()) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong." });
    }

    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json(response);
  } catch (error) {
    console.error("Error in /api/chatai:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memproses permintaan." });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
