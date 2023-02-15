import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./src/reducers/movieSlice";

export const store = configureStore({
	reducer: {
		movies: movieReducer,
	},
});
