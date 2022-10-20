const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const ALLSTATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "Error",
});

const slice = createSlice({
  name: "weather",
  initialState: {
    data: [],
    status: ALLSTATUS.IDLE,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.status = ALLSTATUS.LOADING;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = ALLSTATUS.IDLE;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = ALLSTATUS.ERROR;
      });
  },
});
export default slice.reducer;

//Thunks
export const fetchWeather = createAsyncThunk(
  "weather/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=c3fb10eb95a7cf13d3819d7202344944`
    );
    const data = await res.json();
    return data;
  }
);
