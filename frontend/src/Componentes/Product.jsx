import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [Showform, setShowform] = useState(false);
  const [formdata, setformdata] = useState({
    ProductName: "",
    Category: "",
    Brand: "",
    ProductType: "",
  });
  const [Products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        if (res.status === 200) {
          const data = res.data;
          const productArray = Array.isArray(data)
            ? data
            : data.products || [];
          setProducts(productArray);
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("Failed to fetch products");
      }
    };
    fetchProducts();
  }, [Showform]);

  function handleChnage(e) {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  }

  async function handlesubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/createProduct", formdata);
      if (res.status === 200) {
        setformdata({
          ProductName: "",
          Category: "",
          Brand: "",
          ProductType: "",
        });
        setShowform(false);
      }
    } catch (err) {
      setError("Failed to create product");
    }
  }

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-blue-700 text-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Product Manager</h1>
          <div className="space-x-4">
            <button
              onClick={() => setShowform(!Showform)}
              className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition"
            >
              + Add Product
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition"
            >
              Back
            </button>
          </div>
        </div>
      </header>
       d.
      {/* Table */}
      <main className="pt-28 px-6">
        <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
          <table className="min-w-full divide-y divide-gray-300 text-sm">
            <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Product Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Brand</th>
                <th className="px-6 py-3 text-left">Product Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(Products) && Products.length > 0 ? (
                Products.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{product.ProductName}</td>
                    <td className="px-6 py-4">{product.Category}</td>
                    <td className="px-6 py-4">{product.Brand}</td>
                    <td className="px-6 py-4">{product.ProductType}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-center text-gray-500" colSpan="4">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {Showform && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[22rem]">
            <h2 className="text-xl font-bold text-center mb-4">Add New Product</h2>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <form onSubmit={handlesubmit} className="space-y-3">
              <input
                type="text"
                name="ProductName"
                value={formdata.ProductName}
                onChange={handleChnage}
                placeholder="Product Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="Category"
                value={formdata.Category}
                onChange={handleChnage}
                placeholder="Category"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="Brand"
                value={formdata.Brand}
                onChange={handleChnage}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Brand</option>
                <option value="Adidas">Adidas</option>
                <option value="Nike">Nike</option>
                <option value="Puma">Puma</option>
              </select>
              <select
                name="ProductType"
                value={formdata.ProductType}
                onChange={handleChnage}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Product Type</option>
                <option value="Shoes">Shoes</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
              </select>
              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowform(false)}
                  className="w-full border border-gray-400 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition"
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
