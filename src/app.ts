import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";

const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

app.use("/api/users/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Something went wrong", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
