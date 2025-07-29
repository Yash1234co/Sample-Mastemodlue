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


const getSamples = async (req, res) => {
  try {
    const { SampleRef, DueDate, Supplier, SupplierType } = req.query;
    const filter = {};

    if (SampleRef && SampleRef.trim()) filter.SampleRef = SampleRef.trim();
    if (DueDate && DueDate.trim()) filter.DueDate = DueDate.trim();
    if (Supplier && Supplier.trim()) filter.Suplier = Supplier.trim();
    if (SupplierType && SupplierType.trim()) filter.SupplierType = SuplierType.trim();

    const data = await Sample.find(filter)
      .populate('SampleRef', 'name')
      .sort({ createdAt: -1 }); 
    console.log("Filter used:", filter);
    console.log("Result:", data);

    res.status(200).json(data); 
  } catch (err) {
    console.error("Error Fetching data:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.getSamples = getSamples;
exports.createSampleModule=createSampleModule