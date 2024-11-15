const multer = require('multer');



// Set up storage destination and filename handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/certificates');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

// Set up multer with file size limit (2MB)
const UploadCertificate = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});



module.exports  = UploadCertificate