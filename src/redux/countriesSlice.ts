import countries from '@/data/country-list.ts';
import { createSlice } from '@reduxjs/toolkit';

type CountriesState = {
  items: readonly string[];
};
const initialState: CountriesState = {
  items: countries,
};
const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});
export default countriesSlice.reducer;
