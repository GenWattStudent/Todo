import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { IEditTodo, IOrderData, ITodoForm, ITodoTab, Todo } from "../../../types";
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
        items: [
            { id: '1', title: 'Todo 1', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 0, isDaily: false },
            { id: '2', title: 'Todo 2', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 1, isDaily: false },
            { id: '3', title: 'Todo 3', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 2, isDaily: true },
            { id: '11', title: 'Todo 1', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 0, isDaily: false },
            { id: '21', title: 'Todo 2', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 1, isDaily: false },
            { id: '31', title: 'Todo 3', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 2, isDaily: true },
            { id: '12', title: 'Todo 1', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 0, isDaily: false },
            { id: '221', title: 'Todo 2', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 1, isDaily: false },
            { id: '325', title: 'Todo 3', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 2, isDaily: true },
            { id: '13', title: 'Todo 1', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 0, isDaily: false },
            { id: '231', title: 'Todo 2', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 1, isDaily: false },
            { id: '33', title: 'Todo 3', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 2, isDaily: true },
        ]
    },
    {
        id: '22',
        title: 'Tab 2',
        items: [
            { id: '4', title: 'Todo 4', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 0, isDaily: false },
            { id: '5', title: 'Todo 5', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 1, isDaily: false },
            { id: '6', title: 'Todo 6', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 2, isDaily: true },
        ]
    }, {
        id: '32',
        title: 'Tab 3',
        items: [
            { id: '7', title: 'Todo 7', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 0, isDaily: false },
            { id: '8', title: 'Todo 8', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 1, isDaily: false },
            { id: '9', title: 'Todo 9', category: 'Work', isComplated: false, endDate: new Date().toString(), order: 2, isDaily: true },
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
        addTab: (state, action: PayloadAction<string>) => {
            state.tabs.push({ id: new Date().toISOString(), title: action.payload, items: [] })
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
                    ? tab.items.push({ ...action.payload, isComplated: false, endDate: new Date().toString(), id: new Date().toISOString(), order: tab.items.length })
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
            console.log('newtab', newtab)
            console.log('oldTab', oldTab)
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

        swapTodos: (state, action: PayloadAction<{ firstTab: string, secondTab: string, firstTodo: string, secondTodo: string }>) => {
            const firstTab = state.tabs.find((tab) => tab.id === action.payload.firstTab)
            const secondTab = state.tabs.find((tab) => tab.id === action.payload.secondTab)

            if (!firstTab || !secondTab) return

            const firstTodo = firstTab.items.find((todo) => todo.id === action.payload.firstTodo)
            const secondTodo = secondTab.items.find((todo) => todo.id === action.payload.secondTodo)

            if (!firstTodo || !secondTodo) return

            deleteTodo({ tabId: action.payload.firstTab, todoId: firstTodo.id })
            deleteTodo({ tabId: action.payload.secondTab, todoId: secondTodo.id })

            addTodo({ tabId: action.payload.firstTab, todo: secondTodo })
            addTodo({ tabId: action.payload.secondTab, todo: firstTodo })
        }
    }
})

export const { createTodo, deleteTodo, changeOrder, editTodo, setTodoToEdit, addTab, deleteTab, editTab, selectTab, setTabs, changeTodoTab, addTodo, swapTodos } = todoSlice.actions

export const selectTabs = (state: RootState) => state.todos.tabs

export const selectIsEdit = (state: RootState) => state.todos.isEdit

export const selectEditedTodo = (state: RootState) => state.todos.editedTodo

export const selectSelectedTabId = (state: RootState) => state.todos.currentTabSelectedId

const todosState = (state: RootState) => state.todos
export const selectNotCompleted = createSelector([todosState], (state) => {
    // return state.todos.filter(todo => !todo.isComplated)
    return []
})

export const selectCompleted = createSelector([todosState], (state) => {
    // return state.todos.filter(todo => todo.isComplated)
    return []
})

export default todoSlice.reducer