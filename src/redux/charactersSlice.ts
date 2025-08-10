import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CharacterInfo } from 'src/redux/api.types';

type InfosState = {
  infos: CharacterInfo[];
};
const initialState: InfosState = {
  infos: [],
};
const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    addInfo: (state, { payload }: PayloadAction<CharacterInfo>) => {
      state.infos.push(payload);
    },
    removeInfo: (state, { payload }: PayloadAction<CharacterInfo>) => {
      state.infos = state.infos.filter(({ id }) => id !== payload.id);
    },
    clearInfos: state => {
      state.infos = [];
    },
  },
});
export const { addInfo, removeInfo, clearInfos } = selectedCharactersSlice.actions;
export default selectedCharactersSlice.reducer;
