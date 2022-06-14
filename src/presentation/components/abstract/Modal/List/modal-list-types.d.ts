import { AsyncThunk } from "@reduxjs/toolkit";
import { UpdatePayload } from "../../../../../store/slices/default-methods-type";

export type ModalListProps = {
  deleteAnything: (id: number | string) => void;
  fetchAnything: () => void;
  isFetched: boolean;
  dataArray: DateCreateAnything[];
  updateAnything: (id: number | string, name: string) => void;
};

export type DateCreateAnything = {
  id: number | string;
  name: string;
  foreignKey?: number;
};
