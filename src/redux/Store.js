import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";



let store = configureStore({
    reducer: {
        counter: counterReducer
    }
})


export default store;