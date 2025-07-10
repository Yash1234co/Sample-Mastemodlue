// import axios from "axios"
// import { useEffect, useState } from "react"

// export default function SystemMaster() {
//     const [brands, setbrands] = useState([])
//     const [error, setError] = useState('')
//     const [brandname, setbrandname] = useState("")
//     const [ShowForm, setShowForm] = useState(false)
//     //  for Product type 
//     const [productType, setproductType] = useState([])
//     const [prodcttypename, setproductTypename] = useState("")
//     const [showformType, setShowFormType] = useState(false)

//     const fetchbrands = async () => {
//         try {
//             const res = await axios.get("http://localhost:3000/getBrand")
//             if (res.status === 200) {
//                 const data = res.data
//                 const brandasarray = Array.isArray(data) ? data : data.brands || []
//                 setbrands(brandasarray)
//             }
//         }
//         catch (err) {
//             console.error("Fetch error:", err);
//             setError("Failed to fetch Brands");
//         }
//     }

//     const fetchProductType = async () => {
//         try {
//             const res = await axios.get("http://localhost:3000/getProductType")
//             if (res.status === 200) {
//                 const data = res.data
//                 const productTypearray = Array.isArray(data) ? data : data.prodcttypename || []
//                 setproductType(productTypearray)

//             }

//         }
//         catch (err) {
//             console.error("Fetch error:", err);
//             setError("Failed to fetch Products");
//         }
//     }

//     useEffect(() => {
//         fetchbrands()
//         fetchProductType()
//     }, [])

//     const handlecancel = async () => {
//         setShowForm(false)
//         setbrandname("")
//         setError("")
//     }
//     const handleProductType = async () => {
//         setShowFormType(false)
//         setproductTypename("")
//         setError("")
//     }

//     const addBrand = async () => {
//         try {
//             const res = await axios.post("http://localhost:3000/createBrand", {
//                 name: brandname.trim()
//             })
//             const newBrand = res.data.brand || res.data.createBrand
//             setbrands((prev) => [...prev, newBrand])
//             setbrandname("")
//             setShowForm(false)
//         }
//         catch (err) {
//             console.error("Fetch error:", err);
//             setError("Failed to fetch Brands");
//         }
//     }

//     const addProductType = async () => {
//         try {
//             const res = await axios.post("http://localhost:3000/createProductType", {
//                 name: prodcttypename.trim()
//             })
//             const newProductType = res.data.producttype || res.data.createproductType
//             setproductType((prev) => [...prev, newProductType])
//             setproductTypename("")
//             setShowFormType(false)

//         }
//         catch (err) {
//             console.error("Fetch error:", err);
//             setError("Failed to fetch Brands");
//         }
//     }
//     return (
//         <>
//             <div className="flex flex-wrap justify-center gap-6 mt-10">
//                 <div className="w-full md:w-[300px] border rounded shadow-md">

//                     <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-300">
//                         <h2 className="font-semibold ">Brands</h2>

//                         <button className="text-xl font-bold  hover:text-white"
//                             onClick={() => setShowForm((prev) => !prev)}>+</button>

//                     </div>
//                     <div className=" flex items-center justify-center">
//                         {error && <p className="font-semibold text-red-600">{error}</p>}
//                     </div>

//                     <div className="px-3 py-2">
//                         <div className="grid gap-2">
//                             {Array.isArray(brands) && brands.map((brand) => (
//                                 <div key={brand._id}
//                                     className="p-3 border-b rounded bg-gray-100 shadow-sm">
//                                     {brand.name}
//                                 </div>
//                             ))}
//                         </div>

//                     </div>
//                     {ShowForm && (
//                         <div className="flex items-center gap-2 px-3 py-2">
//                             <input
//                                 type="text"
//                                 className="flex-1 px-3 py-2 border rounded"
//                                 placeholder="Enter the Brand name"
//                                 value={brandname}
//                                 onChange={(e) => {
//                                     setbrandname(e.target.value);
//                                     if (error) setError("");
//                                 }}
//                             />
//                         </div>
//                     )}
//                     <div className="flex space-y-2 gap-2">
//                         <button
//                             onClick={addBrand}
//                             className="flex-1 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
//                             save
//                         </button>

//                         <button
//                             onClick={handlecancel}
//                             className="flex-1 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 transition ">
//                             cancel
//                         </button>
//                     </div>
//                 </div>
//                 {/* {for Product Type} */}
//                 <div className="w-full md:w-[300px] border rounded shadow-md bg-white">
//                     {/* Header */}
//                     <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-300">
//                         <h2 className="font-semibold">Product Type</h2>
//                         <button
//                             className="text-xl font-bold hover:text-white hover:bg-gray-600 transition px-2 py-1 rounded"
//                             onClick={() => setShowFormType((prev) => !prev)}
//                         >
//                             +
//                         </button>
//                     </div>
//                     <div className="px-3 py-2">
//                         <div className="grid gap-2">
//                             {Array.isArray(productType) &&
//                                 productType
//                                     .filter((product) => product && product.name && product._id)
//                                     .map((product) => (
//                                         <div key={product._id} className="p-3 border-b rounded bg-gray-100 shadow-sm">
//                                             {product.name}
//                                         </div>
//                                     ))}

//                         </div>
//                     </div>

//                     {showformType && (
//                         <div className="p-4 space-y-4">
//                             <input
//                                 type="text"
//                                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 value={prodcttypename}
//                                 onChange={(e) => {
//                                     setproductTypename(e.target.value);
//                                     if (error) setError("");
//                                 }}
//                                 placeholder="Enter the product type"
//                             />

//                             <div className="flex gap-3">
//                                 <button
//                                     onClick={addProductType}
//                                     className="flex-1 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//                                 >
//                                     Save
//                                 </button>

//                                 <button
//                                     onClick={handleProductType}
//                                     className="flex-1 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//             </div>
//         </>
//     )
// }



import axios from "axios";
import { useEffect, useState } from "react";

export default function SystemMaster() {
    const [brands, setbrands] = useState([]);
    const [error, setError] = useState("");
    const [brandname, setbrandname] = useState("");
    const [ShowForm, setShowForm] = useState(false);

    const [productType, setproductType] = useState([]);
    const [prodcttypename, setproductTypename] = useState("");
    const [showformType, setShowFormType] = useState(false);

    // Fetch all brands
    const fetchbrands = async () => {
        try {
            const res = await axios.get("http://localhost:3000/getBrand");
            if (res.status === 200) {
                const data = res.data;
                const brandasarray = Array.isArray(data.brands)
                    ? data.brands
                    : Array.isArray(data)
                        ? data
                        : [];
                setbrands(brandasarray);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to fetch Brands");
        }
    };

    // Fetch all product types
    const fetchProductType = async () => {
        try {
            const res = await axios.get("http://localhost:3000/getProductType");
            if (res.status === 200) {
                const data = res.data;
                const productTypearray = Array.isArray(data.producttype)
                    ? data.producttype
                    : Array.isArray(data)
                        ? data
                        : [];
                setproductType(productTypearray);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to fetch Products");
        }
    };

    useEffect(() => {
        fetchbrands();
        fetchProductType();
    }, []);

    // Reset brand form
    const handlecancel = () => {
        setShowForm(false);
        setbrandname("");
        setError("");
    };

    // Reset product type form
    const handleProductType = () => {
        setShowFormType(false);
        setproductTypename("");
        setError("");
    };

    // Add brand
    const addBrand = async () => {
        try {
            const res = await axios.post("http://localhost:3000/createBrand", {
                name: brandname.trim(),
            });
            const newBrand = res.data.brand || res.data.createBrand;
            if (newBrand && newBrand.name && newBrand._id) {
                setbrands((prev) => [...prev, newBrand]);
            } else {
                fetchbrands(); // fallback if response is not proper
            }
            setbrandname("");
            setShowForm(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to add Brand");
        }
    };

    // Add product type
    const addProductType = async () => {
        try {
            await axios.post("http://localhost:3000/createProductType", {
                name: prodcttypename.trim(),
            });
            await fetchProductType(); // re-fetch to get updated list
            setproductTypename("");
            setShowFormType(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to add Product Type");
        }
    };

    return (
        <div className="flex flex-wrap justify-center gap-6 mt-10">
            {/* Brand Card */}
            <div className="w-full md:w-[300px] border rounded shadow-md bg-white">
                <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-300">
                    <h2 className="font-semibold">Brands</h2>
                    <button
                        className="text-xl font-bold hover:text-white hover:bg-gray-600 transition px-2 py-1 rounded"
                        onClick={() => setShowForm((prev) => !prev)}
                    >
                        +
                    </button>
                </div>

                {error && (
                    <div className="px-4 py-2 text-red-600 font-semibold">{error}</div>
                )}

                <div className="px-3 py-2">
                    <div className="grid gap-2">
                        {Array.isArray(brands) &&
                            brands
                                .filter((b) => b && b.name && b._id)
                                .map((brand) => (
                                    <div
                                        key={brand._id}
                                        className="p-3 border-b rounded bg-gray-100 shadow-sm"
                                    >
                                        {brand.name}
                                    </div>
                                ))}
                    </div>
                </div>

                {ShowForm && (
                    <div className="flex items-center gap-2 px-3 py-2">
                        <input
                            type="text"
                            className="flex-1 px-3 py-2 border rounded"
                            placeholder="Enter the Brand name"
                            value={brandname}
                            onChange={(e) => {
                                setbrandname(e.target.value);
                                if (error) setError("");
                            }}
                        />
                    </div>
                )}

                <div className="flex justify-between gap-2 px-3 py-2">
                    <button
                        onClick={addBrand}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Save
                    </button>

                    <button
                        onClick={handlecancel}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                </div>

            </div>

            {/* Product Type Card */}
            <div className="w-full md:w-[300px] border rounded shadow-md bg-white">
                <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-300">
                    <h2 className="font-semibold">Product Type</h2>
                    <button
                        className="text-xl font-bold hover:text-white hover:bg-gray-600 transition px-2 py-1 rounded"
                        onClick={() => setShowFormType((prev) => !prev)}
                    >
                        +
                    </button>
                </div>

                <div className="px-3 py-2">
                    <div className="grid gap-2">
                        {Array.isArray(productType) &&
                            productType
                                .filter((p) => p && p.name && p._id)
                                .map((product) => (
                                    <div
                                        key={product._id}
                                        className="p-3 border-b rounded bg-gray-100 shadow-sm"
                                    >
                                        {product.name}
                                    </div>
                                ))}
                    </div>
                </div>

                {showformType && (
                    <div className="p-4 space-y-4">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={prodcttypename}
                            onChange={(e) => {
                                setproductTypename(e.target.value);
                                if (error) setError("");
                            }}
                            placeholder="Enter the product type"
                        />

                       
                    </div>
                )}
                 <div className="flex justify-between gap-2 px-3 py-2">
                            <button
                                onClick={addProductType}
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                                Save
                            </button>

                            <button
                                onClick={handleProductType}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        </div>
            </div>
        </div>
    );
}
