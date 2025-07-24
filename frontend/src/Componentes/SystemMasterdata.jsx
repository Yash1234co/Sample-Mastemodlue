
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "./ProductContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SystemMaster() {
  const [brands, setbrands] = useState([]);
  const [error, setError] = useState("");
  const [brandname, setbrandname] = useState("");
  const [brandShortname, setbrandShortName] = useState("");
  const [ShowForm, setShowForm] = useState(false);

  const [productType, setproductType] = useState([]);
  const [productTypename, setproductTypename] = useState("");
  const [shortProductTypeName, setShortproductTypeName] = useState("");
  const [showformType, setShowFormType] = useState(false);

  const [isExpandedBrand, setIsExpandedBrand] = useState(true);
  const [isExpandedProductType, setIsExpandedProductType] = useState(true);

  const { autoGenerate, setAutoGenerate, productCode, setProductCode } = useProductContext();
  const [loadingCode, setLoadingCode] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [editingShortnames, setEditingShortnames] = useState({});
  const [editingTypeShortnames, setEditingTypeShortnames] = useState({});



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
    if (autoGenerate) {
      if (brands.length > 0) {
        const lastBrand = brands[brands.length - 1];
        setSelectedBrandId(lastBrand._id);
      }
      if (productType.length > 0) {
        const lastType = productType[productType.length - 1];
        setSelectedTypeId(lastType._id);
      }
    } else {
      setProductCode("");
      setSelectedBrandId("");
      setSelectedTypeId("");
    }
  }, [autoGenerate, brands, productType]);

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
      const trimmedName = brandname.trim();
      if (!trimmedName) return toast.error("Brand name cannot be empty");

      const payload = {
        name: trimmedName,
        shortname: brandShortname.trim()
      };

      await axios.post("http://localhost:3000/createBrand", payload);

      await fetchbrands(); // <-- THIS ENSURES shortname is retrieved from DB

      setbrandname("");
      setbrandShortName("");
      setShowForm(false);
    } catch (err) {
      console.error("Add Brand Error:", err);
      setError("Failed to add Brand");
    }
  };



  const addProductType = async () => {
    try {
      const payload = {
        name: productTypename.trim(),
      };

      if (shortProductTypeName.trim()) {
        payload.shortname = shortProductTypeName.trim();
      }

      await axios.post("http://localhost:3000/createProductType", payload);
      await fetchProductType();
      setproductTypename("");
      setShortproductTypeName("");
      setShowFormType(false);
    } catch (err) {
      console.error("Add Product Type Error:", err);
      setError("Failed to add Product Type");
    }
  };

 
  const handleShortNameSave = async (brand) => {
    try {
      await axios.put(`http://localhost:3000/updateBrand/${brand._id}`, {
        shortname: brand.shortname,
      });

      toast.success("Short name saved!");

      // Clear editing state for this brand
      setEditingShortnames((prev) => {
        const updated = { ...prev };
        delete updated[brand._id];
        return updated;
      });

      // Refresh list to reflect new state
      await fetchbrands();
    } catch (error) {
      console.error("Error saving short name:", error);
      toast.error("Failed to save short name");
    }
  };

  const handleProductTypeShortNameSave = async (type) => {
    try {
      await axios.put(`http://localhost:3000/updateProductType/${type._id}`, {
        shortname: type.shortname,
      });

      toast.success("Product Type short name saved!");

      setEditingTypeShortnames((prev) => {
        const updated = { ...prev };
        delete updated[type._id];
        return updated;
      });

      await fetchProductType();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Product Type short name.");
    }
  };


  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

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

      <div className="pt-24 px-4">
        <div className="flex flex-wrap justify-center gap-6">

          {/* Brands */}
          <div className="w-full md:w-[320px] border rounded shadow bg-white">
            <div className="flex justify-between items-center px-4 py-3 bg-gray-200 border-b">
              <h2 className="text-lg font-semibold">Brands</h2>
              <div className="flex gap-2">
                <button onClick={() => setShowForm((prev) => !prev)} className="text-xl font-bold px-2 py-1 rounded hover:bg-gray-400 transition">+</button>
                <button onClick={() => setIsExpandedBrand((prev) => !prev)} className="text-lg transition-transform" style={{ transform: isExpandedBrand ? "rotate(0deg)" : "rotate(180deg)" }}>▲</button>
              </div>
            </div>

            {isExpandedBrand && (
              <div className="px-4 py-2 space-y-2">
                {brands.map((brand) => (
                  <div
                    key={brand._id}
                    className="p-2 bg-gray-100 border rounded shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <div className="flex items-center gap-4 w-full justify-between">
                      {/* Brand Name on the left */}
                      <span className="font-medium">{brand.name}</span>

                      {/* Shortname or Input on the right */}
                      {brand.shortname ? (
                        <span className="text-gray-600">{brand.shortname}</span>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingShortnames[brand._id] || ""}
                            onChange={(e) =>
                              setEditingShortnames((prev) => ({
                                ...prev,
                                [brand._id]: e.target.value,
                              }))
                            }
                            placeholder="Shortname"
                            className="border rounded px-2 py-1 text-sm w-[100px] sm:w-[120px]"
                          />
                          <button
                            onClick={() =>
                              handleShortNameSave(
                                { ...brand, shortname: editingShortnames[brand._id] || "" },
                                true
                              )
                            }
                            className="bg-blue-500 text-white px-2 py-1 text-sm rounded"
                          >
                            Save
                          </button>
                        </div>
                      )}

                    </div>
                  </div>
                ))}


              </div>
            )}

            {ShowForm && (
              <div className="px-4 py-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border rounded"
                    placeholder="Enter Brand name"
                    value={brandname}
                    onChange={(e) => {
                      setbrandname(e.target.value);
                      if (error) setError("");
                    }}
                  />
                  <input
                    type="text"
                    className="w-[100px] px-3 py-2 border rounded"
                    placeholder="Short (optional)"
                    value={brandShortname}
                    onChange={(e) => setbrandShortName(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={addBrand}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setbrandname("");
                      setbrandShortName("");
                    }}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Product Type */}
          <div className="w-full md:w-[320px] border rounded shadow bg-white">
            <div className="flex justify-between items-center px-4 py-3 bg-gray-200 border-b">
              <h2 className="text-lg font-semibold">Product Type</h2>
              <div className="flex gap-2">
                <button onClick={() => setShowFormType((prev) => !prev)} className="text-xl font-bold px-2 py-1 rounded hover:bg-gray-400 transition">+</button>
                <button onClick={() => setIsExpandedProductType((prev) => !prev)} className="text-lg transition-transform" style={{ transform: isExpandedProductType ? "rotate(0deg)" : "rotate(180deg)" }}>▲</button>
              </div>
            </div>

            {isExpandedProductType && (
              <div className="px-4 py-2 space-y-2">
                {productType.map((type) => (
                  <div key={type._id} className="p-2 bg-gray-100 border rounded shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="w-1/2 text-gray-800">{type.name}</div>

                    {type.shortname ? (
                      <span className="text-gray-600">{type.shortname}</span>
                    ) : (
                      <>
                        <input
                          type="text"
                          className="border border-gray-300 px-2 py-1 rounded w-[120px] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Short Name"
                          value={editingTypeShortnames[type._id] || ""}
                          onChange={(e) =>
                            setEditingTypeShortnames((prev) => ({
                              ...prev,
                              [type._id]: e.target.value,
                            }))
                          }
                        />
                        <button
                          onClick={() =>
                            handleProductTypeShortNameSave({
                              ...type,
                              shortname: editingTypeShortnames[type._id] || "",
                            })
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Save
                        </button>
                      </>
                    )}
                  </div>
                ))}

              </div>
            )}

            {showformType && (
              <div className="px-4 py-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border rounded"
                    placeholder="Enter Product Type"
                    value={productTypename}
                    onChange={(e) => {
                      setproductTypename(e.target.value);
                      if (error) setError("");
                    }}
                  />
                  {productTypename.trim() !== "" && (
                    <input
                      type="text"
                      className="w-[100px] px-3 py-2 border rounded"
                      placeholder="Short"
                      value={shortProductTypeName}
                      onChange={(e) => setShortproductTypeName(e.target.value)}
                    />
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <button onClick={addProductType} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Save</button>
                  <button onClick={() => { setShowFormType(false); setproductTypename(""); setShortproductTypeName(""); }} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition">Cancel</button>
                </div>
              </div>
            )}
          </div>

          {/* Auto Product Code */}
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







