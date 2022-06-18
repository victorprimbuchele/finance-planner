import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiFinancePlanner } from "../../../infrastructure/integrations/finance-planner-api";
import {
  DeleteActionProps,
  FetchActionProps,
  UpdateActionProps,
} from "./default";

export const fetchAnything = createAsyncThunk(
  "anything/list",
  (action: FetchActionProps, thunkAPI) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        // buscar lista de qualquer coisa do atual usuário
        const response = await apiFinancePlanner.get(action.url);

        // setar qualquer coisa com os dados da api
        thunkAPI.dispatch(action.setter(response.data.data));

        // setar status de dados buscados
        thunkAPI.dispatch(action.loading(true));

        return resolve();
      } catch (error) {
        console.error(error);

        return reject();
      }
    });
  }
);

export const deleteAnything = createAsyncThunk(
  "anything/delete",
  (action: DeleteActionProps, thunkAPI) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        if (!action.id) {
          toast.error("The id must be a number", {
            isLoading: false,
            autoClose: 2000,
          });
        }

        await apiFinancePlanner.delete(`${action.url}/${action.id}`);

        // remover qualquer coisa de uma lista qualquer
        thunkAPI.dispatch(action.setter(action.id));

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

export const updateAnything = createAsyncThunk(
  "anything/update",
  (action: UpdateActionProps, thunkAPI) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiFinancePlanner.put(
          `${action.url}/${action.payload.id}`,
          { name: action.payload.name }
        );

        // atualizar qualquer coisa de uma lista qualquer
        thunkAPI.dispatch(action.setter(response.data.data));

        return resolve();
      } catch (error) {
        console.error(error);

        return reject();
      }
    });
  }
);
