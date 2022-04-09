import multer from "multer";
import crypto from "crypto";

// Setting Multer
const storage = multer.diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    crypto.randomBytes(16 , (err, raw) => {
      if (err) return cb(err);

      cb(null, raw.toString("hex") + path.extname(file.originalname));
    })
  },
});

const upload = multer({ storage: storage }); 

export default upload;