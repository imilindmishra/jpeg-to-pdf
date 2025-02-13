// backend/server.js
import express from "express";
import multer from "multer";
import PDFDocument from "pdfkit";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const port = 3001;

// Enable CORS for requests coming from the frontend (e.g., http://localhost:3000)
app.use(cors());

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: "./uploads", // Directory where files will be saved
  filename: (req, file, cb) => {
    // Create a unique filename: fieldname + timestamp + original extension
    const uniqueName = `${file.fieldname}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Create the uploads folder if it doesn't exist
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

app.post("/convert", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const imagePath = req.file.path;
  const doc = new PDFDocument({ autoFirstPage: false });

  res.setHeader("Content-Disposition", "attachment; filename=output.pdf");
  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);
  doc.addPage({ size: "A4" });
  doc.image(imagePath, {
    fit: [500, 700],
    align: "center",
    valign: "center",
  });
  doc.end();

  doc.on("end", () => {
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Error removing file:", err);
    });
  });
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
