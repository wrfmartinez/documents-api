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
const PORT: number = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to ${mongoose.connection.name}`);
});
mongoose.connection.on("error", (err) => {
  console.error(`Error connecting to the database: ${err}`);
});

app.get("/", async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (err: any) {
    res.status(500).json({error: err.message });
  }
});

app.post("/document/new", async (req, res) => {
  try {
    const newDocument = await Document.create(req.body);
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
})

app.put("/document/:documentId", async (req, res) => {
  try {
    const editDocument = await Document.findByIdAndUpdate(
      req.params.documentId,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json(editDocument);
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

app.delete("/document/:documentId", async (req, res) => {
  try {
    const deleteDocument = await Document.findByIdAndDelete(req.params.documentId);
  res.status(200).json(deleteDocument);
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, (): void => {
  console.log(`Listening on PORT ${PORT}`);
});
