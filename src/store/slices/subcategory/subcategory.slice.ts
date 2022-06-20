// third
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { WritableDraft } from "immer/dist/internal";
import { toast } from "react-toastify";
// my
import { apiFinancePlanner } from "../../../infrastructure/integrations/finance-planner-api";
import { DataCreateAnything, ResponseCreateAnything } from "../default/default";
import { NewCategoryPayloadProps } from "./subcategory";

const subCategoryInitialState: Array<DataCreateAnything> = [];

const subCategory = createSlice({
  name: "subCategory",
  initialState: {
    subCategories: subCategoryInitialState,
    status: "idle",
    isFetched: false,
  },
  reducers: {
    setSubCategoryList: (state, action) => {
      state.subCategories = action.payload;
    },
    addSubCategoryToList: (state, action) => {
      state.subCategories.push(action.payload);
    },
    removeSubCategoryFromList: (state, action) => {
      state.subCategories = state.subCategories.filter(
        (subCategory) => subCategory.id !== action.payload
      );
    },
    setIsFetched: (state, action) => {
      state.isFetched = action.payload;
    },
    updateSubCategoryInList: (state, action) => {
      // tentar encontrar categoria na lista
      const index = state.subCategories.findIndex(
        (subCategory) => subCategory.id === action.payload.id
      );
      /* caso ela esteja presente na lista, setar o novo nome
       * da categoria em sua posição na lista
       */
      if (index !== -1) {
        state.subCategories[index] = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewSubCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewSubCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addNewSubCategory.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default subCategory.reducer;

export const {
  setSubCategoryList,
  addSubCategoryToList,
  removeSubCategoryFromList,
  setIsFetched,
  updateSubCategoryInList,
} = subCategory.actions;

export const listCategories = (
  state: WritableDraft<{
    subCategories: DataCreateAnything[];
    status: string;
  }>
) => {
  return state.subCategories;
};

export const getStatus = (
  state: WritableDraft<{
    subCategories: DataCreateAnything[];
    status: string;
  }>
) => {
  return state.status;
};

export const addNewSubCategory = createAsyncThunk(
  "subcategory/create",
  (payload: NewCategoryPayloadProps, thunkAPI) => {
    return new Promise<ResponseCreateAnything>(async (resolve, reject) => {
      // criação de toast
      const createCatToast = toast.loading("Creating new subcategory...");

      console.log(payload);

      try {
        // caso o nome da categoria seja nulo, apresentar erro ao usuário
        if (payload.name == null || payload.categoryId === null) {
          toast.update(createCatToast, {
            render: "Name and category must be filled",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          return reject("name is null");
        }

        // chamada da API para criar a categoria
        const response: AxiosResponse<ResponseCreateAnything> =
          await apiFinancePlanner.post(
            `/sub-categories/${payload.categoryId}`,
            {
              name: payload.name,
            }
          );

        thunkAPI.dispatch(
          subCategory.actions.addSubCategoryToList(response.data.data)
        );

        // atualização do toast com sucesso da requisição
        toast.update(createCatToast, {
          render: "Your subcategory has been created",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        return resolve(response.data);
      } catch (error) {
        toast.update(createCatToast, {
          render: "We can't create your subcategory",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });

        return reject(error);
      }
    });
  }
);
