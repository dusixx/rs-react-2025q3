import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type UsersState = {
  items: Record<string, unknown>;
};
const initialState: UsersState = {
  items: {},
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, { payload }: PayloadAction<unknown>) => {
      state.items[''] = payload;
    },
  },
});
export const { addUser } = usersSlice.actions;
export default usersSlice.reducer;
