import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.authHeaders["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "Access Denied. No token provided.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json("Invalid Token")
    }
};
