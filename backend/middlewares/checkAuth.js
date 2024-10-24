import jwt from 'jsonwebtoken';
import userModel from '../models/userSchema.js';

export const checkAuth = async (req, res, next) => {
    const token = req.cookies.token; 
    // console.log("Token received:", token);
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, "secret");
        // console.log("Decoded token:", decoded);
        req.user = await userModel.findOne({ email: decoded });
        if (!req.user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

