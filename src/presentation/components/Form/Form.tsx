import React from "react";
import { useForm } from "react-hook-form";

interface FormParams {
  input: InputProps[];
  children?: React.ReactNode;
}

type InputProps = {
  placeholder?: string;
  required: boolean;
  type: string;
  name: string;
  label: string;
  errors?: string;
};

export const Form: React.FC<FormParams> = ({ input, children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {input.map((item) => (
        <div key={item.name}>
          <label htmlFor={item.name}>{item.label}</label>
          <input
            {...register(item.name, { required: item.required })}
            type={item.type}
            placeholder={item.placeholder}
          />
          {errors[item.name] && <span>{item.errors}</span>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
