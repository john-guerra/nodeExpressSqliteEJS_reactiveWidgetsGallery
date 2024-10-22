import express from 'express';
import { createWidget, getAllWidgets } from '../db/mysqlite.js';

const router = express.Router();


// Render the index page with widgets
router.get("/", async (req, res) => {
  try {
    const widgets = await getAllWidgets();
    res.render("index", { title: "Reactive Widget Repository", widgets });
  } catch (error) {
    console.error("Error fetching widgets:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/api/widgets/create", async (req, res) => {
  console.log("Create a new widget");
  const payload = req.body;

  try {
    await createWidget(payload);
    res.redirect("/");
  } catch (error) {
    console.error("Error creating widget:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;