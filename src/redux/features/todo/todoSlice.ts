import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { IOrderData, ITodoForm, Todo } from "../../../types";
import { RootState } from "../../store";

interface TodoState {
    todos: Todo[]
    isEdit: boolean
    editedTodo: Todo | null
}

const initialState: TodoState = {
    todos: [],
    isEdit: false,
    editedTodo: null
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodoForm>) => {
            state.todos.push({ ...action.payload, isComplated: false, endDate: new Date().toString(), id: new Date().toISOString(), order: state.todos.length })
        },

        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },

        complateTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.map(todo => todo.id === action.payload ? { ...todo, isComplated: !todo.isComplated } : todo)
        },

        editTodo: (state, action: PayloadAction<Todo>) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload.id ? action.payload : todo)
        },

        setTodoToEdit: (state, action: PayloadAction<Todo | null>) => {
            state.editedTodo = action.payload
            state.isEdit = action.payload !== null
        },
    }
})

export const { addTodo, deleteTodo, complateTodo, editTodo, setTodoToEdit } = todoSlice.actions

export const selectTodos = (state: RootState) => state.todos.todos

export const selectIsEdit = (state: RootState) => state.todos.isEdit

export const selectEditedTodo = (state: RootState) => state.todos.editedTodo

const todosState = (state: RootState) => state.todos
export const selectNotCompleted = createSelector([todosState], (state) => {
    return state.todos.filter(todo => !todo.isComplated)
})

export const selectCompleted = createSelector([todosState], (state) => {
    return state.todos.filter(todo => todo.isComplated)
})

export default todoSlice.reducer