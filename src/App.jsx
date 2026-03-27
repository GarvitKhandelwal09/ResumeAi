import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

import Analyzer from "./pages/analyse";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/analyze" element={<Analyzer />} />
      </Routes>
    </Router>
  );
}

export default App;