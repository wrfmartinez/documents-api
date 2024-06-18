import { Schema, model } from "mongoose";

interface Document {
  title: string;
  snippet?: string;
  codeLanguage?: string;
  highlightedLines?: string;
  text: string;
}

const documentSchema = new Schema<Document>({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
  },
  codeLanguage: {
    type: String,
  },
  highlightedLines: {
    type: String,
  },
  text: {
    type: String,
    required: true
  }
})

const DocumentModel = model<Document>('Document', documentSchema);

export default DocumentModel;