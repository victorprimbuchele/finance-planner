import { AsyncThunk } from "@reduxjs/toolkit";
import { UpdatePayload } from "../../../../../store/slices/default-methods-type";

export type ModalListProps = {
  deleteAnything: AsyncThunk<void, string | number, {}>;
  fetchAnything: AsyncThunk<void, void, {}>;
  isFetched: boolean;
  dataArray: DateCreateAnything[];
  updateAnything: AsyncThunk<void, UpdatePayload, {}>;
};

export type DateCreateAnything = {
  id: number | string;
  name: string;
  foreignKey?: number;
};
