const Comments = require('../Models/Comments')


const addComments = async (req, res) => {
    try {
        const { Sample, text } = req.body;
        if (!text) {
            return res.status(400).json({ message: "Please fil Comment section " })
        }

        const AddComments = new Comments({
            Sample,
            text
        })
        await AddComments.save()
        res.status(200).json({ message: "Comments add sucessfully", comment: AddComments })
    }
    catch (err) {
        console.error("Error are here");
        res.status(500).json({ message: "Featching error", error: err.message })
    }
}


const getComnents= async(req,res)=>{
    const {sampleId}=req.params
    try{
        const comments=await Comments.find({Sample:sampleId})
        .sort({createdAt:-1})
        .populate('Sample','SampleRef DueDate Supplier')

        res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err.message });
  }
};
exports.getComnents=getComnents
exports.addComments = addComments