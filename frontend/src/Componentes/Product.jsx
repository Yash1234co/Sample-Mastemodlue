

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "./ProductContext";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductImageUploader from "./ProductImageController"; // Ensure this filename is correct

export default function Product() {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    ProductName: "",
    Category: "",
    Brand: "",
    ProductType: "",
  });

  const { autoGenerate, productCode, setProductCode } = useProductContext();

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productType, setProductType] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState('table');
  
  const autoPrefixRef = useRef("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
        try {
            const [brandsRes, typesRes, productsRes] = await Promise.all([
                axios.get("http://localhost:3000/getBrand"),
                axios.get("http://localhost:3000/getProductType"),
                axios.get("http://localhost:3000/products")
            ]);
            setBrands(Array.isArray(brandsRes.data) ? brandsRes.data : []);
            setProductType(Array.isArray(typesRes.data) ? typesRes.data : []);
            setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
        } catch (error) {
            toast.error("Failed to load initial data.");
            console.error("Data Fetch Error:", error);
        }
    };
    fetchInitialData();
  }, []);
  
  useEffect(() => {
    if (autoGenerate && isEditing) return;

    const selectedBrand = brands.find((b) => b._id === formData.Brand);
    const selectedType = productType.find((pt) => pt._id === formData.ProductType);
    
    setProductCode(prevCode => {
        let prefix;
        if (autoGenerate && !isEditing) {
            prefix = autoPrefixRef.current;
        } else {
            prefix = prevCode.split('-')[0] || "";
        }

        if (!prefix) return prevCode;

        const brandShort = selectedBrand?.shortname || "";
        const typeShort = selectedType?.shortname || "";

        const newParts = [prefix, brandShort, typeShort].filter(Boolean);
        return newParts.join("-");
    });

  }, [formData.Brand, formData.ProductType, autoGenerate, isEditing, brands, productType, setProductCode]);
  
  const fetchProducts = async () => {
    try {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(Array.isArray(res.data) ? res.data : []);
    } catch(error) {
        toast.error("Failed to fetch products.");
        console.error("Fetch Products Error:", error);
    }
  };

  const handleProductCodeChange = (e) => {
    setProductCode(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim()) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setIsEditing(true);
    setShowEditForm(true);
    const brandId = product.Brand?._id || product.Brand;
    const typeId = product.ProductType?._id || product.ProductType;
    setFormData({
      ProductName: product.ProductName,
      Category: product.Category,
      Brand: brandId,
      ProductType: typeId,
    });
    setProductCode(product.productCode?.code || "");
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = { id: editId, ...formData, productCode };
      const res = await axios.put("http://localhost:3000/updateProduct", payload);
      toast.success(res.data.message || "Product updated successfully.");
      setShowEditForm(false);
      fetchProducts();
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.ProductName.trim()) errors.ProductName = "Product Name is required";
    if (!formData.Category.trim()) errors.Category = "Category is required";
    if (!formData.Brand) errors.Brand = "Brand is required";
    if (!formData.ProductType) errors.ProductType = "Product Type is required";
    if (!productCode.trim()) errors.productCode = "Product Code is required";
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    
    const isDuplicateName = products.some(
        (p) => p.ProductName.trim().toLowerCase() === formData.ProductName.trim().toLowerCase()
    );
    if (isDuplicateName) {
        toast.error("A product with this name already exists.");
        return;
    }

    const isDuplicateCombination = products.some(
        (p) => (p.Brand?._id || p.Brand) === formData.Brand && (p.ProductType?._id || p.ProductType) === formData.ProductType
    );
    if (isDuplicateCombination) {
        toast.error("A product with the same Brand and Product Type already exists.");
        return;
    }

    try {
      const payload = { ...formData, productCode, autoGenerate };
      const res = await axios.post("http://localhost:3000/createProduct", payload);
      toast.success("Product created successfully.");
      setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
      setProductCode("");
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create product");
    }
  };

  const handleAddProductClick = async () => {
    setIsEditing(false);
    setFormErrors({});
    setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
    autoPrefixRef.current = "";

    if (autoGenerate) {
        try {
            const res = await axios.get("http://localhost:3000/getProductCode");
            const prefix = res.data.code;
            autoPrefixRef.current = prefix;
            setProductCode(prefix + "-"); 
        } catch (err) {
            toast.error("Failed to fetch product code prefix");
            setProductCode("");
        }
    } else {
        setProductCode("");
    }
    setShowForm(true);
  };
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
      {/* <ToastContainer /> was REMOVED from here to fix the error */}
      <header className="fixed top-0 left-0 w-full bg-blue-700 text-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Product Manager</h1>
          <div className="space-x-4">
            <button 
             onClick={()=>setView(v => v === 'table' ? 'grid' : 'table')}
             className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100">
               {view === 'table' ? 'Grid View' : 'Table View'}
            </button>
            <button
              onClick={handleAddProductClick}
              className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
            >
              + Add Product
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      <main className="pt-28 px-6">
        {view === 'table' ? (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
            <table className="min-w-full divide-y divide-gray-300 text-sm">
              <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Product Image</th>
                  <th className="px-6 py-3 text-left">Product Code</th>
                  <th className="px-6 py-3 text-left">Product Name</th>
                  <th className="px-6 py-3 text-left">Category</th>
                  <th className="px-6 py-3 text-left">Brand</th>
                  <th className="px-6 py-3 text-left">Product Type</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <ProductImageUploader className="w-16 h-16 object-cover rounded" productId={product._id} />
                      <td className="px-6 py-4 font-mono">{product?.productCode?.code || "—"}</td>
                      <td className="px-6 py-4">{product?.ProductName || "—"}</td>
                      <td className="px-6 py-4">{product?.Category || "—"}</td>
                      <td className="px-6 py-4">{product.Brand?.name || "—"}</td>
                      <td className="px-6 py-4">{product.ProductType?.name || "—"}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="bg-white flex flex-col rounded-lg shadow-md border border-gray-200 justify-between p-4">
                  <div className="mb-2 p-4 border border-dashed border-gray-300 rounded-lg">
                    <ProductImageUploader className="w-full h-32 object-cover" productId={product._id} />
                     {/* You can enhance this view to also show images */}
                  </div>
                  <div>
                    <div className="text-lg font-bold mb-1">{product?.productCode?.code || "—"}</div>
                    <div className="text-sm space-y-1 text-gray-700">
                      <p><span className="font-semibold">Name:</span> {product?.ProductName || "—"}</p>
                      <p><span className="font-semibold">Category:</span> {product?.Category || "—"}</p>
                      <p><span className="font-semibold">Brand:</span> {product?.Brand?.name || "—"}</p>
                      <p><span className="font-semibold">Type:</span> {product?.ProductType?.name || "—"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(product)}
                    className="mt-4 w-full bg-yellow-500 text-white px-3 py-2 shadow-sm rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 col-span-full">
                No Products Found
              </div>
            )}
          </div>
        )}
      </main>

      {showForm && (
        <ModalForm
          title="Add New Product"
          formData={formData}
          productCode={productCode}
          handleProductCodeChange={handleProductCodeChange}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setShowForm={setShowForm}
          brands={brands}
          productType={productType}
          formErrors={formErrors}
          autoGenerate={autoGenerate}
          isEditing={false}
        />
      )}

      {showEditForm && (
        <ModalForm
          title="Edit Product"
          formData={formData}
          productCode={productCode}
          handleProductCodeChange={handleProductCodeChange}
          handleChange={handleChange}
          handleSubmit={updateProduct}
          setShowForm={setShowEditForm}
          brands={brands}
          productType={productType}
          formErrors={formErrors}
          autoGenerate={false}
          isEditing={true}
        />
      )}
    </>
  );
}

// Reusable Modal Form Component
function ModalForm({
  title,
  formData,
  productCode,
  handleProductCodeChange,
  handleChange,
  handleSubmit,
  setShowForm,
  brands,
  productType,
  formErrors,
  autoGenerate,
  isEditing,
}) {
  const isReadOnly = autoGenerate && !isEditing;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[60]">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          
          <label className="text-sm font-medium text-gray-700">Product Code</label>
          <input
            type="text"
            value={productCode}
            onChange={handleProductCodeChange}
            readOnly={isReadOnly}
            className={`border px-3 py-2 rounded w-full font-mono ${isReadOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"} ${formErrors.productCode ? "border-red-500" : "border-gray-300"}`}
            placeholder={isReadOnly ? "Code will be generated" : "Enter Product Code"}
          />
          {formErrors.productCode && <p className="text-red-600 text-xs">{formErrors.productCode}</p>}
          
          <label className="text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="ProductName"
            value={formData.ProductName}
            onChange={handleChange}
            placeholder="e.g., Galaxy S25 Ultra"
            className={`w-full px-3 py-2 border rounded ${formErrors.ProductName ? "border-red-500 bg-red-50" : "border-gray-300"}`}
          />
          {formErrors.ProductName && <p className="text-red-600 text-xs">{formErrors.ProductName}</p>}

          <label className="text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            placeholder="e.g., Electronics"
            className={`w-full px-3 py-2 border rounded ${formErrors.Category ? "border-red-500 bg-red-50" : "border-gray-300"}`}
          />
          {formErrors.Category && <p className="text-red-600 text-xs">{formErrors.Category}</p>}

          <label className="text-sm font-medium text-gray-700">Brand</label>
          <select
            name="Brand"
            value={formData.Brand}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${formErrors.Brand ? "border-red-500 bg-red-50" : "border-gray-300"}`}
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
          {formErrors.Brand && <p className="text-red-600 text-xs">{formErrors.Brand}</p>}
          
          <label className="text-sm font-medium text-gray-700">Product Type</label>
          <select
            name="ProductType"
            value={formData.ProductType}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${formErrors.ProductType ? "border-red-500 bg-red-50" : "border-gray-300"}`}
          >
            <option value="">Select Product Type</option>
            {productType.map((pt) => (
              <option key={pt._id} value={pt._id}>
                {pt.name}
              </option>
            ))}
          </select>
          {formErrors.ProductType && <p className="text-red-600 text-xs">{formErrors.ProductType}</p>}

          <div className="flex gap-2 pt-2">
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Save
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
  );
}