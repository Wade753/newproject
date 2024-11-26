import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;
export const fetchWeather = (city) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);
    const data = await response.json();
    dispatch(setWeather(data));
  } catch (err) {
    console.log(err);
  }
};

export const weatherSelector = (state) => state.weather.value;
