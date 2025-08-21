import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type InfosState = {
  infos: string[];
};
const initialState: InfosState = {
  infos: [],
};
const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    addInfo: (state, { payload }: PayloadAction<string>) => {
      state.infos.push(payload);
    },
  },
});
export const { addInfo } = selectedCharactersSlice.actions;
export default selectedCharactersSlice.reducer;
