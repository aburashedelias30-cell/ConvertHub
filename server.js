const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");
const convertapi = require("convertapi")("ciRtX0aU7R3CREtXi8UE3M3JpHLxGai2");

const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

const upload = multer({
    dest: "uploads/"
});

// ================= Protect PDF =================

app.post("/upload", upload.single("pdf"), (req, res) => {

    const input = req.file.path;
    const output = input + "-protected.pdf";
    const password = req.body.password;

    const cmd = `qpdf --encrypt "${password}" "${password}" 256 -- "${input}" "${output}"`;

    exec(cmd, (err) => {

        if (err) {
            return res.status(500).send("Failed to protect PDF");
        }

        res.download(output, "protected.pdf");

    });

});

// ================= Compress PDF =================

app.post("/compress", upload.single("pdf"), (req, res) => {

    const input = req.file.path;
    const output = input + "-compressed.pdf";

    const cmd = `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${output}" "${input}"`;

    exec(cmd, (err) => {

        if (err) {
            return res.status(500).send("Compression failed");
        }

        res.download(output, "compressed.pdf");

    });

});

// ================= Unlock PDF =================

app.post("/unlock", upload.single("pdf"), (req, res) => {

    const input = req.file.path;
    const output = input + "-unlocked.pdf";
    const password = req.body.password;

    const cmd = `qpdf --password="${password}" --decrypt "${input}" "${output}"`;

    exec(cmd, (err) => {

        if (err) {
            return res.status(500).send("Wrong password");
        }

        res.download(output, "unlocked.pdf");

    });

});

// ================= PDF to Word =================

app.post("/pdf-to-word", upload.single("pdf"), async (req, res) => {

    try {

        const result = await convertapi.convert("docx", {
    File: req.file.path
});

        await result.saveFiles("uploads");

        res.download(result.files[0].path);

    } catch (err) {

     console.log(err.response?.data || err.message || err);

        res.status(500).send("Conversion failed");

    }

});

// ================= Start Server =================

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});