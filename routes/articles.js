import express from "express";
import { addArticle, getArticles, editArticle, getOneArticle, deleteArticle, searchArticle } from '../controllers/articlesController.js';

const router = express.Router();

router.get("/", getArticles);
router.post("/add-article", addArticle);
router.patch("/article/:id", editArticle);
router.get("/article/:id", getOneArticle);
router.get("/search/:keyword", searchArticle);
router.delete("/article/:id", deleteArticle);


export default router;
