const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/");
    },
    filename: (req, file, cb) => {
        const unqiueName = Date.now() + "--" + file.originalname;
        cb(null, unqiueName);
    }
});

const upload = multer({ storage });

module.exports = upload;