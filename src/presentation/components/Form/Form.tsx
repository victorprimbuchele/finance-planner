import React from "react";
import { useForm } from "react-hook-form";

import { FormParams } from "./form-types";
import { InputGrouped } from "./Input/Grouped/InputGrouped";
import { InputSimple } from "./Input/Simple/InputSimple";

export const Form: React.FC<FormParams> = ({ input, children, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {input.map((item, idx) =>
        item.grouped ? (
          <div
            key={`${item.name}@${idx}`}
            className={`grid grid-cols-2 gap-2 my-2 shadow-md rounded-xl py-2 px-3`}
          >
            <InputGrouped
              register={register}
              errors={errors}
              item={item}
              id={`${item.name}@${idx}`}
            />
          </div>
        ) : (
          <div
            key={`${item.name}@${idx}`}
            className="shadow-md py-2 px-3 rounded-xl"
          >
            <InputSimple
              register={register}
              errors={errors}
              item={item}
              id={`${item.name}@${idx}`}
            />
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
