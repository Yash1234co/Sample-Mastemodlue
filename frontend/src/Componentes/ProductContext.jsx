import { createContext,useContext,useState } from "react";

const ProductContext=createContext();

export const ProductContexts =({children})=>{
    const [autoGenerate,setAutoGenerate]=useState(false)
    const [productCode,setProductCode]=useState("")
    return(
        <ProductContext.Provider
        value={{
            autoGenerate,
            setAutoGenerate,
            productCode,
            setProductCode
        }}
        >
              {children}
        </ProductContext.Provider>
    )

}

export const useProductContext = () => useContext(ProductContext);