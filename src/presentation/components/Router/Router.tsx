import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../../pages/Home/Home";
import { Login } from "../../pages/Login/Login";
import { Register } from "../../pages/Register/Register";
import { PrivateRoute } from "./PrivateRoute";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
