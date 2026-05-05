import express from "express";
import cors from "cors";
import UserRoutes from "./routes/user.routes.js";

let app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api/users", UserRoutes);

export default app;
