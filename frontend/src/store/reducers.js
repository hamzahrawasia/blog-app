import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
};

const slice = createSlice({
    name: 'login',
    initialState: {loggedIn: false},
    reducers: {
    login(state){
        state.loggedIn = true
    },
    logout(state){
        state.loggedIn = false
    },
},
});

export const actions = slice.actions;
export const store = configureStore({
    reducer: slice.reducer
});