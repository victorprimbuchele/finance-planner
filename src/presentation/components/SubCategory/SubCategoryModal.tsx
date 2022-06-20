// Third
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";

// My
import { RootState, useAppDispatch } from "../../../store/store";
import {
  addNewSubCategory,
  removeSubCategoryFromList,
  setSubCategoryList,
  setIsFetched,
  updateSubCategoryInList,
} from "../../../store/slices/subcategory/subcategory.slice";
import SubCategoryFormData from "../../../data/form/subcategory/subcategory-form-data.json";
import { handleFetch } from "../abstract/handlers/CRUD/handlersCRUD";
import { setCategoryList } from "../../../store/slices/category/category.slice";
import { NavigationSidebarButton } from "../Sidebars/Navigation/Button/NavigationSidebarButton";
import { Button } from "../abstract/Button/Button";
import { Form } from "../abstract/Form/Form";
import { Modal } from "../abstract/Modal/Modal";
import { ModalList } from "../abstract/Modal/List/ModalList";

export const SubCategoryModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const { subcategory } = useSelector((state: RootState) => state);

  const schema = yup.object({
    subcategory: yup.string().required().min(3),
  });

  const [categoryId, setCategoryId] = useState<number | string>();

  // caso esteja buscando, renderiza loader

  const [isFetching, setIsFetching] = useState(false);
  const [categories, setCategories] = useState<categoryresponseprops[]>();
  const [isOpen, setIsOpen] = useState(false);

  type categoryresponseprops = {
    id: number;
    name: string;
    userId: number;
  };

  type SubcategoryFormPayload = {
    subcategory: string;
  };

  useEffect(() => {
    setIsFetching(true);
    if (isOpen) {
      (async () => {
        // buscar categorias
        const res: categoryresponseprops[] = await handleFetch({
          url: "/categories",
          loading: setIsFetched,
          setter: setCategoryList,
        });

        //  caso haja resposta válida
        if (res) {
          setCategories(res);
          setIsFetching(false);
        }
      })();
    }
  }, [isOpen]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(event.target.value);
  };

  // assim que usuário selecionar uma categoria busca subcategorias
  useEffect(() => {
    if (categoryId) {
      setIsFetching(true);

      (async () =>
        // buscar subcategorias
        await handleFetch({
          url: `/sub-categories/${categoryId}`,
          loading: setIsFetched,
          setter: setSubCategoryList,
        }))();

      setIsFetching(false);
    }
  }, [categoryId]);

  const handleSubmit = async (payload: SubcategoryFormPayload) => {
    const payloadWId = {
      name: payload.subcategory,
      categoryId,
    };
    try {
      await dispatch(addNewSubCategory(payloadWId));
      document.getElementById(SubCategoryFormData[0].name)!.value = "";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="md:flex md:items-center md:justify-center w-full">
      <NavigationSidebarButton
        akg={`btn-Subcategories`}
        icon="bars"
        iconSize="lg"
        color="#354674"
        onClick={() => setIsOpen(true)}
      />
      <Button
        type="button"
        className="block md:hidden"
        onClick={() => setIsOpen(true)}
        id="btn-close-modal"
      >
        <span>Subcategories</span>
      </Button>
      {/* renderizar modal */}
      {isOpen ? (
        // caso esteja buscando, renderiza loader
        isFetching || !categories ? (
          <div className="spinner"></div>
        ) : (
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="flex flex-col text-center justify-center items-center font-sans text-lg text-slate-700">
              {/* caso não esteja buscando, renderiza select */}
              <label htmlFor="select-category" className="font-semibold">
                Choose a category
              </label>
              <select
                className="form-select appearance-none
                  block w-full px-3 py-2 text-base font-normaltext-gray-700
                  bg-white bg-clip-padding bg-no-repeat
                  border border-solid border-gray-300
                  rounded transition ease-in-out 
                  m-0 my-3 
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Select a subcategory"
                onChange={handleChange}
                id="select-category"
              >
                <option selected value="">
                  Select a category
                </option>
                {categories.map((category, i) => {
                  return (
                    <option
                      value={category.id}
                      key={`option@${category.name}@${i}`}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </select>
              {console.log(categoryId)}
              {categoryId && (
                <div className="flex flex-col justify-center">
                  <div className="flex flex-row text-center justify-center items-center font-sans text-lg text-slate-700">
                    <Form
                      input={SubCategoryFormData}
                      onSubmit={handleSubmit}
                      schema={schema}
                      buttonClass="w-auto my-2"
                    />
                  </div>
                  {/* caso não esteja buscando, renderiza formulario de
                    subcategorias e sua listagem */}
                  <ModalList
                    dataArray={subcategory.subCategories}
                    isFetched={subcategory.isFetched}
                    setters={{
                      setFetch: setSubCategoryList,
                      setDelete: removeSubCategoryFromList,
                      setLoading: setIsFetched,
                      setUpdate: updateSubCategoryInList,
                    }}
                    url={`/sub-categories/${categoryId}`}
                  />
                </div>
              )}
            </div>
          </Modal>
        )
      ) : null}
    </div>
  );
};
