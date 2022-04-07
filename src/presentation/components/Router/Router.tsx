import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "../../pages/Register/Register";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
