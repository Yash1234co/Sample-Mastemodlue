import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Sample() {
  const [formData, setFormData] = useState({
    SampleRef: "",
    DueDate: "",
    Supplier: "",
    SupplierType: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [Samples, setSamples] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getData");
        if (res.status === 200) setSamples(res.data);
      } catch (err) {
        setError("Failed to fetch samples");
      }
    };
    fetchSamples();
  }, [showForm]);

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/addsample", {
        ...formData,
        DueDate: new Date(formData.DueDate).toISOString(),
      });
      if (res.status === 201 || res.status === 200) {
        setFormData({ SampleRef: "", DueDate: "", Supplier: "", SupplierType: "" });
        setShowForm(false);
      }
    } catch (err) {
      setError("Failed to create sample");
    }
  };

  return (
    <>
      <div className="overflow-x-auto mt-2 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Sample Ref</th>
              <th className="px-6 py-3 text-left">Due Date</th>
              <th className="px-6 py-3 text-left">Supplier</th>
              <th className="px-6 py-3 text-left">Supplier Type</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Samples.map((sample, index) => (
              <tr key={index}>
                <td className="px-6 py-2">
                  <button
                    onClick={() => navigate(`/sample/${sample._id}/comments`)}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {sample.SampleRef}
                  </button>
                </td>
                <td className="px-6 py-2">
                  {new Date(sample.DueDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-2">{sample.Supplier}</td>
                <td className="px-6 py-2">{sample.SupplierType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons: Add Sample + Back */}
      <div className="mt-6 space-x-2">
        <button
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded"
          onClick={() => setShowForm(true)}
        >
          Add New Sample
        </button>

        <button
          className="bg-gray-300 hover:bg-gray-400 text-black py-3 px-5 rounded"
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
      </div>

  
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Sample</h2>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="SampleRef"
                value={formData.SampleRef}
                onChange={handleChange}
                placeholder="Sample Ref"
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="date"
                name="DueDate"
                value={formData.DueDate}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <select
                name="Supplier"
                value={formData.Supplier}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Supplier</option>
                <option value="ABC Textiles">ABC Textiles</option>
                <option value="Global Fabrics Ltd">Global Fabrics Ltd</option>
              </select>
              <input
                type="text"
                name="SupplierType"
                value={formData.SupplierType}
                onChange={handleChange}
                placeholder="Supplier Type"
                required
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-red-100 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
