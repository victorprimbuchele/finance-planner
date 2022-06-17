// Third
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import * as yup from "yup";

// My
import { Button } from "../abstract/Button/Button";
import { Modal } from "../abstract/Modal/Modal";
import { NeumorphicButton } from "../abstract/Neumorphic/Button/NeumorphicButton";
import CategoryFormData from "../../../data/form/category/category-form-data.json";
import { Form } from "../abstract/Form/Form";
import { RootState, useAppDispatch } from "../../../store/store";
import {
  addNewCategory,
  removeCategoryFromList,
  setCategoryList,
  setIsFetched,
  updateCategoryInList,
} from "../../../store/slices/category/category.slice";
import { CategoryFormPayload } from "../../../store/slices/category/category";
import { ModalList } from "../abstract/Modal/List/ModalList";
import { useSelector } from "react-redux";

export const CategoryModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="md:flex md:items-center md:justify-center w-full">
      <NeumorphicButton
        lala="btn-logout"
        className="hidden md:w-full md:h-auto md:flex md:justify-center"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon
          icon="bars"
          className="hidden md:block"
          size="lg"
          color="#354674"
        />
      </NeumorphicButton>
      <Button
        type="button"
        className="block md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <span>Category</span>
      </Button>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row text-center justify-center items-center font-sans text-lg text-slate-700">
              <Form
                input={CategoryFormData}
                onSubmit={handleSubmit}
                schema={schema}
                buttonClass="w-auto my-2"
              />
            </div>
            <ModalList
              dataArray={categories.categories}
              isFetched={categories.isFetched}
              setters={{
                setUpdate: updateCategoryInList,
                setFetch: setCategoryList,
                setLoading: setIsFetched,
                setDelete: removeCategoryFromList,
              }}
              url={"/categories"}
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};
