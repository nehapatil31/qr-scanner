const Jimp = require('jimp');
const QrCode = require('qrcode-reader');


const qrCodeScanner = async(buffer, res) => {
    try {
        let msg = {};
        await Jimp.read(buffer, function (err, image) {
            if (err) {
                console.error(err);
                msg = { 'error': err };
                res.status(500).json(msg);
            }
            let qrcode = new QrCode();
            qrcode.callback = function (err, value) {
                if (err) {
                    console.error(err);
                    msg = { 'error': err };
                    res.status(500).json(msg);
                } else {
                    msg = { 'text': value.result };
                    res.render('response', {
                        text: value.result
                    });
                }
                return msg;
            };
            qrcode.decode(image.bitmap);
        });
    } catch (error) {
        console.log(error);
        msg = { 'error': error };
        res.status(500).json(msg);
    }
};
module.exports = qrCodeScanner;
