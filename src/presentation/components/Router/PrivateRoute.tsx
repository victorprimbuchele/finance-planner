import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState, store } from "../../../store/store";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
}: PrivateRouteProps) => {
  const { user } = store.getState();

  return (
    <div className="App w-full h-full">
      {user.status === "loading" ? (
        <>
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
          Loading...
        </>
      ) : (
        <>
          {/* Acessar rotas privadas a partir do bool isAuth */}
          {localStorage.getItem("isAuth") === "true" ? (
            children
          ) : (
            // Caso não esteja logado, redireciona para a rota de login
            <Navigate to="/" replace />
          )}
        </>
      )}
    </div>
  );
};
