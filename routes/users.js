import express from "express";
import { getAllUsers, changePassword, getUserById, updateUser } from "../controllers/usersController.js";
const router = express.Router();
import multer from "multer";
import { v4 as uuid } from "uuid";

const imgLocation = "./public/images/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgLocation);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuid() + '-' + fileName);
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    }else{
      cb(null, false);
      return cb(new Error('Hanya menerima file .png, .jpg, dan .jpeg!'));
    }
  }
});


router.get("/", getAllUsers);
router.patch("/change-password/:id", changePassword);
router.get("/user", getUserById);
router.patch("/update/:id", upload.single('image'), updateUser);

export default router;