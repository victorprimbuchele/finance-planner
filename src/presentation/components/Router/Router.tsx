import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../../pages/Login/Login";
import { Register } from "../../pages/Register/Register";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
