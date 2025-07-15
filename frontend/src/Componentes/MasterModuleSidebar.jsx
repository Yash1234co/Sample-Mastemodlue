
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");

        if (res.status === 200) {
          const data = res.data;
          const productArray = Array.isArray(data) ? data : data.Products || [];
          setProducts(productArray);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-slate-900 text-white shadow-lg z-40">
        <div className="flex flex-col px-4 py-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Dashboard</h2>

          <button
            className="bg-slate-100 text-slate-900 font-semibold rounded-lg px-4 py-2 hover:bg-slate-700 hover:text-white transition-all duration-200"
            onClick={() => navigate("/products")}
          >
            Products{" "}
            <span className="text-sm text-gray-500 ml-1">({products.length})</span>
          </button>

          <button
            className="bg-slate-100 text-slate-900 font-semibold rounded-lg px-4 py-2 hover:bg-slate-700 hover:text-white transition-all duration-200"
            onClick={() => navigate("/sample")}
          >
            Sample
          </button>

          <button
            className="bg-slate-100 text-slate-900 font-semibold rounded-lg px-4 py-2 hover:bg-slate-700 hover:text-white transition-all duration-200"
            onClick={() => navigate("/System")}
          >
            System Master
          </button>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </div>
      </aside>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-16 bg-slate-800 text-white shadow-md z-50 flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold">My Admin Panel</h1>
      </header>

      {/* Main Content */}
      <main className="ml-64 w-full pt-24 px-8">
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-300">
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
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{product?.productCode?.code || "—"}</td>
                    <td className="px-6 py-4">{product.ProductName}</td>
                    <td className="px-6 py-4">{product.Category}</td>
                    <td className="px-6 py-4">
                      {product.Brand?.name || product.Brand || "—"}
                    </td>
                    <td className="px-6 py-4">
                      {product.ProductType?.name || product.ProductType || "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-center text-gray-500" colSpan="5">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
