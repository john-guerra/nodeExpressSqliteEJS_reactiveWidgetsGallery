import express from "express";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";

import { fileURLToPath } from "url";

import widgetsRouter from "./routes/widgets.js";


const app = express();
const port = process.env.PORT || 3000;

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Middleware for logging
app.use(morgan("dev"));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/", widgetsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
