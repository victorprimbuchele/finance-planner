import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import { Form } from "../../components/abstract/Form/Form";
import { NeumorphicBox } from "../../components/abstract/Neumorphic/Box/NeumorphicBox";
import LoginFormData from "../../../data/form/login/login-form-data.json";
import { UserPayload } from "../../../store/slices/user/user";
import { userLogin } from "../../../store/slices/user/users.slice";
import { useNavigate } from "react-router-dom";
import { store, useAppDispatch } from "../../../store/store";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const { user } = store.getState();

  const handleSubmit = (payload: UserPayload) => {
    try {
      dispatch(userLogin(payload));

      navigator("/home");
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  const schema = yup.object({
    email: yup.string().email().required(),
  });

  return (
    <div className="grid grid-rows-3 place-content-center justify-center content-center h-full">
      <div className="grid grid-cols-1 text-center content-center items-center w-full justify-items-center">
        <div className=" bg-cyan-600 text-white w-fit p-4 flex">
          <h1 className="font-bold">FINANCE</h1>
          <h1>PLANNER</h1>
        </div>
      </div>
      <NeumorphicBox size="md" className="rounded-lg p-6 h-max">
        <div className="grid grid-cols-1 text-center content-center py-3 items-center text-xl font-semibold">
          <h1>Login</h1>
        </div>
        <Form
          input={LoginFormData}
          onSubmit={handleSubmit}
          schema={schema}
        ></Form>
        <div className="grid grid-cols-1 text-center content-center mb-2 mt-4 items-center text-md font-semibold text-slate-400 hover:underline hover:text-cyan-600 duration-300">
          <a href="/register">I don't have an account</a>
        </div>
      </NeumorphicBox>
    </div>
  );
};
