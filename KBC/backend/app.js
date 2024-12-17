import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.get("/greet", (req, res) => {
  res.json({ message: "Kudo, welcome to the Multiplayer Quiz Game API!" });
});

export default app;
