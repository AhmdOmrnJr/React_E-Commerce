import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    counter: 0,
    Name: "Ahmed"
}


let counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increase: (state) => {
            state.counter++;
        },
        decrease: (state) =>{
            state.counter--;
        },
        increament: (state, action) => {
            state.counter += action.payload
        }
    }
})


export let counterReducer = counterSlice.reducer
export let {increase, decrease, increament} = counterSlice.actions

