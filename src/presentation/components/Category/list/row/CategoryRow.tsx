import React, { useState } from "react";
import {
  faCheck,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataCreateCategory } from "../../../../../store/slices/category/category";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../../../../store/slices/category/category.slice";

interface CategoryListRow extends DataCreateCategory {
  handleDelete: (id: number | string) => void;
}

export const CategoryListRow: React.FC<CategoryListRow> = ({
  id,
  name,
  handleDelete,
}) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [categoryName, setCategoryName] = useState(name);

  const handleSubmitUpdate = () => {
    dispatch(updateCategory({ id, name: categoryName }));
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
