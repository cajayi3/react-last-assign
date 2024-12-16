import { configureStore } from "@reduxjs/toolkit";
import { reducer } from '../../Redux/slices/RootSlice'

export const store = configureStore ({
    reducer,
    devTools: true,
});