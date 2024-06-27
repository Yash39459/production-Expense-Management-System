import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import colors from "colors";
import { join } from "path";
import connectDb from "./config/connectDb";

config();

connectDb();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

app.use(express.static(join(__dirname, './client/build')));

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
