import express from "express";
import Import from "../models/pastImports.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// POST /api/imports
router.post("/", requireAuth, async (req, res) => {
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

router.get("/:id", async (req, res) => {
  try {
    const pastImport = await Import.findById(req.params.id);
    res.status(200).json(pastImport);
  } catch (err) {
    res.status(404).json({ msg: "Could not fetch import", error: err });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deletedImport = await Import.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedImport);
  } catch (err) {
    res.status(500).json({ error: err, message: "Could not delete import" });
  }
});

router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = ["make", "model", "year", "description", "imageUrl"];

    // Only accept fields that can be updated
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update",
      });
    }

    // Validate MongoDB ObjectId
    if (!/^[a-f\d]{24}$/i.test(id)) {
      return res.status(400).json({
        message: "Invalid import ID",
      });
    }

    const updatedImport = await Import.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedImport) {
      return res.status(404).json({
        message: "Past import not found",
      });
    }

    return res.status(200).json({
      message: "Past import updated successfully",
      pastImport: updatedImport,
    });
  } catch (error) {
    console.error("Update past import error:", error);

    return res.status(500).json({
      message: "Failed to update past import",
    });
  }
});

export default router;
