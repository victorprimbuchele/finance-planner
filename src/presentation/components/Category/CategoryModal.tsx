// Third
import * as yup from "yup";
import { useSelector } from "react-redux";

// My
import CategoryFormData from "../../../data/form/category/category-form-data.json";
import { RootState, useAppDispatch } from "../../../store/store";
import {
  addNewCategory,
  removeCategoryFromList,
  setCategoryList,
  setIsFetched,
  updateCategoryInList,
} from "../../../store/slices/category/category.slice";
import { CategoryFormPayload } from "../../../store/slices/category/category";
import { ModalCrud } from "../abstract/Modal/CRUD/ModalCRUD";

export const CategoryModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const categories = useSelector((state: RootState) => state.category);

  const schema = yup.object({
    category: yup.string().required().min(3),
  });

  const handleSubmit = async (payload: CategoryFormPayload) => {
    try {
      await dispatch(addNewCategory(payload.category));
      document.getElementById(CategoryFormData[0].name)!.value = "";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ModalCrud
      icon="bars"
      inputData={CategoryFormData}
      dataArray={categories.categories}
      handleSubmit={handleSubmit}
      schema={schema}
      setters={{
        setUpdate: updateCategoryInList,
        setFetch: setCategoryList,
        setLoading: setIsFetched,
        setDelete: removeCategoryFromList,
      }}
      isFetched={categories.isFetched}
      url="/categories"
      titleMobile="Categories"
    />
  );
};
