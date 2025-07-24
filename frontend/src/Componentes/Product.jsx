
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useProductContext } from "./ProductContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Product() {
//   const [showForm, setShowForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [formData, setFormData] = useState({
//     ProductName: "",
//     Category: "",
//     Brand: "",
//     ProductType: "",
//   });

//   const {
//     autoGenerate,
//     setAutoGenerate,
//     productCode,
//     setProductCode,
//   } = useProductContext();

//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [productType, setProductType] = useState([]);
//   const [formErrors, setFormErrors] = useState({});
//   const [editId, setEditId] = useState(null);
//   const [codeGenerated, setCodeGenerated] = useState(false);
//   //   const [selectedBrand, setSelectedBrand] = useState(null);
//   // const [selectedType, setSelectedType] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [ProductCode, setProductCodes] = useState("");




//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBrands = async () => {
//       const res = await axios.get("http://localhost:3000/getBrand");
//       setBrands(Array.isArray(res.data) ? res.data : []);
//     };
//     const fetchProductTypes = async () => {
//       const res = await axios.get("http://localhost:3000/getProductType");
//       setProductType(Array.isArray(res.data) ? res.data : []);
//     };

//     fetchBrands();
//     fetchProductTypes();
//     fetchProducts();
//   }, []);

//   // useEffect(() => {
//   //   const selectedBrand = brands.find((b) => b._id === formData.Brand);
//   //   const selectedType = productType.find((pt) => pt._id === formData.ProductType);

//   //   if (autoGenerate && selectedBrand) {
//   //     const prefix = productCode?.split("-")[0] || "003";

//   //     // Build product code progressively
//   //     let finalCode = `${prefix}-${selectedBrand.shortname}`;
//   //     if (selectedType) {
//   //       finalCode += `-${selectedType.ShortName}`;
//   //       setCodeGenerated(true); // Lock when both parts are selected
//   //     }

//   //     setProductCode(finalCode);
//   //   }
//   // }, [autoGenerate, formData.Brand, formData.ProductType, brands, productType,isEditing]);

//   // useEffect(() => {
//   //   const selectedBrand = brands.find((b) => b._id === formData.Brand);
//   //   const selectedType = productType.find((pt) => pt._id === formData.ProductType);
//   //   const codePrefix = productCode?.split("-")[0] || "003";

//   //   // ✅ Run for both creation (autoGenerate) or editing
//   //   if ((autoGenerate || isEditing) && selectedBrand) {
//   //     let finalCode = `${codePrefix}-${selectedBrand.shortname}`;
//   //     if (selectedType) {
//   //       finalCode += `-${selectedType.ShortName}`;
//   //     }

//   //     setProductCode(finalCode);
//   //     setCodeGenerated(true);
//   //   }
//   // }, [formData.Brand, formData.ProductType, brands, productType, autoGenerate, isEditing]);

//   // useEffect(() => {
//   //   if (!autoGenerate && !isEditing) return;

//   //   const selectedBrand = brands.find((b) => b._id === formData.Brand);
//   //   const selectedType = productType.find((pt) => pt._id === formData.ProductType);
//   //   const prefix = productCode?.split("-")[0] || "003";

//   //   let generatedCode = prefix;

//   //   if (selectedBrand) {
//   //     generatedCode += `-${selectedBrand.shortname}`;
//   //   } else {
//   //     generatedCode += `-`; // Placeholder
//   //   }

//   //   if (selectedType) {
//   //     generatedCode += `-${selectedType.ShortName}`;
//   //   }

//   //   setProductCode(generatedCode);
//   // }, [formData.Brand, formData.ProductType, autoGenerate, isEditing, brands, productType]);



//   useEffect(() => {
//     if (!autoGenerate && !isEditing) return;

//     const selectedBrand = brands.find((b) => b._id === formData.Brand);
//     const selectedType = productType.find((pt) => pt._id === formData.ProductType);

//     const prefix = productCode?.split("-")[0] || "003"; // fallback

//     let generatedCode = prefix;

//     // Append brand shortname if exists
//     generatedCode += `-${selectedBrand?.shortname || ""}`;

//     // Append type shortname if exists
//     if (selectedBrand || selectedType) {
//       generatedCode += `-${selectedType?.shortname || ""}`;
//     }

//     setProductCode(generatedCode);
//   }, [formData.Brand, formData.ProductType, autoGenerate, isEditing, brands, productType]);



//   useEffect(() => {
//     if (autoGenerate || isEditing) return; // This is only for manual mode

//     const selectedBrand = brands.find((b) => b._id === formData.Brand);
//     const selectedType = productType.find((pt) => pt._id === formData.ProductType);

//     // If user already started typing something like "007", reuse it
//     const prefix = productCode?.split("-")[0] || "";

//     let manualCode = prefix;

//     if (selectedBrand) {
//       manualCode += `-${selectedBrand.shortname}`;
//     } else {
//       manualCode += `-`;
//     }

//     if (selectedType) {
//       manualCode += `-${selectedType.shortname}`;
//     }

//     setProductCode(manualCode);
//   }, [formData.Brand, formData.ProductType, autoGenerate, isEditing]);


//   // useEffect(() => {
//   //   if (isEditing && productCode && brandId && typeId) {
//   //     const selectedBrand = brands.find((b) => b._id === brandId);
//   //     const selectedType = productType.find((pt) => pt._id === typeId);

//   //     // Extract the base numeric code (e.g., '003') from '003-NK-AD'
//   //     const basePrefix = productCode.split("-")[0];

//   //     // Rebuild the code using current shortnames (without stacking old ones)
//   //     const updatedCode = `${basePrefix}-${selectedBrand?.shortname || ""}-${selectedType?.ShortName || ""}`;

//   //     setProductCode(updatedCode);
//   //   }
//   // }, [brandId, typeId]);


//   const fetchProducts = async () => {
//     const res = await axios.get("http://localhost:3000/products");
//     setProducts(Array.isArray(res.data) ? res.data : []);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (name === "Brand" || name === "ProductType") {
//       setCodeGenerated(false); // Allow regeneration on brand/type change
//     }

//     if (value.trim()) {
//       setFormErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   // const handleProductCodeChange = (e) => {
//   //   const value = e.target.value;
//   //   setProductCode(value);
//   //   if (value.trim()) {
//   //     setFormErrors((prev) => {
//   //       const newErrors = { ...prev };
//   //       delete newErrors.productCode;
//   //       return newErrors;
//   //     });
//   //   }

//   // };

//   const handleProductCodeChange = (e) => {
//     if (!autoGenerate) {
//       setProductCode(e.target.value);
//       if (e.target.value.trim()) {
//         setFormErrors((prev) => {
//           const newErrors = { ...prev };
//           delete newErrors.productCode;
//           return newErrors;
//         });
//       }
//     }
//   };


//   // const handleEdit = (product) => {
//   //   setEditId(product._id);
//   //   setIsEditing(true)
//   // setShowEditForm(true);
//   //   const brandId = product.Brand?._id || product.Brand;
//   //   const typeId = product.ProductType?._id || product.ProductType;



//   //   setFormData({
//   //     ProductName: product.ProductName,
//   //     Category: product.Category,
//   //     Brand: brandId,
//   //     ProductType: typeId,
//   //   });
//   // const code = product?.productCode?.code || "";
//   // const fullCode = `${code}-${brands?.shortname || "BR"}-${productType?.ShortName || "PT"}`;

//   // setProductCode(fullCode)




//   //   setCodeGenerated(true);
//   //   setAutoGenerate(false);

//   // };

//   const handleEdit = (product) => {
//     setEditId(product._id);
//     setIsEditing(true);
//     setShowEditForm(true);

//     const brandId = product.Brand?._id || product.Brand;
//     const typeId = product.ProductType?._id || product.ProductType;

//     setFormData({
//       ProductName: product.ProductName,
//       Category: product.Category,
//       Brand: brandId,
//       ProductType: typeId,
//     });

//     // Extract prefix only (e.g., '003')
//     const basePrefix = product?.productCode?.code?.split("-")[0] || "";

//     // Fetch current shortnames from context data
//     const brandObj = brands.find((b) => b._id === brandId);
//     const typeObj = productType.find((pt) => pt._id === typeId);
//     const brandShort = brandObj?.shortname || "BR";
//     const typeShort = typeObj?.shortname;

//     let finalCode = `${basePrefix}-${brandShort}`;
//     if (typeShort) {
//       finalCode += `-${typeShort}`;
//     }


//     const updatedCode = `${basePrefix}-${brandShort}-${typeShort}`;

//     setProductCode(updatedCode);
//     setAutoGenerate(false);
//     setCodeGenerated(true);
//   };


//   const updateProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         id: editId,
//         ...formData,
//         productCode,
//       };
//       const res = await axios.put("http://localhost:3000/updateProduct", payload);
//       toast.success(res.data.message || "Product updated successfully.");
//       setShowEditForm(false);
//       fetchProducts();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update product");
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const errors = {};
//   //   if (!formData.ProductName.trim()) errors.ProductName = "Product Name is required";
//   //   if (!formData.Category.trim()) errors.Category = "Category is required";
//   //   if (!formData.Brand) errors.Brand = "Brand is required";
//   //   if (!formData.ProductType) errors.ProductType = "Product Type is required";
//   //   if (!autoGenerate && !productCode.trim()) errors.productCode = "Product Code is required";

//   //   setFormErrors(errors);
//   //   if (Object.keys(errors).length > 0) return;

//   //   try {
//   //     const payload = {
//   //       ...formData,
//   //       autoGenerate,
//   //       productCode: productCode || null,
//   //     };

//   //     const res = await axios.post("http://localhost:3000/createProduct", payload);
//   //     if (res.status === 200) {
//   //       toast.success("Product created successfully.");
//   //       setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
//   //       setProductCode("");
//   //       setShowForm(false);
//   //       setProducts((prev) => [res.data.product, ...prev]);
//   //       setCodeGenerated(false);
//   //     }
//   //   } catch {
//   //     toast.error("Failed to create product");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!formData.ProductName.trim()) errors.ProductName = "Product Name is required";
//     if (!formData.Category.trim()) errors.Category = "Category is required";
//     if (!formData.Brand) errors.Brand = "Brand is required";
//     if (!formData.ProductType) errors.ProductType = "Product Type is required";
//     if (!autoGenerate && !productCode.trim()) errors.productCode = "Product Code is required";

//     setFormErrors(errors);
//     if (Object.keys(errors).length > 0) return;


//     // ✅ Duplicate Check
//     const isDuplicate = products.some((product) => {
//       const productBrandId =
//         typeof product.Brand === "object" ? product.Brand._id : product.Brand;
//       const productTypeId =
//         typeof product.ProductType === "object"
//           ? product.ProductType._id
//           : product.ProductType;

//       return (
//         product.ProductName.trim().toLowerCase() === formData.ProductName.trim().toLowerCase() &&
//         productBrandId === formData.Brand &&
//         productTypeId === formData.ProductType
//       );
//     });

//     if (isDuplicate) {
//       toast.error("Product with the same name, brand, and type already exists.");
//       return;
//     }



//     try {
//       const brandObj = brands.find((b) => b._id === formData.Brand);
//       const typeObj = productType.find((pt) => pt._id === formData.ProductType);

//       const brandShort = brandObj?.shortname || "";
//       const typeShort = typeObj?.shortname || "";
//       const baseCode = productCode?.split("-")[0] || "";

//       const finalCode = autoGenerate
//         ? `${baseCode}-${brandShort}-${typeShort}`
//         : productCode;


//       const payload = {
//         ...formData,
//         ProductCode: ProductCode,
//         autoGenerate,
//         productCode: finalCode,
//       };

//       const res = await axios.post("http://localhost:3000/createProduct", payload);
//       if (res.status === 200) {
//         toast.success("Product created successfully.");
//         setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
//         setProductCode("");
//         setShowForm(false);
//         setProducts((prev) => [res.data.product, ...prev]);
//         setCodeGenerated(false);
//         fetchProducts()
//       }
//     } catch {
//       toast.error("Failed to create product");
//     }
//   };


//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <header className="fixed top-0 left-0 w-full bg-blue-700 text-white shadow-md z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Product Manager</h1>
//           <div className="space-x-4">
//             <button
//               onClick={async () => {
//                 try {
//                   const res = await axios.get("http://localhost:3000/getProductCode");
//                   const prefix = res.data.code || "003"; // fallback

//                   setFormData({
//                     ProductName: "",
//                     Category: "",
//                     Brand: "",
//                     ProductType: "",
//                   });

//                   setProductCode(prefix);          // ✅ Set initial prefix
//                   setAutoGenerate(true);           // ✅ Enable auto-generate
//                   setCodeGenerated(false);
//                   setIsEditing(false);
//                   setFormErrors({});
//                   setShowForm(true);
//                 } catch (err) {
//                   toast.error("Failed to fetch product code prefix");
//                 }
//               }}
//             >
//               + Add Product
//             </button>

//             <button
//               onClick={() => navigate("/")}
//               className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
//             >
//               Back
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="pt-28 px-6">
//         <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
//           <table className="min-w-full divide-y divide-gray-300 text-sm">
//             <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3 text-left">Product Code</th>
//                 <th className="px-6 py-3 text-left">Product Name</th>
//                 <th className="px-6 py-3 text-left">Category</th>
//                 <th className="px-6 py-3 text-left">Brand</th>
//                 <th className="px-6 py-3 text-left">Product Type</th>
//                 <th className="px-6 py-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             {/* <tbody className="bg-white divide-y divide-gray-200">
//               {products.length > 0 ? (
//                 products.map((product, i) => {
//                   const brand = brands.find(b => b._id === (product.Brand?._id || product.Brand));
//                   const type = productType.find(t => t._id === (product.ProductType?._id || product.ProductType));
//                   const brandShort = brand?.shortname || "BR";
//                   const typeShort = type?.ShortName || "PT";
//                   const code = product?.productCode?.code || "000";
//                   return (
//                     <tr key={i} className="hover:bg-gray-50">
                      
//                       <td className="px-6 py-4">{`${code}-${brandShort}-${typeShort}`}</td>
//                       <td className="px-6 py-4">{product?.ProductName || "—"}</td>
//                       <td className="px-6 py-4">{product?.Category || "—"}</td>
//                       <td className="px-6 py-4">{brand?.name || "—"}</td>
//                       <td className="px-6 py-4">{type?.name || "—"}</td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => handleEdit(product)}
//                           className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                         >
//                           Edit
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                     No products found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>  */}

//             <tbody className="bg-white divide-y divide-gray-200">
//               {products.length > 0 ? (
//                 products.map((product, i) => {
//                   return (
//                     <tr key={i} className="hover:bg-gray-50">
//                       <td className="px-6 py-4">
//                         {product?.productCode?.code}-{product?.productCode?.shortname}-{product?.productCode?.shortname}
//                       </td>

//                       <td className="px-6 py-4">{product?.ProductName || "—"}</td>
//                       <td className="px-6 py-4">{product?.Category || "—"}</td>
//                       <td className="px-6 py-4">
//                         {brands.find(b => b._id === (product.Brand?._id || product.Brand))?.name || "—"}
//                       </td>
//                       <td className="px-6 py-4">
//                         {productType.find(pt => pt._id === (product.ProductType?._id || product.ProductType))?.name || "—"}
//                       </td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => handleEdit(product)}
//                           className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                         >
//                           Edit
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                     No products found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>

//           </table>
//         </div>
//       </main>

//       {showForm && (
//         <ModalForm
//           title="Add New Product"
//           formData={formData}
//           productCode={productCode}
//           handleChange={handleChange}
//           handleProductCodeChange={handleProductCodeChange}
//           handleSubmit={handleSubmit}
//           setShowForm={setShowForm}
//           brands={brands}
//           productType={productType}
//           formErrors={formErrors}
//           autoGenerate={autoGenerate}


//         />
//       )}

//       {showEditForm && (
//         <ModalForm
//           title="Edit Product"
//           formData={formData}
//           productCode={productCode}
//           handleChange={handleChange}
//           handleProductCodeChange={handleProductCodeChange}
//           handleSubmit={updateProduct}
//           setShowForm={setShowEditForm}
//           brands={brands}
//           productType={productType}
//           formErrors={formErrors}
//           autoGenerate={autoGenerate}
//           isedit={showEditForm}
//           isEditing={isEditing}
//           setProductCode={setProductCode}
//         />
//       )}
//     </>
//   );
// }

// function ModalForm({
//   title,
//   formData,
//   productCode,
//   handleChange,
//   handleProductCodeChange,
//   handleSubmit,
//   setShowForm,
//   brands,
//   productType,
//   formErrors,
//   autoGenerate,
//   isEditing,
//   setProductCode,
// }) {

//   return (

//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-xl shadow-md w-80">
//         <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             type="text"
//             value={productCode}
//             onChange={(e) => {
//               if (!autoGenerate) setProductCode(e.target.value); // Allow edit only when auto-generate is OFF
//             }}
//             readOnly={autoGenerate} // Disable input when auto-generate is ON
//             className={`border px-3 py-2 rounded w-full ${autoGenerate ? "bg-gray-100 cursor-not-allowed" : ""}`}
//             placeholder="Enter Product Code"
//           />

//           {formErrors.productCode && <p className="text-red-600 text-xs">{formErrors.productCode}</p>}
//           <input
//             type="text"
//             name="ProductName"
//             value={formData.ProductName}
//             onChange={handleChange}
//             placeholder="Product Name"
//             className={`w-full px-3 py-2 border rounded ${formErrors.ProductName ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           />
//           {formErrors.ProductName && <p className="text-red-600 text-xs">{formErrors.ProductName}</p>}

//           <input
//             type="text"
//             name="Category"
//             value={formData.Category}
//             onChange={handleChange}
//             placeholder="Category"
//             className={`w-full px-3 py-2 border rounded ${formErrors.Category ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           />
//           {formErrors.Category && <p className="text-red-600 text-xs">{formErrors.Category}</p>}

//           <select
//             name="Brand"
//             value={formData.Brand}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded ${formErrors.Brand ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           >
//             <option value="">Select Brand</option>
//             {brands.map((b) => (
//               <option key={b._id} value={b._id}>
//                 {b.name}
//               </option>
//             ))}
//           </select>
//           {formErrors.Brand && <p className="text-red-600 text-xs">{formErrors.Brand}</p>}

//           <select
//             name="ProductType"
//             value={formData.ProductType}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded ${formErrors.ProductType ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           >
//             <option value="">Select Product Type</option>
//             {productType.map((pt) => (
//               <option key={pt._id} value={pt._id}>
//                 {pt.name}
//               </option>
//             ))}
//           </select>
//           {formErrors.ProductType && <p className="text-red-600 text-xs">{formErrors.ProductType}</p>}

//           <div className="flex gap-2 pt-2">
//             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useProductContext } from "./ProductContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Product() {
//   const [showForm, setShowForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [formData, setFormData] = useState({
//     ProductName: "",
//     Category: "",
//     Brand: "",
//     ProductType: "",
//   });

//   // Global context for product code state
//   const {
//     autoGenerate,
//     setAutoGenerate,
//     productCode,
//     setProductCode,
//   } = useProductContext();

//   // Local state for products and form data
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [productType, setProductType] = useState([]);
//   const [formErrors, setFormErrors] = useState({});
//   const [editId, setEditId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const navigate = useNavigate();

//   // Fetch initial data for brands, types, and products
//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/getBrand");
//         setBrands(Array.isArray(res.data) ? res.data : []);
//       } catch (error) {
//         toast.error("Failed to fetch brands.");
//         console.error("Fetch Brands Error:", error);
//       }
//     };
//     const fetchProductTypes = async () => {
//        try {
//         const res = await axios.get("http://localhost:3000/getProductType");
//         setProductType(Array.isArray(res.data) ? res.data : []);
//       } catch (error) {
//         toast.error("Failed to fetch product types.");
//         console.error("Fetch Product Types Error:", error);
//       }
//     };

//     fetchBrands();
//     fetchProductTypes();
//     fetchProducts();
//   }, []);

//   /**
//    * Effect to auto-generate the product code.
//    * This runs ONLY when 'autoGenerate' is true or when 'isEditing' is true.
//    * In manual "add" mode, this hook will not run, preserving manual input.
//    */
//   useEffect(() => {
//     if (!autoGenerate && !isEditing) {
//         return;
//     }

//     const selectedBrand = brands.find((b) => b._id === formData.Brand);
//     const selectedType = productType.find((pt) => pt._id === formData.ProductType);

//     // Keep the prefix part of the code (e.g., '003')
//     const prefix = productCode?.split("-")[0] || "003";

//     let generatedCode = prefix;
//     generatedCode += `-${selectedBrand?.shortname || ""}`;
//     generatedCode += `-${selectedType?.shortname || ""}`;
    
//     // Clean up trailing hyphens
//     setProductCode(generatedCode.replace(/-+$/, '-'));

//   }, [formData.Brand, formData.ProductType, autoGenerate, isEditing, brands, productType, setProductCode]);


//   // Fetches all products from the server
//   const fetchProducts = async () => {
//     try {
//         const res = await axios.get("http://localhost:3000/products");
//         setProducts(Array.isArray(res.data) ? res.data : []);
//     } catch(error) {
//         toast.error("Failed to fetch products.");
//         console.error("Fetch Products Error:", error);
//     }
//   };

//   // Handles changes in form inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     // Clear validation error for the field when user starts typing
//     if (value.trim()) {
//       setFormErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };
  
//   // Prepares the form for editing an existing product
//   const handleEdit = (product) => {
//     setEditId(product._id);
//     setIsEditing(true);
//     setShowEditForm(true);
//     setAutoGenerate(false); // Start in manual mode for edits

//     const brandId = product.Brand?._id || product.Brand;
//     const typeId = product.ProductType?._id || product.ProductType;

//     setFormData({
//       ProductName: product.ProductName,
//       Category: product.Category,
//       Brand: brandId,
//       ProductType: typeId,
//     });
    
//     // Set the existing product code in the form
//     setProductCode(product.productCode?.code || "");
//   };

//   // Submits the updated product data to the server
//   const updateProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         id: editId,
//         ...formData,
//         productCode,
//       };
//       const res = await axios.put("http://localhost:3000/updateProduct", payload);
//       toast.success(res.data.message || "Product updated successfully.");
//       setShowEditForm(false);
//       fetchProducts();
//       setIsEditing(false); // Reset editing state
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update product");
//     }
//   };

//   // Validates and submits the new product form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!formData.ProductName.trim()) errors.ProductName = "Product Name is required";
//     if (!formData.Category.trim()) errors.Category = "Category is required";
//     if (!formData.Brand) errors.Brand = "Brand is required";
//     if (!formData.ProductType) errors.ProductType = "Product Type is required";
//     if (!productCode.trim()) errors.productCode = "Product Code is required";

//     setFormErrors(errors);
//     if (Object.keys(errors).length > 0) return;

//     // Check for duplicate products before submitting
//     const isDuplicate = products.some((p) => 
//         p.ProductName.trim().toLowerCase() === formData.ProductName.trim().toLowerCase() &&
//         (p.Brand?._id || p.Brand) === formData.Brand &&
//         (p.ProductType?._id || p.ProductType) === formData.ProductType
//     );

//     if (isDuplicate) {
//       toast.error("Product with the same name, brand, and type already exists.");
//       return;
//     }

//     try {
//       const payload = {
//         ...formData,
//         autoGenerate,
//         productCode: productCode,
//       };

//       const res = await axios.post("http://localhost:3000/createProduct", payload);
//       if (res.status === 200) {
//         toast.success("Product created successfully.");
//         setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
//         setProductCode("");
//         setShowForm(false);
//         fetchProducts();
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to create product");
//     }
//   };

//   // Prepares and opens the "Add Product" modal
//   const handleAddProductClick = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/getProductCode");
//       const prefix = res.data.code || "003"; // fallback prefix

//       setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
//       setProductCode(prefix + "-"); // Set initial code with prefix
//       setAutoGenerate(true); // Default to auto-generation for new products
//       setIsEditing(false);
//       setFormErrors({});
//       setShowForm(true);
//     } catch (err) {
//       toast.error("Failed to fetch product code prefix");
//     }
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <header className="fixed top-0 left-0 w-full bg-blue-700 text-white shadow-md z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Product Manager</h1>
//           <div className="space-x-4">
//             <button
//               onClick={handleAddProductClick}
//               className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
//             >
//               + Add Product
//             </button>
//             <button
//               onClick={() => navigate("/")}
//               className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300"
//             >
//               Back
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="pt-28 px-6">
//         <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
//           <table className="min-w-full divide-y divide-gray-300 text-sm">
//             <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3 text-left">Product Code</th>
//                 <th className="px-6 py-3 text-left">Product Name</th>
//                 <th className="px-6 py-3 text-left">Category</th>
//                 <th className="px-6 py-3 text-left">Brand</th>
//                 <th className="px-6 py-3 text-left">Product Type</th>
//                 <th className="px-6 py-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {products.length > 0 ? (
//                 products.map((product, i) => (
//                   <tr key={i} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 font-mono">{product?.productCode?.code || "—"}</td>
//                     <td className="px-6 py-4">{product?.ProductName || "—"}</td>
//                     <td className="px-6 py-4">{product?.Category || "—"}</td>
//                     <td className="px-6 py-4">{product.Brand?.name || "—"}</td>
//                     <td className="px-6 py-4">{product.ProductType?.name || "—"}</td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleEdit(product)}
//                         className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                     No products found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {showForm && (
//         <ModalForm
//           title="Add New Product"
//           formData={formData}
//           productCode={productCode}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//           setShowForm={setShowForm}
//           brands={brands}
//           productType={productType}
//           formErrors={formErrors}
//           autoGenerate={autoGenerate}
//           setAutoGenerate={setAutoGenerate}
//           setProductCode={setProductCode}
//           isEditing={false}
//         />
//       )}

//       {showEditForm && (
//         <ModalForm
//           title="Edit Product"
//           formData={formData}
//           productCode={productCode}
//           handleChange={handleChange}
//           handleSubmit={updateProduct}
//           setShowForm={setShowEditForm}
//           brands={brands}
//           productType={productType}
//           formErrors={formErrors}
//           autoGenerate={autoGenerate}
//           setAutoGenerate={setAutoGenerate}
//           setProductCode={setProductCode}
//           isEditing={true}
//         />
//       )}
//     </>
//   );
// }

// // Reusable Modal Form Component
// function ModalForm({
//   title,
//   formData,
//   productCode,
//   handleChange,
//   handleSubmit,
//   setShowForm,
//   brands,
//   productType,
//   formErrors,
//   autoGenerate,
//   setAutoGenerate,
//   setProductCode,
//   isEditing,
// }) {

//   // Handler for the auto-generate toggle
//   const handleAutoGenerateToggle = (e) => {
//     const isChecked = e.target.checked;
//     setAutoGenerate(isChecked);
//     // If user turns it off, clear the code to allow manual entry.
//     if (!isChecked) {
//       setProductCode("");
//     }
//   };


//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
//         <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
          
//           {/* Auto-generate Toggle Switch */}
//           {!isEditing && (
//             <div className="flex items-center justify-center p-2 bg-gray-50 rounded-md">
//                 <label htmlFor="auto-generate-toggle" className="text-sm font-medium text-gray-700 mr-3">Auto-generate Code</label>
//                 <input
//                     type="checkbox"
//                     id="auto-generate-toggle"
//                     checked={autoGenerate}
//                     onChange={handleAutoGenerateToggle}
//                     className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//             </div>
//           )}

//           <input
//             type="text"
//             value={productCode}
//             onChange={(e) => setProductCode(e.target.value)}
//             readOnly={autoGenerate}
//             className={`border px-3 py-2 rounded w-full font-mono ${autoGenerate ? "bg-gray-100 cursor-not-allowed" : "bg-white"} ${formErrors.productCode ? "border-red-500" : "border-gray-300"}`}
//             placeholder="Enter Product Code"
//           />
//           {formErrors.productCode && <p className="text-red-600 text-xs">{formErrors.productCode}</p>}
          
//           <input
//             type="text"
//             name="ProductName"
//             value={formData.ProductName}
//             onChange={handleChange}
//             placeholder="Product Name"
//             className={`w-full px-3 py-2 border rounded ${formErrors.ProductName ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           />
//           {formErrors.ProductName && <p className="text-red-600 text-xs">{formErrors.ProductName}</p>}

//           <input
//             type="text"
//             name="Category"
//             value={formData.Category}
//             onChange={handleChange}
//             placeholder="Category"
//             className={`w-full px-3 py-2 border rounded ${formErrors.Category ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           />
//           {formErrors.Category && <p className="text-red-600 text-xs">{formErrors.Category}</p>}

//           <select
//             name="Brand"
//             value={formData.Brand}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded ${formErrors.Brand ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           >
//             <option value="">Select Brand</option>
//             {brands.map((b) => (
//               <option key={b._id} value={b._id}>
//                 {b.name}
//               </option>
//             ))}
//           </select>
//           {formErrors.Brand && <p className="text-red-600 text-xs">{formErrors.Brand}</p>}

//           <select
//             name="ProductType"
//             value={formData.ProductType}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded ${formErrors.ProductType ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           >
//             <option value="">Select Product Type</option>
//             {productType.map((pt) => (
//               <option key={pt._id} value={pt._id}>
//                 {pt.name}
//               </option>
//             ))}
//           </select>
//           {formErrors.ProductType && <p className="text-red-600 text-xs">{formErrors.ProductType}</p>}

//           <div className="flex gap-2 pt-2">
//             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useProductContext } from "./ProductContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Product() {
//   const [showForm, setShowForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [formData, setFormData] = useState({
//     ProductName: "",
//     Category: "",
//     Brand: "",
//     ProductType: "",
//   });

//   // Global context for product code state, controlled by SystemMaster
//   const { autoGenerate, productCode, setProductCode } = useProductContext();

//   // Local state
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [productType, setProductType] = useState([]);
//   const [formErrors, setFormErrors] = useState({});
//   const [editId, setEditId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const navigate = useNavigate();

//   // Fetch initial data for brands, types, and products
//   useEffect(() => {
//     const fetchInitialData = async () => {
//         try {
//             const [brandsRes, typesRes, productsRes] = await Promise.all([
//                 axios.get("http://localhost:3000/getBrand"),
//                 axios.get("http://localhost:3000/getProductType"),
//                 axios.get("http://localhost:3000/products")
//             ]);
//             setBrands(Array.isArray(brandsRes.data) ? brandsRes.data : []);
//             setProductType(Array.isArray(typesRes.data) ? typesRes.data : []);
//             setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
//         } catch (error) {
//             toast.error("Failed to load initial data.");
//             console.error("Data Fetch Error:", error);
//         }
//     };
//     fetchInitialData();
//   }, []);

//   /**
//    * Effect to auto-generate the product code.
//    * This runs ONLY when 'autoGenerate' is true (from context) and we are NOT editing.
//    */
//   useEffect(() => {
//     // Exit if auto-generation is off or if we are in edit mode
//     if (!autoGenerate || isEditing) {
//         return;
//     }

//     const selectedBrand = brands.find((b) => b._id === formData.Brand);
//     const selectedType = productType.find((pt) => pt._id === formData.ProductType);
    
//     // The prefix is fetched and set when the 'Add' button is clicked
//     const prefix = productCode?.split("-")[0] || "";

//     let generatedCode = prefix;
//     generatedCode += `-${selectedBrand?.shortname || ""}`;
//     generatedCode += `-${selectedType?.shortname || ""}`;
    
//     // Clean up trailing hyphens for a cleaner look
//     setProductCode(generatedCode.replace(/-+$/, '-'));

//   }, [formData.Brand, formData.ProductType, autoGenerate, isEditing, brands, productType, productCode, setProductCode]);


//   const fetchProducts = async () => {
//     try {
//         const res = await axios.get("http://localhost:3000/products");
//         setProducts(Array.isArray(res.data) ? res.data : []);
//     } catch(error) {
//         toast.error("Failed to fetch products.");
//         console.error("Fetch Products Error:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (value.trim()) {
//       setFormErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };
  
//   const handleEdit = (product) => {
//     setEditId(product._id);
//     setIsEditing(true);
//     setShowEditForm(true);

//     const brandId = product.Brand?._id || product.Brand;
//     const typeId = product.ProductType?._id || product.ProductType;

//     setFormData({
//       ProductName: product.ProductName,
//       Category: product.Category,
//       Brand: brandId,
//       ProductType: typeId,
//     });
    
//     // Load the existing product code for manual editing
//     setProductCode(product.productCode?.code || "");
//   };

//   const updateProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         id: editId,
//         ...formData,
//         productCode,
//       };
//       const res = await axios.put("http://localhost:3000/updateProduct", payload);
//       toast.success(res.data.message || "Product updated successfully.");
//       setShowEditForm(false);
//       fetchProducts();
//       setIsEditing(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update product");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!formData.ProductName.trim()) errors.ProductName = "Product Name is required";
//     if (!formData.Category.trim()) errors.Category = "Category is required";
//     if (!formData.Brand) errors.Brand = "Brand is required";
//     if (!formData.ProductType) errors.ProductType = "Product Type is required";
//     if (!productCode.trim()) errors.productCode = "Product Code is required";

//     setFormErrors(errors);
//     if (Object.keys(errors).length > 0) return;

//     const isDuplicate = products.some((p) => 
//         !isEditing && // Only check for duplicates when creating a new product
//         p.ProductName.trim().toLowerCase() === formData.ProductName.trim().toLowerCase() &&
//         (p.Brand?._id || p.Brand) === formData.Brand &&
//         (p.ProductType?._id || p.ProductType) === formData.ProductType
//     );

//     if (isDuplicate) {
//       toast.error("Product with the same name, brand, and type already exists.");
//       return;
//     }

//     try {
//       const payload = { ...formData, productCode };
//       const res = await axios.post("http://localhost:3000/createProduct", payload);
//       toast.success("Product created successfully.");
//       setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
//       setProductCode("");
//       setShowForm(false);
//       fetchProducts();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to create product");
//     }
//   };

//   // Prepares and opens the "Add Product" modal
//   const handleAddProductClick = async () => {
//     // Reset form state
//     setIsEditing(false);
//     setFormErrors({});
//     setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });

//     if (autoGenerate) {
//         // If auto-generation is ON, fetch the prefix and prepare for generation
//         try {
//             const res = await axios.get("http://localhost:3000/getProductCode");
//             const prefix = res.data.code || "003";
//             setProductCode(prefix + "-"); 
//         } catch (err) {
//             toast.error("Failed to fetch product code prefix");
//             setProductCode(""); // Fallback to empty
//         }
//     } else {
//         // If auto-generation is OFF, prepare for manual entry
//         setProductCode("");
//     }
    
//     setShowForm(true);
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <header className="fixed top-0 left-0 w-full bg-blue-700 text-white shadow-md z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Product Manager</h1>
//           <div className="space-x-4">
//             <button
//               onClick={handleAddProductClick}
//               className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
//             >
//               + Add Product
//             </button>
//             <button
//               onClick={() => navigate("/system-master")}
//               className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300"
//             >
//               Settings
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="pt-28 px-6">
//         <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
//           <table className="min-w-full divide-y divide-gray-300 text-sm">
//             <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3 text-left">Product Code</th>
//                 <th className="px-6 py-3 text-left">Product Name</th>
//                 <th className="px-6 py-3 text-left">Category</th>
//                 <th className="px-6 py-3 text-left">Brand</th>
//                 <th className="px-6 py-3 text-left">Product Type</th>
//                 <th className="px-6 py-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {products.length > 0 ? (
//                 products.map((product) => (
//                   <tr key={product._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 font-mono">{product?.productCode?.code || "—"}</td>
//                     <td className="px-6 py-4">{product?.ProductName || "—"}</td>
//                     <td className="px-6 py-4">{product?.Category || "—"}</td>
//                     <td className="px-6 py-4">{product.Brand?.name || "—"}</td>
//                     <td className="px-6 py-4">{product.ProductType?.name || "—"}</td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleEdit(product)}
//                         className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                     No products found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {showForm && (
//         <ModalForm
//           title="Add New Product"
//           formData={formData}
//           productCode={productCode}
//           setProductCode={setProductCode}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//           setShowForm={setShowForm}
//           brands={brands}
//           productType={productType}
//           formErrors={formErrors}
//           autoGenerate={autoGenerate}
//           isEditing={false}
//         />
//       )}

//       {showEditForm && (
//         <ModalForm
//           title="Edit Product"
//           formData={formData}
//           productCode={productCode}
//           setProductCode={setProductCode}
//           handleChange={handleChange}
//           handleSubmit={updateProduct}
//           setShowForm={setShowEditForm}
//           brands={brands}
//           productType={productType}
//           formErrors={formErrors}
//           autoGenerate={false} // Editing is always manual
//           isEditing={true}
//         />
//       )}
//     </>
//   );
// }

// // Reusable Modal Form Component
// function ModalForm({
//   title,
//   formData,
//   productCode,
//   setProductCode,
//   handleChange,
//   handleSubmit,
//   setShowForm,
//   brands,
//   productType,
//   formErrors,
//   autoGenerate, // This is now the single source of truth from context
//   isEditing,
// }) {

//   // The input is read-only if autoGenerate is true AND it's a new product.
//   // It's always editable for existing products.
//   const isReadOnly = autoGenerate && !isEditing;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
//         <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
          
//           <input
//             type="text"
//             value={productCode}
//             onChange={(e) => setProductCode(e.target.value)}
//             readOnly={isReadOnly}
//             className={`border px-3 py-2 rounded w-full font-mono ${isReadOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"} ${formErrors.productCode ? "border-red-500" : "border-gray-300"}`}
//             placeholder={isReadOnly ? "Code will be generated" : "Enter Product Code"}
//           />
//           {formErrors.productCode && <p className="text-red-600 text-xs">{formErrors.productCode}</p>}
          
//           <input
//             type="text"
//             name="ProductName"
//             value={formData.ProductName}
//             onChange={handleChange}
//             placeholder="Product Name"
//             className={`w-full px-3 py-2 border rounded ${formErrors.ProductName ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           />
//           {formErrors.ProductName && <p className="text-red-600 text-xs">{formErrors.ProductName}</p>}

//           <input
//             type="text"
//             name="Category"
//             value={formData.Category}
//             onChange={handleChange}
//             placeholder="Category"
//             className={`w-full px-3 py-2 border rounded ${formErrors.Category ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           />
//           {formErrors.Category && <p className="text-red-600 text-xs">{formErrors.Category}</p>}

//           <select
//             name="Brand"
//             value={formData.Brand}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded ${formErrors.Brand ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           >
//             <option value="">Select Brand</option>
//             {brands.map((b) => (
//               <option key={b._id} value={b._id}>
//                 {b.name}
//               </option>
//             ))}
//           </select>
//           {formErrors.Brand && <p className="text-red-600 text-xs">{formErrors.Brand}</p>}

//           <select
//             name="ProductType"
//             value={formData.ProductType}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded ${formErrors.ProductType ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           >
//             <option value="">Select Product Type</option>
//             {productType.map((pt) => (
//               <option key={pt._id} value={pt._id}>
//                 {pt.name}
//               </option>
//             ))}
//           </select>
//           {formErrors.ProductType && <p className="text-red-600 text-xs">{formErrors.ProductType}</p>}

//           <div className="flex gap-2 pt-2">
//             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// import axios from "axios";
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useProductContext } from "./ProductContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Product() {
//   const [showForm, setShowForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [formData, setFormData] = useState({
//     ProductName: "",
//     Category: "",
//     Brand: "",
//     ProductType: "",
//   });

//   // Global context for product code state, controlled by SystemMaster
//   const { autoGenerate, productCode, setProductCode } = useProductContext();

//   // Local state
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [productType, setProductType] = useState([]);
//   const [formErrors, setFormErrors] = useState({});
//   const [editId, setEditId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
  
//   // Ref to hold the prefix for auto-generation to avoid re-render loops
//   const autoPrefixRef = useRef("");

//   const navigate = useNavigate();

//   // Fetch initial data for brands, types, and products
//   useEffect(() => {
//     const fetchInitialData = async () => {
//         try {
//             const [brandsRes, typesRes, productsRes] = await Promise.all([
//                 axios.get("http://localhost:3000/getBrand"),
//                 axios.get("http://localhost:3000/getProductType"),
//                 axios.get("http://localhost:3000/products")
//             ]);
//             setBrands(Array.isArray(brandsRes.data) ? brandsRes.data : []);
//             setProductType(Array.isArray(typesRes.data) ? typesRes.data : []);
//             setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
//         } catch (error) {
//             toast.error("Failed to load initial data.");
//             console.error("Data Fetch Error:", error);
//         }
//     };
//     fetchInitialData();
//   }, []);

//   /**
//    * Effect to auto-generate or assist with the product code.
//    * This runs when dropdowns change, but not in edit mode.
//    */
//   useEffect(() => {
//     if (isEditing) return;

//     const selectedBrand = brands.find((b) => b._id === formData.Brand);
//     const selectedType = productType.find((pt) => pt._id === formData.ProductType);

//     // This effect should only react to dropdown changes.
//     // We use the functional update form of setProductCode to get the latest state
//     // without causing an infinite loop from dependencies.
//     setProductCode(prevCode => {
//         let prefix;
//         if (autoGenerate) {
//             prefix = autoPrefixRef.current;
//         } else {
//             // In manual mode, the prefix is the first part of what's currently in the input.
//             prefix = prevCode.split('-')[0];
//         }

//         // If there's no prefix (e.g., user cleared the input), don't build anything.
//         if (!prefix) {
//             return prevCode;
//         }

//         const brandShort = selectedBrand?.shortname || "";
//         const typeShort = selectedType?.shortname || "";

//         const newParts = [prefix, brandShort, typeShort].filter(Boolean);
//         const newCode = newParts.join("-");

//         return newCode;
//     });

//   }, [formData.Brand, formData.ProductType, autoGenerate, isEditing, brands, productType, setProductCode]);


//   const fetchProducts = async () => {
//     try {
//         const res = await axios.get("http://localhost:3000/products");
//         setProducts(Array.isArray(res.data) ? res.data : []);
//     } catch(error) {
//         toast.error("Failed to fetch products.");
//         console.error("Fetch Products Error:", error);
//     }
//   };
  
//   // Custom handler for the product code input field
//   const handleProductCodeChange = (e) => {
//     // Simply update the state. The useEffect will handle the logic.
//     setProductCode(e.target.value);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (value.trim()) {
//       setFormErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };
  
//   const handleEdit = (product) => {
//     setEditId(product._id);
//     setIsEditing(true);
//     setShowEditForm(true);

//     const brandId = product.Brand?._id || product.Brand;
//     const typeId = product.ProductType?._id || product.ProductType;

//     setFormData({
//       ProductName: product.ProductName,
//       Category: product.Category,
//       Brand: brandId,
//       ProductType: typeId,
//     });
    
//     setProductCode(product.productCode?.code || "");
//   };

//   const updateProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         id: editId,
//         ...formData,
//         productCode,
//       };
//       const res = await axios.put("http://localhost:3000/updateProduct", payload);
//       toast.success(res.data.message || "Product updated successfully.");
//       setShowEditForm(false);
//       fetchProducts();
//       setIsEditing(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update product");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!formData.ProductName.trim()) errors.ProductName = "Product Name is required";
//     if (!formData.Category.trim()) errors.Category = "Category is required";
//     if (!formData.Brand) errors.Brand = "Brand is required";
//     if (!formData.ProductType) errors.ProductType = "Product Type is required";
//     if (!productCode.trim()) errors.productCode = "Product Code is required";

//     setFormErrors(errors);
//     if (Object.keys(errors).length > 0) return;

//     // *** UPDATED DUPLICATE VALIDATION LOGIC ***
//     if (!isEditing) {
//         const isDuplicateName = products.some(
//             (p) => p.ProductName.trim().toLowerCase() === formData.ProductName.trim().toLowerCase()
//         );

//         if (isDuplicateName) {
//             toast.error("A product with this name already exists.");
//             return;
//         }

//         const isDuplicateCombination = products.some(
//             (p) =>
//             (p.Brand?._id || p.Brand) === formData.Brand &&
//             (p.ProductType?._id || p.ProductType) === formData.ProductType
//         );

//         if (isDuplicateCombination) {
//             toast.error("A product with the same Brand and Product Type already exists.");
//             return;
//         }
//     }

//     try {
//       const payload = { ...formData, productCode };
//       const res = await axios.post("http://localhost:3000/createProduct", payload);
//       toast.success("Product created successfully.");
//       setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
//       setProductCode("");
//       setShowForm(false);
//       fetchProducts();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to create product");
//     }
//   };

//   const handleAddProductClick = async () => {
//     setIsEditing(false);
//     setFormErrors({});
//     setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
//     autoPrefixRef.current = ""; // Reset the auto prefix ref

//     if (autoGenerate) {
//         try {
//             const res = await axios.get("http://localhost:3000/getProductCode");
//             const prefix = res.data.code || "003";
//             autoPrefixRef.current = prefix; // Store the prefix
//             setProductCode(prefix + "-"); 
//         } catch (err) {
//             toast.error("Failed to fetch product code prefix");
//             setProductCode("");
//         }
//     } else {
//         setProductCode("");
//     }
    
//     setShowForm(true);
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <header className="fixed top-0 left-0 w-full bg-blue-700 text-white shadow-md z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Product Manager</h1>
//           <div className="space-x-4">
//             <button
//               onClick={handleAddProductClick}
//               className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
//             >
//               + Add Product
//             </button>
//             <button
//               onClick={() => navigate("/")}
//               className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300"
//             >
//              Back
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="pt-28 px-6">
//         <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
//           <table className="min-w-full divide-y divide-gray-300 text-sm">
//             <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3 text-left">Product Code</th>
//                 <th className="px-6 py-3 text-left">Product Name</th>
//                 <th className="px-6 py-3 text-left">Category</th>
//                 <th className="px-6 py-3 text-left">Brand</th>
//                 <th className="px-6 py-3 text-left">Product Type</th>
//                 <th className="px-6 py-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {products.length > 0 ? (
//                 products.map((product) => (
//                   <tr key={product._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 font-mono">{product?.productCode?.code || "—"}</td>
//                     <td className="px-6 py-4">{product?.ProductName || "—"}</td>
//                     <td className="px-6 py-4">{product?.Category || "—"}</td>
//                     <td className="px-6 py-4">{product.Brand?.name || "—"}</td>
//                     <td className="px-6 py-4">{product.ProductType?.name || "—"}</td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleEdit(product)}
//                         className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                     No products found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {showForm && (
//         <ModalForm
//           title="Add New Product"
//           formData={formData}
//           productCode={productCode}
//           handleProductCodeChange={handleProductCodeChange}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//           setShowForm={setShowForm}
//           brands={brands}
//           productType={productType}
//           formErrors={formErrors}
//           autoGenerate={autoGenerate}
//           isEditing={false}
//         />
//       )}

//       {showEditForm && (
//         <ModalForm
//           title="Edit Product"
//           formData={formData}
//           productCode={productCode}
//           handleProductCodeChange={handleProductCodeChange}
//           handleChange={handleChange}
//           handleSubmit={updateProduct}
//           setShowForm={setShowEditForm}
//           brands={brands}
//           productType={productType}
//           formErrors={formErrors}
//           autoGenerate={false}
//           isEditing={true}
//         />
//       )}
//     </>
//   );
// }

// // Reusable Modal Form Component
// function ModalForm({
//   title,
//   formData,
//   productCode,
//   handleProductCodeChange,
//   handleChange,
//   handleSubmit,
//   setShowForm,
//   brands,
//   productType,
//   formErrors,
//   autoGenerate,
//   isEditing,
// }) {

//   const isReadOnly = autoGenerate && !isEditing;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
//         <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
          
//           <input
//             type="text"
//             value={productCode}
//             onChange={handleProductCodeChange}
//             readOnly={isReadOnly}
//             className={`border px-3 py-2 rounded w-full font-mono ${isReadOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"} ${formErrors.productCode ? "border-red-500" : "border-gray-300"}`}
//             placeholder={isReadOnly ? "Code will be generated" : "Enter Product Code"}
//           />
//           {formErrors.productCode && <p className="text-red-600 text-xs">{formErrors.productCode}</p>}
          
//           <input
//             type="text"
//             name="ProductName"
//             value={formData.ProductName}
//             onChange={handleChange}
//             placeholder="Product Name"
//             className={`w-full px-3 py-2 border rounded ${formErrors.ProductName ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           />
//           {formErrors.ProductName && <p className="text-red-600 text-xs">{formErrors.ProductName}</p>}

//           <input
//             type="text"
//             name="Category"
//             value={formData.Category}
//             onChange={handleChange}
//             placeholder="Category"
//             className={`w-full px-3 py-2 border rounded ${formErrors.Category ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           />
//           {formErrors.Category && <p className="text-red-600 text-xs">{formErrors.Category}</p>}

//           <select
//             name="Brand"
//             value={formData.Brand}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded ${formErrors.Brand ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           >
//             <option value="">Select Brand</option>
//             {brands.map((b) => (
//               <option key={b._id} value={b._id}>
//                 {b.name}
//               </option>
//             ))}
//           </select>
//           {formErrors.Brand && <p className="text-red-600 text-xs">{formErrors.Brand}</p>}

//           <select
//             name="ProductType"
//             value={formData.ProductType}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded ${formErrors.ProductType ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           >
//             <option value="">Select Product Type</option>
//             {productType.map((pt) => (
//               <option key={pt._id} value={pt._id}>
//                 {pt.name}
//               </option>
//             ))}
//           </select>
//           {formErrors.ProductType && <p className="text-red-600 text-xs">{formErrors.ProductType}</p>}

//           <div className="flex gap-2 pt-2">
//             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }






































































































































































// import axios from "axios";
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useProductContext } from "./ProductContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Product() {
//   const [showForm, setShowForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [formData, setFormData] = useState({
//     ProductName: "",
//     Category: "",
//     Brand: "",
//     ProductType: "",
//   });

//   // Global context for product code state, controlled by SystemMaster
//   const { autoGenerate, productCode, setProductCode } = useProductContext();

//   // Local state
//   const [products, setProducts] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [productType, setProductType] = useState([]);
//   const [formErrors, setFormErrors] = useState({});
//   const [editId, setEditId] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
  
//   // Ref to hold the prefix for auto-generation to avoid re-render loops
//   const autoPrefixRef = useRef("");

//   const navigate = useNavigate();

//   // Fetch initial data for brands, types, and products
//   useEffect(() => {
//     const fetchInitialData = async () => {
//         try {
//             const [brandsRes, typesRes, productsRes] = await Promise.all([
//                 axios.get("http://localhost:3000/getBrand"),
//                 axios.get("http://localhost:3000/getProductType"),
//                 axios.get("http://localhost:3000/products")
//             ]);
//             setBrands(Array.isArray(brandsRes.data) ? brandsRes.data : []);
//             setProductType(Array.isArray(typesRes.data) ? typesRes.data : []);
//             setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
//         } catch (error) {
//             toast.error("Failed to load initial data.");
//             console.error("Data Fetch Error:", error);
//         }
//     };
//     fetchInitialData();
//   }, []);

//   /**
//    * Effect for ADD mode: auto-generates or assists with the product code.
//    */
//   useEffect(() => {
//     if (isEditing) return;

//     const selectedBrand = brands.find((b) => b._id === formData.Brand);
//     const selectedType = productType.find((pt) => pt._id === formData.ProductType);

//     setProductCode(prevCode => {
//         let prefix;
//         if (autoGenerate) {
//             prefix = autoPrefixRef.current;
//         } else {
//             prefix = prevCode.split('-')[0];
//         }

//         if (!prefix) return prevCode;

//         const brandShort = selectedBrand?.shortname || "";
//         const typeShort = selectedType?.shortname || "";

//         const newParts = [prefix, brandShort, typeShort].filter(Boolean);
//         const newCode = newParts.join("-");

//         return newCode;
//     });

//   }, [formData.Brand, formData.ProductType, autoGenerate, isEditing, brands, productType, setProductCode]);
  
 
//   useEffect(() => {
//     if (!isEditing) return;

//     const selectedBrand = brands.find((b) => b._id === formData.Brand);
//     const selectedType = productType.find((pt) => pt._id === formData.ProductType);

//     // Rebuild the code using the original prefix and new short names
//     setProductCode(prevCode => {
//         const prefix = prevCode.split('-')[0] || "";
        
//         const brandShort = selectedBrand?.shortname || "";
//         const typeShort = selectedType?.shortname || "";

//         const newParts = [prefix, brandShort, typeShort].filter(Boolean);
//         return newParts.join("-");
//     });
    
//   }, [formData.Brand, formData.ProductType, isEditing, brands, productType, setProductCode]);


//   const fetchProducts = async () => {
//     try {
//         const res = await axios.get("http://localhost:3000/products");
//         setProducts(Array.isArray(res.data) ? res.data : []);
//     } catch(error) {
//         toast.error("Failed to fetch products.");
//         console.error("Fetch Products Error:", error);
//     }
//   };
  
//   const handleProductCodeChange = (e) => {
//     setProductCode(e.target.value);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (value.trim()) {
//       setFormErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };
  
//   const handleEdit = (product) => {
//     setEditId(product._id);
//     setIsEditing(true);
//     setShowEditForm(true);

//     const brandId = product.Brand?._id || product.Brand;
//     const typeId = product.ProductType?._id || product.ProductType;

//     setFormData({
//       ProductName: product.ProductName,
//       Category: product.Category,
//       Brand: brandId,
//       ProductType: typeId,
//     });
    
//     setProductCode(product.productCode?.code || "");
//   };

//   const updateProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         id: editId,
//         ...formData,
//         productCode,
//       };
//       const res = await axios.put("http://localhost:3000/updateProduct", payload);
//       toast.success(res.data.message || "Product updated successfully.");
//       setShowEditForm(false);
//       fetchProducts();
//       setIsEditing(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update product");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!formData.ProductName.trim()) errors.ProductName = "Product Name is required";
//     if (!formData.Category.trim()) errors.Category = "Category is required";
//     if (!formData.Brand) errors.Brand = "Brand is required";
//     if (!formData.ProductType) errors.ProductType = "Product Type is required";
//     if (!productCode.trim()) errors.productCode = "Product Code is required";

//     setFormErrors(errors);
//     if (Object.keys(errors).length > 0) return;

//     // if (!isEditing) {
//     //     const isDuplicateName = products.some(
//     //         (p) => p.ProductName.trim().toLowerCase() === formData.ProductName.trim().toLowerCase(),
//     //         (p)=> p.Brand.trim().toLowerCase() === formData.Brand.trim().toLowerCase(),
//     //     );

//     //     if (isDuplicateName) {
//     //         toast.error("A product with this name already exists.");
//     //         return;
//     //     }

//     //     const isDuplicateCombination = products.some(
//     //         (p) =>
//     //         (p.Brand?._id || p.Brand) === formData.Brand &&
//     //         (p.ProductType?._id || p.ProductType) === formData.ProductType
//     //     );

//     //     if (isDuplicateCombination) {
//     //         toast.error("A product with the same Brand and Product Type already exists.");
//     //         return;
//     //     }
//     // }

//     try {
//       const payload = { ...formData, productCode };
//       const res = await axios.post("http://localhost:3000/createProduct", payload);
//       toast.success("Product created successfully.");
//       setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
//       setProductCode("");
//       setShowForm(false);
//       fetchProducts();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to create product");
//     }
//   };

//   const handleAddProductClick = async () => {
//     setIsEditing(false);
//     setFormErrors({});
//     setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
//     autoPrefixRef.current = ""; // Reset the auto prefix ref

//     if (autoGenerate) {
//         try {
//             const res = await axios.get("http://localhost:3000/getProductCode");
//             const prefix = res.data.code || "003";
//             autoPrefixRef.current = prefix; // Store the prefix
//             setProductCode(prefix + "-"); 
//         } catch (err) {
//             toast.error("Failed to fetch product code prefix");
//             setProductCode("");
//         }
//     } else {
//         setProductCode("");
//     }
    
//     setShowForm(true);
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <header className="fixed top-0 left-0 w-full bg-blue-700 text-white shadow-md z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Product Manager</h1>
//           <div className="space-x-4">
//             <button
//               onClick={handleAddProductClick}
//               className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
//             >
//               + Add Product
//             </button>
//             <button
//               onClick={() => navigate("/")}
//               className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300"
//             >
//              Back
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="pt-28 px-6">
//         <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
//           <table className="min-w-full divide-y divide-gray-300 text-sm">
//             <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3 text-left">Product Code</th>
//                 <th className="px-6 py-3 text-left">Product Name</th>
//                 <th className="px-6 py-3 text-left">Category</th>
//                 <th className="px-6 py-3 text-left">Brand</th>
//                 <th className="px-6 py-3 text-left">Product Type</th>
//                 <th className="px-6 py-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {products.length > 0 ? (
//                 products.map((product) => (
//                   <tr key={product._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 font-mono">{product?.productCode?.code || "—"}</td>
//                     <td className="px-6 py-4">{product?.ProductName || "—"}</td>
//                     <td className="px-6 py-4">{product?.Category || "—"}</td>
//                     <td className="px-6 py-4">{product.Brand?.name || "—"}</td>
//                     <td className="px-6 py-4">{product.ProductType?.name || "—"}</td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => handleEdit(product)}
//                         className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                     No products found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {showForm && (
//         <ModalForm
//           title="Add New Product"
//           formData={formData}
//           productCode={productCode}
//           handleProductCodeChange={handleProductCodeChange}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//           setShowForm={setShowForm}
//           brands={brands}
//           productType={productType}
//           formErrors={formErrors}
//           autoGenerate={autoGenerate}
//           isEditing={false}
//         />
//       )}

//       {showEditForm && (
//         <ModalForm
//           title="Edit Product"
//           formData={formData}
//           productCode={productCode}
//           handleProductCodeChange={handleProductCodeChange}
//           handleChange={handleChange}
//           handleSubmit={updateProduct}
//           setShowForm={setShowEditForm}
//           brands={brands}
//           productType={productType}
//           formErrors={formErrors}
//           autoGenerate={false}
//           isEditing={true}
//         />
//       )}
//     </>
//   );
// }

// // Reusable Modal Form Component
// function ModalForm({
//   title,
//   formData,
//   productCode,
//   handleProductCodeChange,
//   handleChange,
//   handleSubmit,
//   setShowForm,
//   brands,
//   productType,
//   formErrors,
//   autoGenerate,
//   isEditing,
// }) {

//   const isReadOnly = autoGenerate && !isEditing;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
//         <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
          
//           <input
//             type="text"
//             value={productCode}
//             onChange={handleProductCodeChange}
//             readOnly={isReadOnly}
//             className={`border px-3 py-2 rounded w-full font-mono ${isReadOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"} ${formErrors.productCode ? "border-red-500" : "border-gray-300"}`}
//             placeholder={isReadOnly ? "Code will be generated" : "Enter Product Code"}
//           />
//           {formErrors.productCode && <p className="text-red-600 text-xs">{formErrors.productCode}</p>}
          
//           <input
//             type="text"
//             name="ProductName"
//             value={formData.ProductName}
//             onChange={handleChange}
//             placeholder="Product Name"
//             className={`w-full px-3 py-2 border rounded ${formErrors.ProductName ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           />
//           {formErrors.ProductName && <p className="text-red-600 text-xs">{formErrors.ProductName}</p>}

//           <input
//             type="text"
//             name="Category"
//             value={formData.Category}
//             onChange={handleChange}
//             placeholder="Category"
//             className={`w-full px-3 py-2 border rounded ${formErrors.Category ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           />
//           {formErrors.Category && <p className="text-red-600 text-xs">{formErrors.Category}</p>}

//           <select
//             name="Brand"
//             value={formData.Brand}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded ${formErrors.Brand ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           >
//             <option value="">Select Brand</option>
//             {brands.map((b) => (
//               <option key={b._id} value={b._id}>
//                 {b.name}
//               </option>
//             ))}
//           </select>
//           {formErrors.Brand && <p className="text-red-600 text-xs">{formErrors.Brand}</p>}

//           <select
//             name="ProductType"
//             value={formData.ProductType}
//             onChange={handleChange}
//             className={`w-full px-3 py-2 border rounded ${formErrors.ProductType ? "border-red-500 bg-red-50" : "border-gray-300"}`}
//           >
//             <option value="">Select Product Type</option>
//             {productType.map((pt) => (
//               <option key={pt._id} value={pt._id}>
//                 {pt.name}
//               </option>
//             ))}
//           </select>
//           {formErrors.ProductType && <p className="text-red-600 text-xs">{formErrors.ProductType}</p>}

//           <div className="flex gap-2 pt-2">
//             <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "./ProductContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product() {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    ProductName: "",
    Category: "",
    Brand: "",
    ProductType: "",
  });

  // Global context for product code state, controlled by SystemMaster
  const { autoGenerate, productCode, setProductCode } = useProductContext();

  // Local state
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productType, setProductType] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  //const [error, setError] = useState("")
  
  // Ref to hold the prefix for auto-generation to avoid re-render loops
  const autoPrefixRef = useRef("");

  const navigate = useNavigate();

  // Fetch initial data for brands, types, and products
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

  /**
   * Effect for ADD mode: auto-generates or assists with the product code.
   */
  useEffect(() => {
    if (isEditing) return;

    const selectedBrand = brands.find((b) => b._id === formData.Brand);
    const selectedType = productType.find((pt) => pt._id === formData.ProductType);

    setProductCode(prevCode => {
        let prefix;
        if (autoGenerate) {
            prefix = autoPrefixRef.current;
        } else {
            prefix = prevCode.split('-')[0];
        }

        if (!prefix) return prevCode;

        const brandShort = selectedBrand?.shortname || "";
        const typeShort = selectedType?.shortname || "";

        const newParts = [prefix, brandShort, typeShort].filter(Boolean);
        const newCode = newParts.join("-");

        return newCode;
    });

  }, [formData.Brand, formData.ProductType, autoGenerate, isEditing, brands, productType, setProductCode]);
  
  /**
   * Effect for EDIT mode: Dynamically updates the product code when dropdowns change.
   */
  useEffect(() => {
    if (!isEditing) return;

    const selectedBrand = brands.find((b) => b._id === formData.Brand);
    const selectedType = productType.find((pt) => pt._id === formData.ProductType);

    // Rebuild the code using the original prefix and new short names
    setProductCode(prevCode => {
        const prefix = prevCode.split('-')[0] || "";
        
        const brandShort = selectedBrand?.shortname || "";
        const typeShort = selectedType?.shortname || "";

        const newParts = [prefix, brandShort, typeShort].filter(Boolean);
        return newParts.join("-");
    });
    
  }, [formData.Brand, formData.ProductType, isEditing, brands, productType, setProductCode]);


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
    // In a real app, you might want to check for duplicate names here too,
    // ensuring the new name doesn't conflict with another existing product, excluding itself.
    try {
      const payload = {
        id: editId,
        ...formData,
        productCode,
      };
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

    //     // if (!isEditing) {
//     //     const isDuplicateName = products.some(
//     //         (p) => p.ProductName.trim().toLowerCase() === formData.ProductName.trim().toLowerCase(),
//     //         (p)=> p.Brand.trim().toLowerCase() === formData.Brand.trim().toLowerCase(),
//     //     );

//     //     if (isDuplicateName) {
//     //         toast.error("A product with this name already exists.");
//     //         return;
//     //     }

//     //     const isDuplicateCombination = products.some(
//     //         (p) =>
//     //         (p.Brand?._id || p.Brand) === formData.Brand &&
//     //         (p.ProductType?._id || p.ProductType) === formData.ProductType
//     //     );

//     //     if (isDuplicateCombination) {
//     //         toast.error("A product with the same Brand and Product Type already exists.");
//     //         return;
//     //     }
//     // }


    try {
      const payload = { ...formData, productCode, autoGenerate }; // Pass autoGenerate flag
      
      const res = await axios.post("http://localhost:3000/createProduct", payload);
      
      toast.success("Product created successfully.");
      setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
      setProductCode("");
      setShowForm(false);
      fetchProducts(); // Refresh the product list
    } catch (err) {
      // This will now catch and display validation errors from the backend.
      //  setError(err.response?.data?.message || "Failed to create product");
      toast.error(err.response?.data?.message || "Failed to create product");
    }
  };

  const handleAddProductClick = async () => {
    setIsEditing(false);
    setFormErrors({});
    setFormData({ ProductName: "", Category: "", Brand: "", ProductType: "" });
    autoPrefixRef.current = ""; // Reset the auto prefix ref

    if (autoGenerate) {
        try {
            const res = await axios.get("http://localhost:3000/getProductCode");
            const prefix = res.data.code || "003";
            autoPrefixRef.current = prefix; // Store the prefix
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
      <ToastContainer position="top-right" autoClose={3000} />
      //

      <header className="fixed top-0 left-0 w-full bg-blue-700 text-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Product Manager</h1>
          <div className="space-x-4">
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
        <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
          <table className="min-w-full divide-y divide-gray-300 text-sm">
            <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
              <tr>
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
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          
          <input
            type="text"
            value={productCode}
            onChange={handleProductCodeChange}
            readOnly={isReadOnly}
            className={`border px-3 py-2 rounded w-full font-mono ${isReadOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"} ${formErrors.productCode ? "border-red-500" : "border-gray-300"}`}
            placeholder={isReadOnly ? "Code will be generated" : "Enter Product Code"}
          />
          {formErrors.productCode && <p className="text-red-600 text-xs">{formErrors.productCode}</p>}
          
          <input
            type="text"
            name="ProductName"
            value={formData.ProductName}
            onChange={handleChange}
            placeholder="Product Name"
            className={`w-full px-3 py-2 border rounded ${formErrors.ProductName ? "border-red-500 bg-red-50" : "border-gray-300"}`}
          />
          {formErrors.ProductName && <p className="text-red-600 text-xs">{formErrors.ProductName}</p>}

          <input
            type="text"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            placeholder="Category"
            className={`w-full px-3 py-2 border rounded ${formErrors.Category ? "border-red-500 bg-red-50" : "border-gray-300"}`}
          />
          {formErrors.Category && <p className="text-red-600 text-xs">{formErrors.Category}</p>}

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
