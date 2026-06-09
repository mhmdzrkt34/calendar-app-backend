import jwt from "jsonwebtoken";

export const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.context.user = decoded;
        return next();
    } catch {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
};
