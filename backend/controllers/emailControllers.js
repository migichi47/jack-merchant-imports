import emailLog from "../models/emailLog.js";

export const getEmails = async (req, res) => {
  try {
    const emails = await emailLog.find().sort({ createdAt: -1 }).lean();

    res.json({ emails });
  } catch (error) {
    console.error("Failed to fetch emails:", error);

    res.status(500).json({
      message: "Could not retrieve email history",
    });
  }
};
