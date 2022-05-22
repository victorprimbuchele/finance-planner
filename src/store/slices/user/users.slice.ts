import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { apiFinancePlanner } from "../../../infrastructure/integrations/finance-planner-api/index";
import { ILoggedUser, LoginPayload, ResponseLogin, UserPayload } from "./user";
import { toast } from "react-toastify";

const users: UserPayload[] = [];

const userInfo: ILoggedUser = {
  age: 0,
  email: "",
  gender: "",
  id: 0,
  isAuth: false,
  name: "",
  password: "",
};

const loggedUser: ResponseLogin = {
  loggedUser: userInfo,
  token: "",
};

const user = createSlice({
  name: "users",
  initialState: {
    users: users,
    user: loggedUser,
    status: "idle",
    token: "",
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
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
          state.status = "succeeded";
          return state;
        }
      )
      .addCase(addNewUser.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(userLogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        userLogin.fulfilled,
        (state, action: PayloadAction<ResponseLogin>) => {
          state.token = `Bearer ${action.payload.token}`;
          localStorage.setItem("token", state.token);
          if (state.user.loggedUser.id === 0) {
            state.user.loggedUser = {
              ...state.user.loggedUser,
              ...action.payload.loggedUser,
            };
          }

          state.status = "succeeded";
          console.log(state.user.loggedUser);
          console.log(state.status);
          return state;
        }
      )
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(userLogout.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.user.loggedUser = {
          ...state.user.loggedUser,
          id: 0,
          isAuth: false,
          email: "",
          age: 0,
          gender: "",
          name: "",
          password: "",
        };
        state.status = "succeeded";
      })
      .addCase(userLogout.rejected, (state, action) => {
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
      const registeringToast = toast.loading("Registering user...");
      try {
        const response: AxiosResponse<UserPayload> =
          await apiFinancePlanner.post("/users", user);

        toast.update(registeringToast, {
          render: "User registration successful!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        return resolve(response.data);
      } catch (error: any) {
        toast.update(registeringToast, {
          render: "Failed to register user! " + error.message,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        return reject(error);
      }
    });
  }
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  (userPayload: any): Promise<ResponseLogin> => {
    return new Promise<ResponseLogin>(async (resolve, reject) => {
      const loginToast = toast.loading("Logging in...");

      try {
        const response: AxiosResponse<ResponseLogin, LoginPayload> =
          await apiFinancePlanner.post("/login", userPayload);

        toast.update(loginToast, {
          render: "You're in!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        return resolve(response.data);
      } catch (error) {
        console.error(error);
        toast.update(loginToast, {
          render: "Something isn't right!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        return reject(error);
      }
    });
  }
);

export const userLogout = createAsyncThunk(
  "user/userLogout",
  (email: string) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response: AxiosResponse<void> = await apiFinancePlanner.post(
          "/logout",
          {
            email,
            token: localStorage.getItem("token"),
          }
        );

        localStorage.removeItem("token");
        return resolve();
      } catch (error) {
        console.error(error);
        return reject(error);
      }
    });
  }
);
