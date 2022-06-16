import { useEffect } from "react";
import { ModalListProps } from "./modal-list-types";
import { ModalListRow } from "./Row/ModalListRow";

export const ModalList: React.FC<ModalListProps> = ({
  deleteAnything,
  fetchAnything,
  isFetched,
  dataArray,
  updateAnything,
}) => {
  useEffect(() => {
    if (!isFetched) fetchAnything();
  }, []);

  return (
    <>
      {dataArray.map((data) => {
        return (
          <ModalListRow
            id={data.id}
            name={data.name}
            foreignKey={data.foreignKey}
            handleDelete={deleteAnything}
            key={data.id}
            updateAnything={updateAnything}
          />
        );
      })}
    </>
  );
};
