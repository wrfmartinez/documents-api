import * as dotenv from "dotenv";
import * as express from "express";
import mongoose, { connection } from "mongoose";

dotenv.config();
const app = express();

declare const process: {
  env: {
    MONGODB_URI: string;
    PORT: number;
  };
};

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to ${mongoose.connection.name}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT: number = process.env.PORT | 3000;
app.listen(PORT, (): void => {
  console.log(`Listening on PORT ${PORT}`);
});
