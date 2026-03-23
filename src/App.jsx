import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // 
import AuthPage from "./pages/AuthPage";
import Men from "./pages/Men";
import Women from "./pages/Women";
import AdminDashboard from "./admin/AdminDashboard";
import Ttt from "./pages/Ttt";


export default function App() {
  return (
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/t" element={<Ttt/>} />


      </Routes>
  );
}