import requestModel from '../models/requestSchema.js';
import userModel from '../models/userSchema.js';
import nodemailer from 'nodemailer'

// Fetch service providers based on service type
export const fetchServiceProviders = async (req, res) => {
    const { service, bloodType } = req.body; // Extract bloodType from request body
    try {
        // Create a base query with the service type
        let query = { serviceType: service };

        // If the service is 'blood' and a bloodType is provided, add it to the query
        if (service === 'blood' && bloodType) {
            query.bloodType = bloodType;
        }

        // Find service providers based on the constructed query
        const serviceProviders = await userModel.find(query);

        return res.status(200).json({
            success: true,
            message: "Service providers fetched",
            serviceProviders
        });
    } catch (error) {
        console.error('Error fetching service providers:', error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};


// Fetch user profile by ID
export const fetchProfile = async (req, res) => {
    const { userId } = req.body;
    try {
        const profile = await userModel.findById(userId);
        if (!profile) {
            return res.status(404).json({ success: false, message: "User profile not found" });
        }
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            profile
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export const fetchRequests = async (req, res) => {
    console.log('Fetching requests for:', req.user._id);
    try {
        const requests = await requestModel.find({ requestedTo: req.user._id })
            .populate('requestedBy', 'name phone email') // Populate only requestedBy with necessary fields
            .exec();

        return res.status(200).json({
            success: true,
            requests,
        });
    } catch (error) {
        console.error('Error fetching requests:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch requests.',
            error: error.message,
        });
    }
};


export const storeRequest = async (req, res) => {
    console.log('Received request body:', req.body); 

    try {
        const { requestedTo, requestType, message } = req.body; 
        if (!requestedTo || !requestType || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const request = await requestModel.create({
            requestedTo,           
            requestedBy: req.user._id, 
            requestType,
            message,
            customer: req.user._id, 
        });
        console.log('Request created:', request);
        return res.status(201).json({ success: true, message: "Request successful", request });
    } catch (error) {
        console.error('Error saving request:', error); 
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};



// Accept a service request
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, 
    secure: false,
    auth: {
        user: 'fuelcart.2025@gmail.com', 
        pass: 'hufo qyom vvjg mftv',  
    },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'fuelcart.2025@gmail.com', // Sender address
            to,                            // Recipient email
            subject,                       // Subject line
            text,                          // Plain text body
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

// Accept a service request
export const acceptRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        console.log('Request ID to accept:', requestId);

        const request = await requestModel.findByIdAndUpdate(requestId, { status: 'Accepted' }, { new: true })
            .populate('requestedBy', 'email'); // Populate requestedBy with email

        if (!request) {
            return res.status(404).json({ success: false, message: 'Request not found.' });
        }

        const recipientEmail = request.requestedBy?.email;
        console.log('Customer email:', recipientEmail);

        if (!recipientEmail) {
            return res.status(400).json({ success: false, message: 'Customer email not found.' });
        }

        // Send the email for acceptance
        const subject = 'Request Accepted';
        const text = 'Your service request has been accepted. \n Our service provider will contact you soon!...';
        await sendEmail(recipientEmail, subject, text); // Send email directly

        return res.json({ success: true, message: 'Request accepted successfully and email sent.' });
    } catch (error) {
        console.error('Error accepting request:', error);
        return res.status(500).json({ success: false, message: 'Failed to accept request.', error: error.message });
    }
};

// Decline a service request
export const declineRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        console.log('Request ID to decline:', requestId);

        // Find the request and mark it as "Declined"
        const request = await requestModel.findByIdAndUpdate(requestId, { status: 'Declined' }, { new: true })
            .populate('requestedBy', 'email'); // Populate requestedBy with email

        if (!request) {
            return res.status(404).json({ success: false, message: 'Request not found.' });
        }

        const recipientEmail = request.requestedBy?.email;
        console.log('Customer email:', recipientEmail);

        if (!recipientEmail) {
            return res.status(400).json({ success: false, message: 'Customer email not found.' });
        }

        // Send the email for declining the request
        const subject = 'Request Declined';
        const text = 'Sorry, your request has been declined. Please try another service provider.';
        await sendEmail(recipientEmail, subject, text); // Send email directly

        // After sending the email, delete the request
        const deletedRequest = await requestModel.findByIdAndDelete(requestId);
        if (!deletedRequest) {
            return res.status(404).json({ success: false, message: 'Request not found or already deleted.' });
        }

        return res.status(200).json({ success: true, message: 'Request declined, email sent, and request deleted.' });
    } catch (error) {
        console.error('Error declining request:', error);
        return res.status(500).json({ success: false, message: 'Failed to decline request.', error: error.message });
    }
};
