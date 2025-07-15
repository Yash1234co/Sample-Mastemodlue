
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "./ProductContext";

export default function SystemMaster() {
  const [brands, setbrands] = useState([]);
  const [error, setError] = useState("");
  const [brandname, setbrandname] = useState("");
  const [ShowForm, setShowForm] = useState(false);

  const [productType, setproductType] = useState([]);
  const [prodcttypename, setproductTypename] = useState("");
  const [showformType, setShowFormType] = useState(false);

  const [isExpandedBrand, setIsExpandedBrand] = useState(true);
  const [isExpandedProductType, setIsExpandedProductType] = useState(true);

  const { autoGenerate, setAutoGenerate, productCode, setProductCode } = useProductContext();
  const [loadingCode, setLoadingCode] = useState(false);

  const navigate = useNavigate();

  const fetchbrands = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getBrand");
      const data = res.data;
      const brandasarray = Array.isArray(data.brands) ? data.brands : Array.isArray(data) ? data : [];
      setbrands(brandasarray);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch Brands");
    }
  };

  const fetchProductType = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getProductType");
      const data = res.data;
      const productTypearray = Array.isArray(data.producttype) ? data.producttype : Array.isArray(data) ? data : [];
      setproductType(productTypearray);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch Product Types");
    }
  };

  useEffect(() => {
    fetchbrands();
    fetchProductType();
  }, []);

  useEffect(() => {
    const fetchProductCode = async () => {
      if (autoGenerate) {
        setLoadingCode(true);
        try {
          const res = await axios.get("http://localhost:3000/getProductCode");
          setProductCode(res.data.code);
          setError("");
        } catch (err) {
          console.error("Error fetching product code:", err);
          setError("Failed to generate product code");
        } finally {
          setLoadingCode(false);
        }
      } else {
        setProductCode("");
      }
    };
    fetchProductCode();
  }, [autoGenerate, setProductCode]);

  const addBrand = async () => {
    try {
      const res = await axios.post("http://localhost:3000/createBrand", {
        name: brandname.trim(),
      });
      const newBrand = res.data.brand || res.data.createBrand;
      if (newBrand && newBrand.name && newBrand._id) {
        setbrands((prev) => [...prev, newBrand]);
      } else {
        fetchbrands();
      }
      setbrandname("");
      setShowForm(false);
    } catch (err) {
      console.error("Add Brand Error:", err);
      setError("Failed to add Brand");
    }
  };

  const addProductType = async () => {
    try {
      await axios.post("http://localhost:3000/createProductType", {
        name: prodcttypename.trim(),
      });
      await fetchProductType();
      setproductTypename("");
      setShowFormType(false);
    } catch (err) {
      console.error("Add Product Type Error:", err);
      setError("Failed to add Product Type");
    }
  };

  const handlecancel = () => {
    setShowForm(false);
    setbrandname("");
    setError("");
  };

  const handleProductType = () => {
    setShowFormType(false);
    setproductTypename("");
    setError("");
  };

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-blue-700 text-white z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-800"
          >
            ← Back
          </button>
          <h1 className="text-lg font-bold">System Master</h1>
          <div></div>
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 px-4">
        <div className="flex flex-wrap justify-center gap-6">

          {/* Brand Card */}
          <div className="w-full md:w-[320px] border rounded shadow bg-white">
            <div className="flex justify-between items-center px-4 py-3 bg-gray-200 border-b">
              <h2 className="text-lg font-semibold">Brands</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowForm((prev) => !prev)}
                  className="text-xl font-bold px-2 py-1 rounded hover:bg-gray-400 transition"
                >
                  +
                </button>
                <button
                  onClick={() => setIsExpandedBrand((prev) => !prev)}
                  className="text-lg transform transition-transform"
                  style={{ transform: isExpandedBrand ? "rotate(0deg)" : "rotate(180deg)" }}
                >
                  ▲
                </button>
              </div>
            </div>

            {isExpandedBrand && (
              <div className="px-4 py-2 space-y-2">
                {brands.map((brand) => (
                  <div key={brand._id} className="p-2 bg-gray-100 border rounded shadow-sm">
                    {brand.name}
                  </div>
                ))}
              </div>
            )}

            {ShowForm && (
              <div className="px-4 py-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded focus:outline-none"
                  placeholder="Enter Brand name"
                  value={brandname}
                  onChange={(e) => {
                    setbrandname(e.target.value);
                    if (error) setError("");
                  }}
                />
              </div>
            )}

            <div className="flex justify-end gap-2 px-4 py-2">
              <button
                onClick={addBrand}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
              <button
                onClick={handlecancel}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Product Type Card */}
          <div className="w-full md:w-[320px] border rounded shadow bg-white">
            <div className="flex justify-between items-center px-4 py-3 bg-gray-200 border-b">
              <h2 className="text-lg font-semibold">Product Type</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFormType((prev) => !prev)}
                  className="text-xl font-bold px-2 py-1 rounded hover:bg-gray-400 transition"
                >
                  +
                </button>
                <button
                  onClick={() => setIsExpandedProductType((prev) => !prev)}
                  className="text-lg transform transition-transform"
                  style={{ transform: isExpandedProductType ? "rotate(0deg)" : "rotate(180deg)" }}
                >
                  ▲
                </button>
              </div>
            </div>

            {isExpandedProductType && (
              <div className="px-4 py-2 space-y-2">
                {productType.map((type) => (
                  <div key={type._id} className="p-2 bg-gray-100 border rounded shadow-sm">
                    {type.name}
                  </div>
                ))}
              </div>
            )}

            {showformType && (
              <div className="px-4 py-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded focus:outline-none"
                  placeholder="Enter Product Type"
                  value={prodcttypename}
                  onChange={(e) => {
                    setproductTypename(e.target.value);
                    if (error) setError("");
                  }}
                />
              </div>
            )}

            <div className="flex justify-end gap-2 px-4 py-2">
              <button
                onClick={addProductType}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
              <button
                onClick={handleProductType}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Auto Product Code Card (Switch Inside Card Body) */}
          <div className="w-full md:w-[320px] border rounded shadow bg-white">
            <div className="px-4 py-4">
              <h2 className="text-lg font-semibold mb-3">Auto Product Code</h2>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-700">Enable Auto Generate</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={autoGenerate}
                    onChange={() => setAutoGenerate((prev) => !prev)}
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative transition">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>

              {autoGenerate && (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preview Code</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-900"
                    value={productCode}
                    readOnly
                  />
                  {loadingCode && <p className="text-blue-500 text-sm mt-1">Generating code...</p>}
                  {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
