import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/dbConnect.js';
import feedbackRoutes from './Routes/FeedbackRoute.js';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectDB();


app.use(cors());
app.use('/api/feedback',feedbackRoutes);