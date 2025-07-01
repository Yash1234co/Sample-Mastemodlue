const Sample = require('../Models/Sample');

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

module.exports = { getSamples };
