import express from "express";
import { getAllUsers, changePassword, getUserById, updateUser } from "../controllers/usersController.js";
const router = express.Router();
import upload from "../multer.js"


router.get("/", getAllUsers);
router.patch("/change-password/:id", changePassword);
router.get("/user", getUserById);
router.patch("/update/:id", upload.single('image'), updateUser);

export default router;