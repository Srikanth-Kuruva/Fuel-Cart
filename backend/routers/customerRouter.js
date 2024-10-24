import express from 'express';
import { checkAuth } from '../middlewares/checkAuth.js';
import requestModel from '../models/requestSchema.js';
import { 
    fetchServiceProviders, 
    fetchProfile, 
    storeRequest, 
    fetchRequests, 
    acceptRequest, 
    declineRequest 
} from '../controllers/requestController.js';


const router = express.Router();

// Protected Routes
router.post("/fetchsp", checkAuth, fetchServiceProviders);
router.post("/spprofile", checkAuth, fetchProfile);
router.post("/servicerequest", checkAuth, storeRequest);
router.get('/fetchrequests', checkAuth, fetchRequests); 
router.post('/accept', acceptRequest);
router.post('/decline', declineRequest);

export default router;
