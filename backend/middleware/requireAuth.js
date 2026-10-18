const requireAuth = (req, res, next) => {
  if (!req.session?.adminId) {
    return res.status(401).json({
      message: "Please log in to continue",
    });
  }

  next();
};

export default requireAuth;
