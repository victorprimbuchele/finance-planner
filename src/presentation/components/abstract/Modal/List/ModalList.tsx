import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePayload } from "../../../../../store/slices/default-methods-type";
import { ModalListProps } from "./modal-list-types";
import { ModalListRow } from "./Row/ModalListRow";

export const ModalList: React.FC<ModalListProps> = ({
  deleteAnything,
  fetchAnything,
  isFetched,
  dataArray,
  updateAnything,
}) => {
  const dispatch = useDispatch();

  const update = (id: number | string, name: string) => {
    dispatch(
      updateAnything({
        id: id,
        name: name,
      })
    );
  };

  const handleDelete = (id: number | string) => {
    dispatch(deleteAnything(id));
  };

  useEffect(() => {
    if (!isFetched) dispatch(fetchAnything());
  }, []);

  return (
    <>
      {dataArray.map((data) => {
        return (
          <ModalListRow
            id={data.id}
            name={data.name}
            foreignKey={data.foreignKey}
            handleDelete={handleDelete}
            key={data.id}
            updateAnything={update}
          />
        );
      })}
    </>
  );
};
