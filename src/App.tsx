import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/auth");
    } else {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-center items-center gap-4">
      <Routes>
        <Route path="/" element={<div>Loading ...</div>}></Route>
        <Route path="/auth" element={<LoginPage />}></Route>
        <Route path="/dashboard" element={<DashboardPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
