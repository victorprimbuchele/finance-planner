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
  gridCols?: string | number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  gridGap?: string | number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  grouped: boolean;
  group?: InputProps[];
  min?: number;
  max?: number;
  class?: any;
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
            className={`grid grid-cols-2 gap-2 my-2 shadow-md rounded-xl py-2 px-3`}
          >
            <div key={item.name} className="flex w-fit flex-col ">
              <label className="font-medium" htmlFor={item.name}>
                {item.label}
              </label>
              <input
                min={item.min ? item.min : 0}
                max={item.max ? item.max : 0}
                {...register(item.name, { required: item.required })}
                type={item.type}
                placeholder={item.placeholder}
                className={` ${item.class} font-semibold outline-none shadow-outline text-cyan-700`}
              />
              {errors[item.name] && <span>{item.errors}</span>}
            </div>
            {item.group &&
              item.group.map((subitem, i) => (
                <div key={item.name} className="flex w-fit flex-col ">
                  <label
                    htmlFor={subitem.name}
                    className="w-fit mr-4 font-medium"
                  >
                    {subitem.label}
                  </label>
                  <input
                    min={subitem.min ? subitem.min : 0}
                    max={subitem.max ? subitem.max : 0}
                    className={`w-fit ${subitem.class} font-semibold outline-none shadow-outline  text-cyan-700`}
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
          <div key={item.name} className="shadow-md py-2 px-3 rounded-xl">
            <label className="font-medium" htmlFor={item.name}>
              {item.label}
            </label>
            <input
              className="font-semibold outline-none shadow-outline text-cyan-700 w-full"
              {...register(item.name, { required: item.required })}
              type={item.type}
              placeholder={item.placeholder}
            />
            {errors[item.name] && <span>{item.errors}</span>}
          </div>
        )
      )}
      <div className="w-100 justify-center flex  mt-8">
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-stone-700 rounded-xl px-5 py-2 text-white font-normal text-lg duration-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
