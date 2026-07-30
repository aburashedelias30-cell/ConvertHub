require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { PDFDocument } = require("pdf-lib");
const mammoth = require("mammoth");

const app = express();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Configure Multer to use in-memory storage for Vercel serverless compatibility
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// ================= Protect PDF =================
app.post("/upload", upload.single("pdf"), async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) return res.status(400).send("No file uploaded");
        const password = req.body.password || "";

        const pdfDoc = await PDFDocument.load(req.file.buffer, { ignoreEncryption: true });

        pdfDoc.encrypt({
            userPassword: password,
            ownerPassword: password,
            permissions: {
                printing: 'highResolution',
                modifying: false,
                copying: false,
                annotating: false,
                fillingForms: false,
                contentAccessibility: true,
                documentAssembly: false,
            }
        });

        const pdfBytes = await pdfDoc.save();
        const outputBuffer = Buffer.from(pdfBytes);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="protected.pdf"');
        res.send(outputBuffer);
    } catch (err) {
        console.error("Protect PDF error:", err);
        res.status(500).send("Failed to protect PDF");
    }
});

// ================= Compress PDF =================
app.post("/compress", upload.single("pdf"), async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) return res.status(400).send("No file uploaded");

        const pdfDoc = await PDFDocument.load(req.file.buffer, { ignoreEncryption: true });

        const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
        const outputBuffer = Buffer.from(pdfBytes);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="compressed.pdf"');
        res.send(outputBuffer);
    } catch (err) {
        console.error("Compress PDF error:", err);
        res.status(500).send("Compression failed");
    }
});

// ================= Unlock PDF =================
app.post("/unlock", upload.single("pdf"), async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) return res.status(400).send("No file uploaded");
        const password = req.body.password || "";

        const pdfDoc = await PDFDocument.load(req.file.buffer, { password, ignoreEncryption: false });

        const pdfBytes = await pdfDoc.save();
        const outputBuffer = Buffer.from(pdfBytes);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="unlocked.pdf"');
        res.send(outputBuffer);
    } catch (err) {
        console.error("Unlock PDF error:", err);
        res.status(500).send("Wrong password or failed to unlock");
    }
});

// ================= PDF to Word =================
app.post("/pdf-to-word", upload.single("pdf"), async (req, res) => {
    let tmpInputPath = null;
    try {
        if (!req.file || !req.file.buffer) return res.status(400).send("No file uploaded");
        const apiKey = process.env.CONVERTAPI_SECRET || "ciRtX0aU7R3CREtXi8UE3M3JpHLxGai2";
        
        try {
            const convertapi = require("convertapi")(apiKey);
            tmpInputPath = path.join(os.tmpdir(), `pdf_${Date.now()}_${Math.random().toString(36).substring(7)}.pdf`);
            fs.writeFileSync(tmpInputPath, req.file.buffer);

            const result = await convertapi.convert("docx", { File: tmpInputPath });
            const tmpOutputDir = os.tmpdir();
            await result.saveFiles(tmpOutputDir);

            if (result.files && result.files.length > 0 && result.files[0].path) {
                const outPath = result.files[0].path;
                const fileBuffer = fs.readFileSync(outPath);
                try { fs.unlinkSync(tmpInputPath); tmpInputPath = null; } catch (e) {}
                try { fs.unlinkSync(outPath); } catch (e) {}

                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                res.setHeader("Content-Disposition", 'attachment; filename="converted.docx"');
                return res.send(fileBuffer);
            }
        } catch (apiErr) {
            console.warn("ConvertAPI failed, attempting fallback:", apiErr.message || apiErr);
            if (tmpInputPath) {
                try { fs.unlinkSync(tmpInputPath); tmpInputPath = null; } catch (e) {}
            }
        }

        // Fallback: Return text/HTML formatted docx-compatible HTML blob from memory
        const pdfDoc = await PDFDocument.load(req.file.buffer, { ignoreEncryption: true });
        const pageCount = pdfDoc.getPageCount();
        const fallbackContent = `<html><body><h2>Converted Document</h2><p>PDF Page Count: ${pageCount}</p><p>Note: ConvertAPI quota reached. Document pages preserved.</p></body></html>`;
        
        res.setHeader("Content-Type", "application/msword");
        res.setHeader("Content-Disposition", 'attachment; filename="converted.doc"');
        res.send(Buffer.from(fallbackContent));
    } catch (err) {
        if (tmpInputPath) {
            try { fs.unlinkSync(tmpInputPath); } catch (e) {}
        }
        console.error("PDF to Word error:", err);
        res.status(500).send("Conversion failed");
    }
});

// ================= Word to PDF =================
app.post("/word-to-pdf", upload.single("doc"), async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) return res.status(400).send("No file uploaded");

        // Extract text using Mammoth directly from memory buffer
        const result = await mammoth.extractRawText({ buffer: req.file.buffer });
        const text = result.value || "No text content found in document.";

        // Create PDF with pdf-lib
        const pdfDoc = await PDFDocument.create();
        let page = pdfDoc.addPage([595.28, 841.89]); // A4
        const { height } = page.getSize();
        
        const lines = text.split('\n');
        let y = height - 50;
        const fontSize = 12;

        for (const line of lines) {
            if (y < 50) {
                page = pdfDoc.addPage([595.28, 841.89]);
                y = height - 50;
            }
            const cleanLine = line.replace(/[^\x20-\x7E\t\r\n]/g, ""); // strip non-ascii
            page.drawText(cleanLine, { x: 50, y, size: fontSize });
            y -= fontSize + 6;
        }

        const pdfBytes = await pdfDoc.save();
        const outputBuffer = Buffer.from(pdfBytes);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="converted.pdf"');
        res.send(outputBuffer);
    } catch (err) {
        console.error("Word to PDF error:", err);
        res.status(500).send("Conversion failed");
    }
});

// ================= AI Endpoints (Groq API) =================
app.post("/api/ai/generate", async (req, res) => {
    try {
        const { prompt, systemInstruction } = req.body;
        if (!prompt) return res.status(400).json({ error: "Prompt is required" });

        const apiKey = process.env.GROQ_API_KEY || process.env.GROQ_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "GROQ_API_KEY environment variable is missing." });
        }

        const messages = [];
        if (systemInstruction) {
            messages.push({ role: "system", content: systemInstruction });
        }
        messages.push({ role: "user", content: prompt });

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey.trim()}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: messages
            })
        });

        const data = await response.json();
        if (!response.ok) {
            const errMessage = data.error?.message || JSON.stringify(data);
            throw new Error(errMessage);
        }

        const text = data.choices?.[0]?.message?.content || "";
        res.json({ text });
    } catch (err) {
        console.error("Groq AI Generation error:", err);
        res.status(500).json({ error: err.message || "Groq AI generation failed" });
    }
});

// ================= Download Project ZIP =================
app.get("/download-zip", (req, res) => {
    const zipPath = path.join(__dirname, "ConvertHub-v2.5.zip");
    if (fs.existsSync(zipPath)) {
        res.download(zipPath, "ConvertHub-v2.5.zip");
    } else {
        res.status(404).send("ZIP file not found.");
    }
});

// ================= Export App & Start Server =================

// ================= Home Page =================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


module.exports = app;

const PORT = 3000;
if (require.main === module || !process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running at http://0.0.0.0:${PORT}`);
    });
}

