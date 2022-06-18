// third
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { AnyObject } from "yup/lib/types";
import { OptionalObjectSchema, TypeOfShape } from "yup/lib/object";
// my
import { DateCreateAnything, SetterObject } from "../List/modal-list-types";
import { InputProps } from "../../Form/form-types";

export type ModalCRUDProps = {
  icon: IconName;
  inputData: InputProps[];
  handleSubmit: (value: any) => void;
  schema: OptionalObjectSchema<
    {
      [x: string]: any;
    },
    AnyObject,
    TypeOfShape<{
      [x: string]: any;
    }>
  >;
  setters: SetterObject;
  dataArray: DateCreateAnything[];
  isFetched: boolean;
  url: string;
  titleMobile: string;
};
