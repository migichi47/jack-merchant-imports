import { Router } from "express";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

const router = Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const admin = await Admin.findOne({
      username: username.trim(),
    });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Prevent session fixation
    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({
          message: "Could not create session",
        });
      }

      req.session.adminId = admin._id.toString();

      req.session.save((err) => {
        if (err) {
          return res.status(500).json({
            message: "Could not save session",
          });
        }

        return res.json({
          message: "Login successful",
          admin: {
            id: admin._id,
            username: admin.username,
            role: admin.role,
          },
        });
      });
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "An error occurred during login",
    });
  }
});

export default router;
