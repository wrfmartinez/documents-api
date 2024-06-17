import dotenv from "dotenv";
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import Document from "./models/Document";

declare const process: {
  env: {
    MONGODB_URI: string;
    PORT: number;
  };
};

dotenv.config();
const app = express();
const PORT: number = process.env.PORT | 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to ${mongoose.connection.name}`);
});

app.get("/", async (req, res) => {
  const documents = await Document.find();
  res.status(200).json(documents);
});

app.post("/document/new", async (req, res) => {
  const newDocument = await Document.create(req.body);
  await newDocument.save();
  res.status(201).json(newDocument);
})

app.put("/document/:documentId", async (req, res) => {
  const editDocument = await Document.findByIdAndUpdate(req.params.documentId,
    {
      $set: req.body
    }
  );
  res.status(201).json(editDocument);
})

app.delete("/document/:documentId", async (req, res) => {
  const deleteDocument = await Document.findByIdAndDelete(req.params.documentId);
  res.status(200).json(deleteDocument);
})

app.listen(PORT, (): void => {
  console.log(`Listening on PORT ${PORT}`);
});
