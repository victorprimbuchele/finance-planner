import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { apiFinancePlanner } from "../../../infrastructure/integrations/finance-planner-api";

type ResponseCreateCategory = {
  data: DataCreateCategory[];
};

type DataCreateCategory = {
  id: number;
  name: string;
  userId: number;
};

type PayloadCreateCategory = {
  name: string;
  id: number;
};

const categoryInitialState: DataCreateCategory[][] = [];

const category = createSlice({
  name: "category",
  initialState: {
    categories: categoryInitialState,
    status: "idle",
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewCategory.pending, (state, action) => {
        state.status = "loading";
        state.categories = [];
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.status = "succeeded";
        return state;
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default category.reducer;

export const addNewCategory = createAsyncThunk(
  "category/create",
  (payload: PayloadCreateCategory, thunkAPI) => {
    return new Promise<DataCreateCategory[]>(async (resolve, reject) => {
      const createCatToast = toast.loading("Logging out...");

      try {
        if (payload.name == null || payload.id == null) {
          toast.update(createCatToast, {
            render: "Name or id must be filled",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          return reject("name or id is null");
        }

        const response: AxiosResponse<ResponseCreateCategory> =
          await apiFinancePlanner.post("/categories", {
            payload,
          });
        toast.update(createCatToast, {
          render: "Your category has been created",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        return resolve(response.data.data);
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
