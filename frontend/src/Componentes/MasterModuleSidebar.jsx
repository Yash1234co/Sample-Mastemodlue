import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <>
    <aside className="fixed  left-0 w-64 h-screen bg-[#1C2532] text-white shadow-lg z-50 rounded-tr-2xl rounded-br-2xl">
      <div className="flex flex-col px-4 pt-4">
        <h2 className="text-xl font-semibold text-center mb-3">Dashboard</h2>

        <button
          className="bg-gray-100 text-[#1C2532] font-semibold rounded-lg px-4 py-2 mb-2 hover:bg-black hover:text-white transition-all duration-200"
          onClick={() => navigate('/products')}
        >
          Products
        </button>

        <button
          className="bg-gray-100 text-[#1C2532] font-semibold rounded-lg px-4 py-2 hover:bg-black hover:text-white transition-all duration-200"
          onClick={() => navigate('/sample')}
        >
          Sample
        </button>
      </div>
    </aside>


</>
  );
}
