import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sample from "./Componentes/Sample";
import AddCommentPage from "./Componentes/Comments";
import SampleImageManager from "./Componentes/images";
import Sidebar from "./Componentes/MasterModuleSidebar";
import Product from "./Componentes/Product";
import SystemMaster from "./Componentes/SystemMasterdata";
import { ProductContexts } from "./Componentes/ProductContext";

export default function App() {
  return (
    <ProductContexts>
    <Router>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Sidebar/>}/>
          <Route path="/sample" element={<Sample />} />
          <Route path="/sample/:sampleId/comments" element={<AddCommentPage />} />
          <Route path="/sample/:sampleId/upload-image" element={<SampleImageManager />} /> 
          <Route path="/products" element={<Product/>}/>
          <Route path="/System" element={<SystemMaster/>}/>
        </Routes>
      </div>
    </Router>
    </ProductContexts>
 
  );
}