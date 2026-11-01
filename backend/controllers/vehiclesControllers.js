import Vehicle from "../models/Vehicle.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const getVehicles = async (req, res) => {
  try {
    // Get pagination values from query parameters
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const filters = {};
    if (req.query.make) {
      filters.make = {
        $regex: req.query.make,
        $options: "i",
      };
    }
    if (req.query.model) {
      filters.model = {
        $regex: req.query.model,
        $options: "i",
      };
    }
    if (req.query.year) {
      filters.year = Number(req.query.year);
    }
    if (req.query.minYear || req.query.maxYear) {
      filters.year = {
        ...(req.query.minYear && {
          $gte: Number(req.query.minYear),
        }),
        ...(req.query.maxYear && {
          $lte: Number(req.query.maxYear),
        }),
      };
    }
    if (req.query.fuel_type) {
      filters.fuel_type = req.query.fuel_type;
    }
    if (req.query.transmission) {
      filters.transmission = req.query.transmission;
    }
    if (req.query.body_type) {
      filters.body_type = req.query.body_type;
    }
    if (req.query.source) {
      filters.source = req.query.source;
    }

    // Fetch filtered vehicles and total count
    const [vehicles, totalVehicles] = await Promise.all([
      Vehicle.find(filters)
        .sort({ source: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Vehicle.countDocuments(filters),
    ]);
    const totalPages = Math.ceil(totalVehicles / limit);
    res.status(200).json({
      success: true,
      vehicles,
      pagination: {
        currentPage: page,
        totalPages,
        totalVehicles,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    res.status(500).json({
      message: "Could not retrieve vehicles from server",
    });
  }
};

export const getAllVehicles = async (req, res) => {
  try {
    const filters = {};
    if (req.query.make) {
      filters.make = {
        $regex: req.query.make,
        $options: "i",
      };
    }
    if (req.query.model) {
      filters.model = {
        $regex: req.query.model,
        $options: "i",
      };
    }
    if (req.query.year) {
      filters.year = Number(req.query.year);
    }
    if (req.query.minYear || req.query.maxYear) {
      filters.year = {
        ...(req.query.minYear && {
          $gte: Number(req.query.minYear),
        }),
        ...(req.query.maxYear && {
          $lte: Number(req.query.maxYear),
        }),
      };
    }
    if (req.query.fuel_type) {
      filters.fuel_type = req.query.fuel_type;
    }
    if (req.query.transmission) {
      filters.transmission = req.query.transmission;
    }
    if (req.query.body_type) {
      filters.body_type = req.query.body_type;
    }
    if (req.query.source) {
      filters.source = req.query.source;
    }
    const [vehicles, totalVehicles] = await Promise.all([
      Vehicle.find(filters).sort({ source: 1, createdAt: -1 }),
      Vehicle.countDocuments(filters),
    ]);
    res.status(200).json({
      success: true,
      vehicles,
    });
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    res.status(500).json({
      message: "Could not retrieve vehicles from server",
    });
  }
};

export const getAvailableMakes = async (req, res) => {
  try {
    const makes = await Vehicle.aggregate([
      {
        $group: {
          _id: "$make",
          models: { $addToSet: "$model" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          make: "$_id",
          models: 1,
        },
      },
    ]);

    const availableMakes = {};

    makes.forEach((item) => {
      availableMakes[item.make] = item.models.sort();
    });

    res.status(200).json({
      success: true,
      availableMakes,
    });
  } catch (err) {
    console.error("Failed to fetch available makes:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve available makes",
    });
  }
};

export const getVehicleById = async (req, res) => {
  if (!req.params.id) return;
  try {
    const foundVehicle = await Vehicle.findById(req.params.id);
    res.status(200).json(foundVehicle);
  } catch (err) {
    res.send(500).json({ msg: "Could not get vehicle", error: err });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.deleteMany();
    res.status(200).json({ msg: "all vehicles deleted" });
  } catch (err) {
    res.send(500).json({ msg: "Could not delete vehicles", error: err });
  }
};

export const addVehivle = async (req, res) => {
  const uploadedImages = [];

  try {
    // Require at least one image
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one vehicle image is required",
      });
    }

    // Upload images to Cloudinary
    for (const file of req.files) {
      const uploaded = await uploadToCloudinary(file.buffer);
      uploadedImages.push(uploaded);
    }

    const imageUrls = uploadedImages.map((image) => image.url);
    const vehicle = await Vehicle.create({
      make: req.body.make,
      model: req.body.model,
      year: Number(req.body.year),
      price_usd: Number(req.body.price_usd),
      mileage:
        req.body.mileage === "" || req.body.mileage == null
          ? null
          : Number(req.body.mileage),
      fuel_type: req.body.fuel_type,
      transmission: req.body.transmission,
      body_type: req.body.body_type,
      color: req.body.color,
      engine_capacity:
        req.body.engine_capacity === "" || req.body.engine_capacity == null
          ? null
          : Number(req.body.engine_capacity),
      drive_type: req.body.drive_type,
      thumbUrl: imageUrls[0],
      photos: imageUrls,
      source: "admin",
    });

    res.status(201).json({
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (error) {
    console.error("Vehicle creation failed:", error);

    // Remove uploaded Cloudinary images if saving fails
    await Promise.allSettled(
      uploadedImages.map((image) =>
        cloudinary.uploader.destroy(image.public_id),
      ),
    );

    res.status(500).json({
      message: "Failed to add vehicle",
      error: error.message,
    });
  }
};
