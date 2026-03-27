import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate(); // 2. Initialize the function inside your component

  return (
    <nav className="flex justify-between items-center p-5 bg-white shadow">
      <h1 className="text-xl font-bold text-black">ResumeAI</h1>
      <button onClick ={()=> navigate("/analyze")}className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
        Get Started
      </button>
    </nav>
  );
}

export default Navbar;
