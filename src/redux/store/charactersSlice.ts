import type { CharacterInfo } from '@/services/server-actions/api/api.types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type InfosState = {
  infos: Record<number, CharacterInfo>;
};
const initialState: InfosState = {
  infos: {},
};
const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    addInfo: (state, { payload }: PayloadAction<CharacterInfo>) => {
      state.infos[payload.id] = payload;
    },
    removeInfo: (state, { payload }: PayloadAction<CharacterInfo>) => {
      const { [payload.id]: _, ...newInfos } = state.infos;
      state.infos = newInfos;
    },
    clearInfos: state => {
      state.infos = {};
    },
  },
});
export const { addInfo, removeInfo, clearInfos } = selectedCharactersSlice.actions;
export default selectedCharactersSlice.reducer;
