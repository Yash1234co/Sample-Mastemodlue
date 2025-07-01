import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sample from "./Componentes/Sample";
import AddCommentPage from "./Componentes/Comments";
import SampleImageManager from "./Componentes/images";
import Product from "./Componentes/Products";

export default function App() {
  return (
    <Router>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Product/>}/>
          <Route path="/sample" element={<Sample />} />
          <Route path="/sample/:sampleId/comments" element={<AddCommentPage />} />
          <Route path="/sample/:sampleId/upload-image" element={<SampleImageManager />} /> {/* Add this */}
        </Routes>
      </div>
    </Router>
  );
}
