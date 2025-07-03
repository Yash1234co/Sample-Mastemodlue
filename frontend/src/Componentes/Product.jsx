import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Product(){

    const [Showform,setShowform]=useState(false)
    const [formdata,setformdata]=useState({
        ProductName:"",
        Category:"",
        Brand:"",
        ProductType:""
    })
    const [Products, setProducts]=useState([])
    const [error,setError]=useState('')
    const navigate=useNavigate()


    useEffect(()=>{
        const fetchProducts = async()=>{
            try{
                const res=await axios.get("http://localhost:3000/products")
                if(res.status===200) setProducts(res.data)
            }
        catch(err){
            console.error("error ");
            setError("failed to fetching data",err.message)       
        }
        }
        fetchProducts()
    },[Showform])

    async function handleChnage (e) {
       const {name,value}=e.target
     setformdata((prev)=>({...prev,[name]: value}))
    }

    async function handlesubmit(e){
         e.preventDefault();
         setError("")
         try{
            const res=await axios.post("http://localhost:3000/createProduct",{...formdata} )
            if(res.status===200)
                setformdata({ProductName:"",Category:"",Brand:"",ProductType})
            setShowform(false)
         }
         catch(err){
            setError('failed create sample'

            )
         }
    }
    
    return(
        <>
    <header className=" fixed left-0  top-0 w-full  bg-blue-600 text-white shadow-md">
        <div className="w-full px-6 py-3  r">
            <nav className=" ">
                <div className=" flex justify-evenly ">
                <button className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100  transition ">
                   +Add Products
                </button>

                <button 
                onClick={()=>navigate('/')}
                className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100  transition ">
                 Back
                </button>
              </div>
            </nav>

        </div>

    </header>

       <div className=" overflow-x-auto m-[5.25rem] rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
          <thead className="bg-gray-100">
           <tr>
            <th className="px-6 py-3 bg-gray-300">ProductName</th>
            <th className="px-6 py-3 bg-gray-300">Category</th>
            <th className="px-6 py-3 bg-gray-300">Brand</th>
            <th className="px-6 py-3 bg-gray-300">ProductType</th>
           </tr>
          </thead>
           <tbody className="bg-white divide-y divide-gray-200">
            {Products.map((product,index)=>{
                <tr key={index}>
                   <td className="px-6 py-3">{product.ProductName} </td>
                   <td className="px-6 py-3">{product.Category}</td>
                   <td className="px-6 py-3">{product.Brand}</td>
                   <td className="px-6 py-3 ">{product.ProductType}</td>
                </tr>
            })}

        

           </tbody>
        </table>

       </div>
        </>

    )
}