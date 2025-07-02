import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="bg-gray-400 w-64 h-screen text-black sticky top-0 rounded-md">
      <div className="flex flex-col px-4 py-6  space-y-4">
        <button
          className="bg-slate-100 rounded-md px-6 py-2 hover:bg-black hover:text-white transition"
          onClick={() => navigate('/products')}
        >
          Products
        </button>

        <button
          className="bg-slate-100 rounded-md px-6 py-2 hover:bg-black hover:text-white transition"
          onClick={() => navigate('/sample')}
        >
          Sample
        </button>
      </div>
    </aside>
  );
}
