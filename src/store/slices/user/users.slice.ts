import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { apiFinancePlanner } from "../../../infrastructure/integrations/finance-planner-api/index";
import { UserPayload } from "./user";

const users: UserPayload[] = [];

const user = createSlice({
  name: "users",
  initialState: {
    users: users,
    status: "idle",
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        addNewUser.fulfilled,
        (state, action: PayloadAction<UserPayload>) => {
          state.users.push(action.payload);
          return state;
        }
      )
      .addCase(addNewUser.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default user.reducer;

export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  // The payload creator receives the partial `{title, content, user}` object
  (user: UserPayload): Promise<UserPayload> => {
    return new Promise<UserPayload>(async (resolve, reject) => {
      try {
        const response: AxiosResponse<UserPayload> =
          await apiFinancePlanner.post("/users", user);

        return resolve(response.data);
      } catch (error) {
        console.error(error);
        return reject(error);
      }
    });
  }
);

export const userLogin = createAsyncThunk;
