import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: [],
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk<any[]>("user/fetchUser", async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get("http://192.168.100.234:5000/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
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

export default userSlice.reducer;
