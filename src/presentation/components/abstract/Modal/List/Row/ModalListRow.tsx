import React, { useState } from "react";
import {
  faCheck,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalListRowProps } from "./modal-list-row-types";

export const ModalListRow: React.FC<ModalListRowProps> = ({
  id,
  name,
  updateAnything,
  handleDelete,
}) => {
  const [edit, setEdit] = useState(false);
  const [categoryName, setCategoryName] = useState(name);

  const handleSubmitUpdate = () => {
    updateAnything(id, categoryName);
    setEdit(false);
  };

  return (
    <div
      id={`div-${name}-${id}`}
      className="flex flex-row w-full my-2 justify-between"
    >
      {edit ? (
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      ) : (
        <p>{name}</p>
      )}
      <div className="mr-2">
        {edit ? (
          <FontAwesomeIcon
            icon={faCheck}
            className="mr-4 cursor-pointer"
            onClick={handleSubmitUpdate}
          />
        ) : (
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="mr-4 cursor-pointer"
            onClick={() => setEdit(true)}
          />
        )}

        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => handleDelete(id)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
