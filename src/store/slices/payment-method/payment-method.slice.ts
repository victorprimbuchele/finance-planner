// third
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { WritableDraft } from "immer/dist/internal";
import { toast } from "react-toastify";
// my
import { apiFinancePlanner } from "../../../infrastructure/integrations/finance-planner-api";
import { DataCreateAnything, ResponseCreateAnything } from "../default/default";

const paymentMethodInitialState: Array<DataCreateAnything> = [];

const paymentMethod = createSlice({
  name: "paymentMethod",
  initialState: {
    paymentMethods: paymentMethodInitialState,
    status: "idle",
    isFetched: false,
  },
  reducers: {
    setPaymentMethodList: (state, action) => {
      state.paymentMethods = action.payload;
    },
    addPaymentMethodToList: (state, action) => {
      state.paymentMethods.push(action.payload);
    },
    removePaymentMethodFromList: (state, action) => {
      state.paymentMethods = state.paymentMethods.filter(
        (paymentMethod) => paymentMethod.id !== action.payload
      );
    },
    setIsFetched: (state, action) => {
      state.isFetched = action.payload;
    },
    updatePaymentMethodInList: (state, action) => {
      // tentar encontrar categoria na lista
      const index = state.paymentMethods.findIndex(
        (paymentMethod) => paymentMethod.id === action.payload.id
      );
      /* caso ela esteja presente na lista, setar o novo nome
       * da categoria em sua posição na lista
       */
      if (index !== -1) {
        state.paymentMethods[index] = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewPaymentMethod.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewPaymentMethod.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addNewPaymentMethod.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default paymentMethod.reducer;

export const {
  setPaymentMethodList,
  addPaymentMethodToList,
  removePaymentMethodFromList,
  setIsFetched,
  updatePaymentMethodInList,
} = paymentMethod.actions;

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

export const addNewPaymentMethod = createAsyncThunk(
  "payment-method/create",
  (name: string, thunkAPI) => {
    return new Promise<ResponseCreateAnything>(async (resolve, reject) => {
      // criação de toast
      const createCatToast = toast.loading("Creating new payment method...");

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
          await apiFinancePlanner.post("/payment-methods", {
            name,
          });

        thunkAPI.dispatch(
          paymentMethod.actions.addPaymentMethodToList(response.data.data)
        );

        // atualização do toast com sucesso da requisição
        toast.update(createCatToast, {
          render: "Your payment method has been created",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        return resolve(response.data);
      } catch (error) {
        toast.update(createCatToast, {
          render: "We can't create your payment method",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });

        return reject(error);
      }
    });
  }
);
