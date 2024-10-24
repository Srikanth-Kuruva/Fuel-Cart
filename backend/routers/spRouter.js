import express from 'express';
import { fetchRequests,
    acceptRequest,
    declineRequest,
 } from '../controllers/requestController.js';
import { checkAuth } from '../middlewares/checkAuth.js';


const router = express.Router();

router.get("/fetchrequests", checkAuth, fetchRequests);
router.post('/accept', acceptRequest);
router.post('/decline', declineRequest);

export default router;
