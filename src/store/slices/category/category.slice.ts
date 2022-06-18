// third
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { WritableDraft } from "immer/dist/internal";
import { toast } from "react-toastify";
// my
import { apiFinancePlanner } from "../../../infrastructure/integrations/finance-planner-api";
import { DataCreateAnything, ResponseCreateAnything } from "../default/default";

const categoryInitialState: Array<DataCreateAnything> = [];

const category = createSlice({
  name: "category",
  initialState: {
    categories: categoryInitialState,
    status: "idle",
    isFetched: false,
  },
  reducers: {
    setCategoryList: (state, action) => {
      state.categories = action.payload;
    },
    addCategoryToList: (state, action) => {
      state.categories.push(action.payload);
    },
    removeCategoryFromList: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    setIsFetched: (state, action) => {
      state.isFetched = action.payload;
    },
    updateCategoryInList: (state, action) => {
      // tentar encontrar categoria na lista
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      /* caso ela esteja presente na lista, setar o novo nome
       * da categoria em sua posição na lista
       */
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default category.reducer;
export const {
  setCategoryList,
  addCategoryToList,
  removeCategoryFromList,
  setIsFetched,
  updateCategoryInList,
} = category.actions;

export const listCategories = (
  state: WritableDraft<{
    categories: DataCreateAnything[];
    status: string;
  }>
) => {
  return state.categories;
};

export const getStatus = (
  state: WritableDraft<{
    categories: DataCreateAnything[];
    status: string;
  }>
) => {
  return state.status;
};

export const addNewCategory = createAsyncThunk(
  "category/create",
  (name: string, thunkAPI) => {
    return new Promise<ResponseCreateAnything>(async (resolve, reject) => {
      // criação de toast
      const createCatToast = toast.loading("Creating new category...");

      try {
        // caso o nome da categoria seja nulo, apresentar erro ao usuário
        if (name == null) {
          toast.update(createCatToast, {
            render: "Name must be filled",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          return reject("name is null");
        }

        // chamada da API para criar a categoria
        const response: AxiosResponse<ResponseCreateAnything> =
          await apiFinancePlanner.post("/categories", {
            name,
          });

        thunkAPI.dispatch(
          category.actions.addCategoryToList(response.data.data)
        );

        // atualização do toast com sucesso da requisição
        toast.update(createCatToast, {
          render: "Your category has been created",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        return resolve(response.data);
      } catch (error) {
        toast.update(createCatToast, {
          render: "We can't create your category",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });

        return reject(error);
      }
    });
  }
);
