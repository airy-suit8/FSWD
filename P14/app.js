const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } 
});

app.get('/', (req, res) => {
    res.render('upload', { error: null });
});

app.post('/upload', upload.single('resume'), (req, res) => {
    if (!req.file) {
        return res.render('upload', { error: 'Please select a valid PDF file under 2MB.' });
    }
    res.render('result', { filename: req.file.filename });
});

app.use((err, req, res, next) => {
    if (err) {
        res.render('upload', { error: err.message });
    }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
