import express from 'express';
import customerRouter from './routers/customerRouter.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true, // Enable credentials
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/customer', customerRouter); // Ensure this line is present

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
