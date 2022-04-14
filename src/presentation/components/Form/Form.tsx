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
  display?: "flex" | "grid";
  gridCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  gridGap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  grouped: boolean;
  group?: InputProps[];
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
      {input.map((item) =>
        item.grouped ? (
          <div
            key={item.name}
            className={`grid grid-cols-${item.gridCols} gap-${item.gridGap}`}
          >
            <div key={item.name}>
              <label htmlFor={item.name}>{item.label}</label>
              <input
                {...register(item.name, { required: item.required })}
                type={item.type}
                placeholder={item.placeholder}
              />
              {errors[item.name] && <span>{item.errors}</span>}
            </div>
            {item.group &&
              item.group.map((subitem, i) => (
                <div key={item.name}>
                  <label htmlFor={subitem.name}>{subitem.label}</label>
                  <input
                    key={`${subitem.name}@`}
                    {...register(subitem.name, { required: subitem.required })}
                    type={subitem.type}
                    placeholder={subitem.placeholder}
                  />
                  {errors[subitem.name] && <span>{subitem.errors}</span>}
                </div>
              ))}
          </div>
        ) : (
          <div
            key={item.name}
            className={
              item.gridCols &&
              `${item.gridCols}` + item.gridGap &&
              `${item.gridGap}`
            }
          >
            <label htmlFor={item.name}>{item.label}</label>
            <input
              {...register(item.name, { required: item.required })}
              type={item.type}
              placeholder={item.placeholder}
            />
            {errors[item.name] && <span>{item.errors}</span>}
          </div>
        )
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
