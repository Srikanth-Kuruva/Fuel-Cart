import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/userSchema.js';

export const register = async (req, res) => {
    const { name, email, phone, address, password, accountType, serviceType, pincode, vehicleType, bloodType } = req.body;

    try {
        if (!name || !email || !phone || !address || !password || !accountType || !pincode) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let user;

        if (accountType === "customer") {
            user = await userModel.create({ name, email, phone, password: hashedPassword, accountType, pincode, address });
        } else {
            if (serviceType === "rent") {
                user = await userModel.create({ name, email, phone, password: hashedPassword, accountType, serviceType, pincode, address, vehicleType });
            } else if (serviceType === "bloodDonor") {
                user = await userModel.create({ name, email, phone, password: hashedPassword, accountType, serviceType, pincode, address, bloodType });
            } else {
                user = await userModel.create({ name, email, phone, password: hashedPassword, accountType, serviceType, pincode, address });
            }
        }

        const token = jwt.sign(user.email, "secret");

        res.cookie("token", token);
        return res.status(200).json({ success: true, message: "User registered", user });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error ${error}` });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Something went wrong" });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return res.status(400).json({ success: false, message: "Something went wrong" });
        }

        const token = jwt.sign(user.email, "secret");

        req.user = user;

        res.cookie("token", token);
        return res.status(200).json({ success: true, message: "Logged in successfully", user });

    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error ${error}` });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ success: true, message: `Logged out successfully` });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error ${error}` });
    }
}



export const acceptRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        const request = await requestModel.findByIdAndUpdate(requestId, { status: 'Accepted' });

        // Send email via Nodemailer
        await sendEmail(request.requestedBy.email, 'Request Accepted', 'Your request has been accepted.');

        res.json({ success: true, message: 'Request accepted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to accept request.' });
    }
};

export const declineRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        const request = await requestModel.findByIdAndUpdate(requestId, { status: 'Declined' });

        // Send email via Nodemailer
        await sendEmail(request.requestedBy.email, 'Request Declined', 'Your request has been declined.');

        res.json({ success: true, message: 'Request declined successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to decline request.' });
    }
};

export const getUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, message: "User sent", user: req.user });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
}

