import Feedback from "../Models/FeedbackModel.js";

export const createFeedback=async(req,res)=>{
    try{
        const {text,category}=req.body;
        if(!text){
            return res.status(400).json({message:"Feedback text is required"}); 
           
        }
         if(!category){
                return res.status(400).json({message:"Feedback category is required"}); 
            }
            const feedback = new Feedback({
                text,
                category
            });
            await feedback.save();
            res.status(201).json({message:"Feedback created successfully", feedback});

    }
    catch(error){
        console.error("Error creating feedback:", error);
        res.status(500).json({message:"Internal server error"});
    }
}


export const getFeedbackByCategory = async(req,res)=>{
    const filter = req.query.category ? { category: req.query.category } : {};
    try {
        const feedbacks = await Feedback.find(filter);
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const markViewed =async(req,res)=>{
    try{
        const updated= await Feedback.findByIdAndUpdate(
            req.params.id,
            {reviewed:true},
            {new:true}
        )
        res.json({
            message:"Feedback marked as viewed",
            updated
        });
    }
    catch(error){
        console.error("Error marking feedback as viewed:", error);
        res.status(500).json({message:"Internal server error"});
    }
}



export const deleteFeedback = async (req, res) => {
    try {
        const feedbackId = req.params.id;
        const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);
        
        if (!deletedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        
        res.status(200).json({ message: "Feedback deleted successfully", feedback: deletedFeedback });
    } catch (error) {
        console.error("Error deleting feedback:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}