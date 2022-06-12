import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategory,
} from "../../../../store/slices/category/category.slice";
import { RootState } from "../../../../store/store";
import { CategoryListRow } from "./row/CategoryRow";

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
          <CategoryListRow
            id={category.id}
            name={category.name}
            userId={category.userId}
            handleDelete={handleDelete}
            key={category.id}
          />
        );
      })}
    </>
  );
};
