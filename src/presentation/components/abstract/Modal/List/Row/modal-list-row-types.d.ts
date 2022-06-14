import { AsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit";
import { DataCreateCategory } from "../../../../../../store/slices/category/category";
import { UpdatePayload } from "../../../../../../store/slices/default-methods-type";
import { DateCreateAnything } from "../modal-list-types";

export interface ModalListRowProps extends DateCreateAnything {
  updateAnything: (id: number | string, name: string) => void;
  handleDelete: (id: number | string) => void;
}
