import React, { useState } from "react";
import {
  faCheck,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalListRowProps } from "./modal-list-row-types";
import {
  handleDelete,
  handleUpdate,
} from "../../../handlers/CRUD/handlersCRUD";

export const ModalListRow: React.FC<ModalListRowProps> = ({
  id,
  name,
  setUpdate,
  setDelete,
  url,
}) => {
  const [edit, setEdit] = useState(false);
  const [categoryName, setCategoryName] = useState(name);

  const handleSubmitUpdate = () => {
    handleUpdate({
      url,
      payload: { id, name: categoryName },
      setter: setUpdate,
    });
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
          onClick={() => handleDelete({ id, setter: setDelete, url })}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
