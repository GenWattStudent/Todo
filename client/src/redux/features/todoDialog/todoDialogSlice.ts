import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface TodoDialogState {
    open: boolean
}

const initialState: TodoDialogState = {
    open: false
}

const todoDialogSlice = createSlice({
    name: 'todoDialog',
    initialState,
    reducers: {
        open: (state) => {
            state.open = true
        },

        close: (state) => {
            state.open = false
        }
    }
})

export const { open, close } = todoDialogSlice.actions

export const selectOpen = (state: RootState) => state.todoDialog.open

export default todoDialogSlice.reducer