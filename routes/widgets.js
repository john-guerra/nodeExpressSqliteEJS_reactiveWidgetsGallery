import express from 'express';
import { createWidget } from '../db/mysqlite.js';

const router = express.Router();

router.post("/api/widgets/create", async (req, res) => {
  console.log("Create a new widget");
  const payload = req.body;

  try {
    await createWidget(payload);
    res.render("index", { title: "Widget Created Successfully" });
  } catch (error) {
    console.error("Error creating widget:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;