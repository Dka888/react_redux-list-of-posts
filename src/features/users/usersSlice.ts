/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UserState {
  value: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  value: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users', async () => {
  try {
    const dataUsers = await getUsers();

    return dataUsers;
  } catch (error) {
    throw new Error('Failed to fetch users.');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default usersSlice.reducer;
