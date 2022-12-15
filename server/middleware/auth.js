import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) return res.status(403).json({ message: "Access Denied." });

    if (token.startsWith("Bearer "))
      token = token.slice(7, token.length).trimLeft();

    const verfied = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = verfied;
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
