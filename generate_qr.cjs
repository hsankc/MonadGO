const QRCode = require('qrcode');

const payload = "nadgo://badge/ankara-hackathon-26";
const opts = {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  width: 500,
  margin: 2,
  color: {
    dark: "#836EF9",
    light: "#0D0620"
  }
};

QRCode.toFile('./public/ankara_hackathon_qr.png', payload, opts, function (err) {
  if (err) throw err;
  console.log('QR Code created at ./public/ankara_hackathon_qr.png');
});
