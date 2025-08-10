import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rickmortyApi } from './api.ts';
import selectedCharactersSlice from './charactersSlice.ts';

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    [rickmortyApi.reducerPath]: rickmortyApi.reducer,
    selectedCharacters: selectedCharactersSlice,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(rickmortyApi.middleware);
  },
});
setupListeners(store.dispatch);
