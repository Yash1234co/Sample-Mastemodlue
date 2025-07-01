const Sample = require('../Models/Sample');

const createSampleModule = async (req, res) => {
  try {
    const { SampleRef, DueDate, Supplier, SupplierType } = req.body;

    if (!SampleRef || !DueDate || !Supplier || !SupplierType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Sample.findOne({ SampleRef });
    if (existing) return res.status(400).json({ message: "Sample already exists" });

    const due = new Date(DueDate);
    if (due < new Date()) {
      return res.status(400).json({ message: "Due date can't be in the past" });
    }

    const newSample = new Sample({ SampleRef, DueDate, Supplier, SupplierType });
    await newSample.save();

    return res.status(201).json({ message: "Sample created", sample: newSample });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.createSampleModule=createSampleModule