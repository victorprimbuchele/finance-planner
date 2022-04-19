import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as yup from "yup";

import { Form } from "../../components/Form/Form";
import { NeumorphicBox } from "../../components/Neumorphic/Box/Box";
import RegisterFormData from "../../../data/form/register/register-form-data.json";
import { UserPayload } from "../../../store/slices/user/user";
import { addNewUser } from "../../../store/slices/user/users.slice";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (payload: UserPayload) => {
    try {
      await dispatch(addNewUser(payload));
      console.log(payload);
    } catch (error) {
      console.error("Failed to create new user", error);
    }
  };

  const schema = yup.object({
    name: yup.string().required().min(4),
    age: yup.number().positive().integer().required(),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    password: yup.string().required().min(8),
    confirmPassword: yup.string().required().min(8),
  });

  return (
    <div className="grid place-content-center justify-center content-center h-full">
      <NeumorphicBox size="md" className="rounded-lg p-6">
        <div className="grid grid-cols-3 text-center content-center py-3 mb-5 items-center text-xl font-semibold">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className=" p-3 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1>Register</h1>
        </div>
        <div>
          <Form
            input={RegisterFormData}
            onSubmit={handleSubmit}
            schema={schema}
          ></Form>
        </div>
      </NeumorphicBox>
    </div>
  );
};
