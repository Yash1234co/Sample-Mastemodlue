
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "./ProductContext"; // import context

export default function Product() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    ProductName: "",
    Category: "",
    Brand: "",
    ProductType: "",
  });

  const {
    autoGenerate,
    setAutoGenerate,
    productCode,
    setProductCode,
  } = useProductContext();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [brands, setBrands] = useState([]);
  const [productType, setProductType] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getBrand");
        setBrands(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError("Failed to fetch Brands");
      }
    };

    const fetchProductTypes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getProductType");
        const types = Array.isArray(res.data) ? res.data : [];
        setProductType(types);
      } catch (err) {
        setError("Failed to fetch Product Types");
      }
    };

    fetchBrands();
    fetchProductTypes();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [showForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        autoGenerate,
        productCode: productCode || null,
      };

      const res = await axios.post("http://localhost:3000/createProduct", payload);

      if (res.status === 200) {
        setSuccess("Product created successfully.");
        setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
        setProductCode("");
        setShowForm(false);
        fetchProducts();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-blue-700 text-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Product Manager</h1>
          <div className="space-x-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
            >
              + Add Product
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Table */}
      <main className="pt-28 px-6">
        <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
          <table className="min-w-full divide-y divide-gray-300 text-sm">
            <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Product Code</th>
                <th className="px-6 py-3 text-left">Product Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Brand</th>
                <th className="px-6 py-3 text-left">Product Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{product?.productCode?.code || "—"}</td>
                    <td className="px-6 py-4">{product?.ProductName || "—"}</td>
                    <td className="px-6 py-4">{product?.Category || "—"}</td>
                    <td className="px-6 py-4">{product?.Brand?.name || "—"}</td>
                    <td className="px-6 py-4">{product?.ProductType?.name || "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Add New Product</h2>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="ProductName"
                value={formData.ProductName}
                onChange={handleChange}
                placeholder="Product Name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />

              <select
                name="Brand"
                value={formData.Brand}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option value={brand._id} key={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>

              <select
                name="ProductType"
                value={formData.ProductType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="">Select Product Type</option>
                {productType.map((pt) => (
                  <option value={pt._id} key={pt._id}>
                    {pt.name}
                  </option>
                ))}
              </select>

              {autoGenerate ? (
                <input
                  type="text"
                  value={productCode}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
                />
              ) : (
                <input
                  type="text"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  placeholder="Enter Product Code"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              )}

              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100"
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
