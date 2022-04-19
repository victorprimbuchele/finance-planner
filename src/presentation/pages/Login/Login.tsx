import React from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as yup from "yup";

import { Form } from "../../components/Form/Form";
import { NeumorphicBox } from "../../components/Neumorphic/Box/Box";
import LoginFormData from "../../../data/form/login/login-form-data.json";
import { UserPayload } from "../../../store/slices/user/user";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const handleSubmit = async (payload: UserPayload) => {
    console.log(payload);
    // try {
    //   await dispatch(userLogin(payload));
    //   console.log(payload);
    // } catch (error) {
    //   console.error("Failed to create new user", error);
    // }
  };

  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  return (
    <div className="grid place-content-center justify-center content-center h-full">
      <NeumorphicBox size="md" className="rounded-lg p-6">
        <div className="grid grid-cols-1 text-center content-center py-3 mb-5 items-center text-xl font-semibold">
          <h1>Login</h1>
        </div>
        <div>
          <Form
            input={LoginFormData}
            onSubmit={handleSubmit}
            schema={schema}
          ></Form>
        </div>
      </NeumorphicBox>
    </div>
  );
};
