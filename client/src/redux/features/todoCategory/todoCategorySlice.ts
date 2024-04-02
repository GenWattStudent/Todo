import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITodoCategory } from "../../../types";
import { RootState } from "../../store";

const initialState: ITodoCategory[] = [{ value: 'work' }, { value: 'home' }, { value: 'other' }]

const todoCategorySlice = createSlice({
    name: 'todoCategory',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<ITodoCategory>) => {
            state.push(action.payload)
        },
    }
})

export const { addCategory } = todoCategorySlice.actions

export const selectCategories = (state: RootState) => state.todoCategories

export default todoCategorySlice.reducer