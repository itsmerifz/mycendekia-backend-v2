import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";

import indexRouter from "./routes/index.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import articlesRouter from "./routes/articles.js";

const env = dotenv.config().parsed;
const port = env.APP_PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'public/images')));
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
}).then((a) => {
  console.log(`Connected to DB: ${a.connections[0].name}`);
}).catch(err => {
  console.error(`Error: ${err.reason}`);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {})


// Handle error
app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error(`Ada kesalahan pada server`));
  })
})

app.use((err, req, res, next) => {
  console.error(err.message);
  if(!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
