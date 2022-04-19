import React from "react";
import { InputParams } from "../input-params";
import { InputSelect } from "../Select/InputSelect";

export const InputSimple: React.FC<InputParams> = ({
  register,
  errors,
  item,
  id,
}: InputParams) => {
  return (
    <>
      <label key={id + "label"} className="font-medium" htmlFor={item.name}>
        {item.label}
      </label>
      {item.options ? (
        <InputSelect register={register} errors={errors} item={item} id={id} />
      ) : (
        <>
          <input
            className="font-semibold outline-none shadow-outline text-cyan-700 w-full"
            {...register(item.name, { required: item.required })}
            type={item.type}
            placeholder={item.placeholder}
            key={id + "input"}
          />
          {errors[item.name] && (
            <span className="text-red-600">{item.errors}</span>
          )}
        </>
      )}
    </>
  );
};
