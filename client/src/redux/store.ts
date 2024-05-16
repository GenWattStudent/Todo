import { configureStore } from '@reduxjs/toolkit';
import TodoReducer from './features/todo/todoSlice';
import TodoCategoryReducer from './features/todoCategory/todoCategorySlice';
import TodoDialogSlice from './features/todoDialog/todoDialogSlice'

export const store = configureStore({
    reducer: {
        todos: TodoReducer,
        todoCategories: TodoCategoryReducer,
        todoDialog: TodoDialogSlice
    },
    //@ts-ignore
    devTools: import.meta.env.VITE_APP_DEV === 'true'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;