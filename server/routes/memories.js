const express = require("express");
const Memory = require("../models/Memory");

const router = express.Router();

// GET /api/memories - fetch all memories
router.get("/", async (req, res, next) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.json(memories);
  } catch (err) {
    next(err);
  }
});

// POST /api/memories - create a memory
router.post("/", async (req, res, next) => {
  try {
    const { title, description, image, date } = req.body || {};

    const normalizedTitle = typeof title === "string" ? title.trim() : "";
    if (!normalizedTitle) {
      return res.status(400).json({ error: "title is required" });
    }

    let parsedDate;
    if (date) {
      parsedDate = new Date(date);
      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: "date must be a valid date" });
      }
    }

    const created = await Memory.create({
      title: normalizedTitle,
      description,
      image,
      date: parsedDate,
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

module.exports = router;


