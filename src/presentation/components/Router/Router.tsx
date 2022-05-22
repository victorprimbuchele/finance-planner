import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "../../../store/store";
import { Home } from "../../pages/Home/Home";
import { Login } from "../../pages/Login/Login";
import { Register } from "../../pages/Register/Register";
import { PrivateRoute } from "./PrivateRoute";

export const Router: React.FC = () => {
  const { user } = store.getState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};
