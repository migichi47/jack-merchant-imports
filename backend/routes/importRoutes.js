import express from "express";
import Import from "../models/pastImports.js";

const router = express.Router();

// POST /api/imports
router.post("/", async (req, res) => {
  try {
    const { make, model, year, description, imageUrl, status, arrival } =
      req.body;

    // Validate required fields
    if (!make || !model || !year || !imageUrl) {
      return res.status(400).json({
        message: "Make, model, year, and image URL are required.",
      });
    }

    // Create and save the import
    const newImport = await Import.create({
      make,
      model,
      year,
      description,
      imageUrl,
      status,
      arrival,
    });

    return res.status(201).json({
      message: "Import saved successfully.",
      import: newImport,
    });
  } catch (error) {
    console.error("Error saving import:", error);

    return res.status(500).json({
      message: "Failed to save import.",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const imports = await Import.find();
    res.status(200).json(imports);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching past imports", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedImport = await Import.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedImport);
  } catch (err) {
    res.status(500).json({ error: err, message: "Could not delete import" });
  }
});

export default router;
