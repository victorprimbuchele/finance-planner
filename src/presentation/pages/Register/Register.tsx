import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form } from "../../components/Form/Form";
import { NeumorphicBox } from "../../components/Neumorphic/Box/Box";
import RegisterFormData from "../../../data/form/register/register-form-data.json";

export const Register: React.FC = () => {
  return (
    <div className="grid place-content-center ">
      <NeumorphicBox size="md" className="rounded-lg p-4">
        <div className="grid grid-cols-3 text-center content-center py-3">
          <FontAwesomeIcon icon={faChevronLeft} />
          <h1>Register</h1>
        </div>
        <div>
          <Form input={RegisterFormData}></Form>
        </div>
      </NeumorphicBox>
    </div>
  );
};
