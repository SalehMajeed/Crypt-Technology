import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  })
);

app.get("/greet", (req, res) => {
  res.json({ message: "hello React Devs from the server" });
});
    
export default app;
