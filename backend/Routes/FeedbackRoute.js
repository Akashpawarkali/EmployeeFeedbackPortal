import express from 'express';
import { createFeedback, deleteFeedback, getFeedbackByCategory, markViewed } from '../Controllers/FeedBackController.js';

const router = express.Router();

router.post("/",createFeedback)
router.get("/",getFeedbackByCategory)
router.patch("/:id/reviewed",markViewed)
router.delete("/:id",deleteFeedback)

export default router;
