import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import indexRouter from "./routes/index.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import articlesRouter from "./routes/articles.js";

const env = dotenv.config().parsed;
const port = env.APP_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", indexRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/articles", articlesRouter);

// Connect DB
// mongoose.connect(`${env.MONGODB_URI}${env.MONGODB_HOST}:${env.MONGODB_PORT}`, {
//   dbName: env.MONGODB_DBNAME,
// });
mongoose.connect(`${env.MONGODB_ATLASURI}${env.MONGODB_UNAME}:${env.MONGODB_PASS}${env.MONGODB_ATLASHOST}/${env.MONGDB_DBNAME}?retryWrites=true&w=majority`,{
  dbName: env.MONGODB_DBNAME,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to DB");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
