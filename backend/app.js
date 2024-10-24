import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './database/connectDB.js';
import userRouter from './routers/userRouter.js';
import customerRouter from './routers/customerRouter.js';
import spRouter from './routers/spRouter.js';
import helplineRouter from './routers/helplineRouter.js'; // Ensure you use the correct path


const app = express();
// Middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
// CORS Configuration
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));

// Routes
app.use('/helpline', helplineRouter);
app.use("/user", userRouter); 
app.use("/customer", customerRouter);
app.use("/sp", spRouter); 

// Connect to MongoDB
connectDB();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
