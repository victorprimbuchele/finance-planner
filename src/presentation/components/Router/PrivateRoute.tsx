import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import { LoaderSpinner } from "../abstract/Loader/Spinner";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
}: PrivateRouteProps) => {
  const { user } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    /** Caso o token na localStorage seja uma string vazia,
     *  verificar o status da requisição do login,
     *  caso esteja carregando, não fazer nada,
     *  caso esteja carregado, redirecionar para a página de login
     * */
    if (
      localStorage.getItem("token") === "" ||
      !localStorage.getItem("token")
    ) {
      if (user.status === "loading") {
        setIsLoading(true);
        return;
      }
      navigate("/");
      return;
    }
    setIsLoading(false);
  }, [localStorage.getItem("token"), user.status]);

  return (
    <div className="App w-full h-full">
      {isLoading ? <LoaderSpinner /> : <>{children}</>}
    </div>
  );
};
