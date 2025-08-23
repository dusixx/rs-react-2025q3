import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from './user.ts';

type UsersState = {
  items: Record<string, User>;
};
const initialState: UsersState = {
  items: {},
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.items[payload.email] = payload;
    },
  },
});
export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
