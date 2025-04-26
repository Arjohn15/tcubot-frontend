import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store/store";

interface UserState {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    birthday: string;
    role: "student" | "admin" | "personnel";
    year: string;
    course: string;
    school_assigned_number: string;
    password: string;
    id: string;
    show_birthday: boolean | 0 | 1;
    show_phone_number: boolean | 0 | 1;
  };
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    birthday: "", // e.g., "2000-01-01"
    role: "student" as "student" | "admin" | "personnel",
    year: "",
    course: "",
    school_assigned_number: "",
    password: "",
    id: "",
    show_birthday: false, // or 0
    show_phone_number: false, // or 0
  },
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk<any[]>("user/fetchUser", async () => {
  const token = localStorage.getItem("token-user");

  const res = await axios.get("http://192.168.100.234:5000/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data[0];
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;
