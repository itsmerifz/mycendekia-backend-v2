import express from "express";
import { getAllUsers, changePassword } from "../controllers/usersController.js";
const router = express.Router();

router.get("/", getAllUsers);
router.patch("/change-password", changePassword);

export default router;