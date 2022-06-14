import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategory,
  updateCategory,
} from "../../../../store/slices/category/category.slice";
import { RootState } from "../../../../store/store";
import { ModalListRow } from "../../abstract/Modal/List/Row/ModalListRow";

export const CategoryModalList: React.FC = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.category);

  const handleDelete = (id: number | string) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    if (!categories.isFetched) dispatch(fetchCategory());
  }, []);

  return (
    <>
      {categories.categories.map((category) => {
        return (
          <ModalListRow
            id={category.id}
            name={category.name}
            handleDelete={handleDelete}
            key={category.id}
            updateAnything={update}
          />
        );
      })}
    </>
  );
};
