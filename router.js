const express = require('express');
const app = express();
const path = require('path');

const router = express.Router();
const upload = require('./uploadMiddleware');
const qrCodeScanner = require('./QrCode');

router.get('/', async function (req, res) {
    await res.render('index');
});

router.post('/post', upload.single('image'), async function (req, res) {
    if (!req.file) {
        res.status(401).json({ error: 'Please provide an image' });
    }
    qrCodeScanner(req.file.buffer, res);
});

module.exports = router;
