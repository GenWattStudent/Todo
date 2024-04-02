import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { IEditTodo, ITabForm, ITodoForm, ITodoTab, Todo } from "../../../types";
import { RootState } from "../../store";

interface TodoState {
    tabs: ITodoTab[]
    isEdit: boolean
    editedTodo: Todo | null
    currentTabSelectedId: string | null
}

const dummyTabs: ITodoTab[] = [
    {
        id: '20',
        title: 'Tab 1',
        color: 'green',
        textColor: 'black',
        items: [
            { id: '1', title: 'Todo 1', category: 'Work', endDate: new Date().toString(), order: 0, isDaily: false, description: 'This is a description' },
            { id: '2', title: 'Todo 2', category: 'Work', endDate: new Date().toString(), order: 1, isDaily: false, description: 'This is a description' },
            { id: '3', title: 'Todo 3', category: 'Work', endDate: new Date().toString(), order: 2, isDaily: true, description: 'This is a description' },
            { id: '11', title: 'Todo 1', category: 'Work', endDate: new Date().toString(), order: 0, isDaily: false, description: 'This is a description' },
            { id: '21', title: 'Todo 2', category: 'Work', endDate: new Date().toString(), order: 1, isDaily: false, description: 'This is a description' },
            { id: '31', title: 'Todo 3', category: 'Work', endDate: new Date().toString(), order: 2, isDaily: true, description: 'This is a description' },
            { id: '12', title: 'Todo 1', category: 'Work', endDate: new Date().toString(), order: 0, isDaily: false, description: 'This is a description' },
            { id: '221', title: 'Todo 2', category: 'Work', endDate: new Date().toString(), order: 1, isDaily: false, description: 'This is a description' },
            { id: '325', title: 'Todo 3', category: 'Work', endDate: new Date().toString(), order: 2, isDaily: true, description: 'This is a description' },
            { id: '13', title: 'Todo 1', category: 'Work', endDate: new Date().toString(), order: 0, isDaily: false, description: 'This is a description' },
            { id: '231', title: 'Todo 2', category: 'Work', endDate: new Date().toString(), order: 1, isDaily: false, description: 'This is a description' },
            { id: '33', title: 'Todo 3', category: 'Work', endDate: new Date().toString(), order: 2, isDaily: true, description: 'This is a description' },
        ]
    },
    {
        id: '22',
        title: 'Tab 2',
        color: 'blue',
        textColor: 'white',
        items: [
            { id: '4', title: 'Todo 4', category: 'Work', endDate: new Date().toString(), order: 0, isDaily: false, description: 'This is a description' },
            { id: '5', title: 'Todo 5', category: 'Work', endDate: new Date().toString(), order: 1, isDaily: false, description: 'This is a description' },
            { id: '6', title: 'Todo 6', category: 'Work', endDate: new Date().toString(), order: 2, isDaily: true, description: 'This is a description' },
        ]
    }, {
        id: '32',
        title: 'Tab 3',
        color: 'purple',
        textColor: 'white',
        items: [
            { id: '7', title: 'Todo 7', category: 'Work', endDate: new Date().toString(), order: 0, isDaily: false, description: 'This is a description' },
            { id: '8', title: 'Todo 8', category: 'Work', endDate: new Date().toString(), order: 1, isDaily: false, description: 'This is a description' },
            { id: '9', title: 'Todo 9', category: 'Work', endDate: new Date().toString(), order: 2, isDaily: true, description: 'This is a description' },
        ]
    }
]

const initialState: TodoState = {
    tabs: [...dummyTabs],
    isEdit: false,
    editedTodo: null,
    currentTabSelectedId: null
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // Tabs
        addTab: (state, action: PayloadAction<ITabForm>) => {
            state.tabs.push({ id: new Date().toISOString(), ...action.payload, items: [] })
        },

        deleteTab: (state, action: PayloadAction<string>) => {
            state.tabs = state.tabs.filter((tab) => tab.id !== action.payload)
        },

        editTab: (state, action: PayloadAction<ITodoTab>) => {
            state.tabs = state.tabs.map((tab) => tab.id === action.payload.id ? action.payload : tab)
        },

        selectTab: (state, action: PayloadAction<string>) => {
            state.currentTabSelectedId = action.payload
        },

        setTabs: (state, action: PayloadAction<ITodoTab[]>) => {
            state.tabs = action.payload
        },

        // Todo
        createTodo: (state, action: PayloadAction<ITodoForm>) => {
            state.tabs
                .map((tab) => tab.id === action.payload.tabId
                    ? tab.items.push({ ...action.payload, endDate: new Date().toString(), id: new Date().toISOString(), order: tab.items.length })
                    : tab)
        },

        addTodo: (state, action: PayloadAction<{ tabId: string, todo: Todo }>) => {
            state.tabs = state.tabs.map((tab) => tab.id === action.payload.tabId
                ? { ...tab, items: [...tab.items, action.payload.todo] }
                : tab)
        },

        deleteTodo: (state, action: PayloadAction<{ tabId: string, todoId: string }>) => {
            state.tabs = state.tabs.map((tab) => tab.id === action.payload.tabId
                ? { ...tab, items: tab.items.filter((todo) => todo.id !== action.payload.todoId) }
                : tab)
        },

        changeOrder: (state, action: PayloadAction<{ tabId: string, items: Todo[] }>) => {
            state.tabs = state.tabs.map((tab) => tab.id === action.payload.tabId
                ? { ...tab, items: action.payload.items }
                : tab)
        },

        editTodo: (state, action: PayloadAction<IEditTodo>) => {
            state.tabs = state.tabs.map((tab) => tab.id === action.payload.tabId
                ? { ...tab, items: tab.items.map((todo) => todo.id === action.payload.todoId ? { ...todo, ...action.payload.todo } : todo) }
                : tab)
        },

        setTodoToEdit: (state, action: PayloadAction<Todo | null>) => {
            state.editedTodo = action.payload
            state.isEdit = action.payload !== null
        },

        changeTodoTab: (state, action: PayloadAction<{ tabId: string, todoId: string, index: number }>) => {
            // Find the tab that the todo is in and swap it to the new tab
            const newtab = state.tabs.find((tab) => tab.items.find((todo) => todo.id === action.payload.todoId))
            const oldTab = state.tabs.find((tab) => tab.items.find((todo) => todo.id === action.payload.todoId))
            if (!newtab || !oldTab) return

            const todo = oldTab.items.find((todo) => todo.id === action.payload.todoId)

            if (!todo) return

            state.tabs = state.tabs.map((tab) => tab.id === action.payload.tabId
                ? { ...tab, items: [...tab.items.slice(0, action.payload.index), todo, ...tab.items.slice(action.payload.index)] }
                : tab)

            state.tabs = state.tabs.map((tab) => tab.id === oldTab.id
                ? { ...tab, items: tab.items.filter((todo) => todo.id !== action.payload.todoId) }
                : tab)
        },
    }
})

export const { createTodo, deleteTodo, changeOrder, editTodo, setTodoToEdit, addTab, deleteTab, editTab, selectTab, setTabs, changeTodoTab, addTodo } = todoSlice.actions

export const selectTabs = (state: RootState) => state.todos.tabs

export const selectIsEdit = (state: RootState) => state.todos.isEdit

export const selectEditedTodo = (state: RootState) => state.todos.editedTodo

export const selectSelectedTabId = (state: RootState) => state.todos.currentTabSelectedId

// Then, create a selector that takes the tabs array and an id, and returns the tab with that id
export const selectTabById = createSelector(
    [selectTabs, (state, tabId: string) => tabId],
    (tabs, tabId) => tabs.find(tab => tab.id === tabId)
);

export default todoSlice.reducer