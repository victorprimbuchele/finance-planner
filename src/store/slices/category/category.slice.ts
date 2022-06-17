import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { WritableDraft } from "immer/dist/internal";
import { toast } from "react-toastify";
import { apiFinancePlanner } from "../../../infrastructure/integrations/finance-planner-api";
import { UpdatePayload } from "../default/default";
import {
  deleteAnything,
  fetchAnything,
  updateAnything,
} from "../default/default.slice";
import { DataCreateCategory, ResponseCreateCategory } from "./category";

const categoryInitialState: Array<DataCreateCategory> = [];

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
      })
      .addCase(fetchCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
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
    categories: DataCreateCategory[];
    status: string;
  }>
) => {
  return state.categories;
};

export const getStatus = (
  state: WritableDraft<{
    categories: DataCreateCategory[];
    status: string;
  }>
) => {
  return state.status;
};

export const addNewCategory = createAsyncThunk(
  "category/create",
  (name: string, thunkAPI) => {
    return new Promise<ResponseCreateCategory>(async (resolve, reject) => {
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
        const response: AxiosResponse<ResponseCreateCategory> =
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

export const fetchCategory = createAsyncThunk(
  "category/list",
  (_, thunkAPI) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        thunkAPI.dispatch(
          fetchAnything({
            url: "/categories",
            setter: setCategoryList,
            loading: setIsFetched,
          })
        );

        return resolve();
      } catch (error) {
        console.error(error);

        return reject();
      }
    });
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  (id: number | string, thunkAPI) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        thunkAPI.dispatch(
          deleteAnything({
            url: "/categories/",
            id,
            setter: removeCategoryFromList,
          })
        );

        return resolve();
      } catch (error: any) {
        console.error(error);
        toast.error(error.message, {
          isLoading: false,
          autoClose: 2000,
        });
        return reject();
      }
    });
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  (payload: UpdatePayload, thunkAPI) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        thunkAPI.dispatch(
          updateAnything({
            url: "/categories/",
            payload,
            setter: updateCategoryInList,
          })
        );

        // const response = await apiFinancePlanner.put(
        //   `/categories/${payload.id}`,
        //   { name: payload.name }
        // );

        // thunkAPI.dispatch(
        //   category.actions.updateCategoryInList(response.data.data)
        // );

        return resolve();
      } catch (error) {
        console.error(error);

        return reject();
      }
    });
  }
);
