import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { IOrderData, ITodoTab, Todo } from "../../../types";
import { RootState } from "../../store";
import { createTab, deleteTab, editTab, getTabs, changeTabOrderApi, createTodo, deleteTodo, editTodo, changeTodoOrderInSameTab, changeTodoTabApi, getTodoById } from "./api";
import { toast } from 'react-toastify'

export enum Status {
    Ready = 'Ready',
    Loading = 'Loading',
    Error = 'Error',
    NetworkError = 'Network Error'
}

interface TodoState {
    tabs: ITodoTab[]
    isEdit: boolean
    editedTodo: Todo | null
    currentTabSelectedId: string | null
    todo: Todo | null
    status: Status
}

const initialState: TodoState = {
    tabs: [],
    isEdit: false,
    editedTodo: null,
    currentTabSelectedId: null,
    todo: null,
    status: Status.Ready
}

const pendingActions = [
    createTab.pending,
    changeTodoOrderInSameTab.pending,
    changeTodoTabApi.pending,
    createTodo.pending,
    deleteTodo.pending,
    editTodo.pending,
    getTodoById.pending,
    getTabs.pending,
    deleteTab.pending,
    editTab.pending,
    changeTabOrderApi.pending
];

const rejectActions = [
    createTab.rejected,
    changeTodoOrderInSameTab.rejected,
    changeTodoTabApi.rejected,
    createTodo.rejected,
    deleteTodo.rejected,
    editTodo.rejected,
    getTodoById.rejected,
    getTabs.rejected,
    deleteTab.rejected,
    editTab.rejected,
    changeTabOrderApi.rejected
];

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // Tabs
        selectTab: (state, action: PayloadAction<string>) => {
            state.currentTabSelectedId = action.payload
        },

        setTabs: (state, action: PayloadAction<ITodoTab[]>) => {
            state.tabs = action.payload
        },

        // Todo
        changeOrder: (state, action: PayloadAction<{ tabId: string, items: Todo[] }>) => {
            state.tabs = state.tabs.map((tab) => tab._id === action.payload.tabId
                ? { ...tab, items: action.payload.items }
                : tab)
        },

        setTodoToEdit: (state, action: PayloadAction<Todo | null>) => {
            state.editedTodo = action.payload
            state.isEdit = action.payload !== null
        },

        changeTodoTab: (state, action: PayloadAction<{ tabId: string, todoId: string, index: number }>) => {
            // Find the tab that the todo is in and swap it to the new tab
            const newtab = state.tabs.find((tab) => tab.items.find((todo) => todo._id === action.payload.todoId))
            const oldTab = state.tabs.find((tab) => tab.items.find((todo) => todo._id === action.payload.todoId))
            if (!newtab || !oldTab) return

            const todo = oldTab.items.find((todo) => todo._id === action.payload.todoId)

            if (!todo) return

            state.tabs = state.tabs.map((tab) => tab._id === action.payload.tabId
                ? { ...tab, items: [...tab.items.slice(0, action.payload.index), todo, ...tab.items.slice(action.payload.index)] }
                : tab)

            state.tabs = state.tabs.map((tab) => tab._id === oldTab._id
                ? { ...tab, items: tab.items.filter((todo) => todo._id !== action.payload.todoId) }
                : tab)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createTab.fulfilled, (state, action) => {
            state.tabs.push(action.payload)
            state.status = Status.Ready
            toast.success('Tab created successfully')
        })

        builder.addCase(getTabs.fulfilled, (state, action) => {
            state.tabs = action.payload
            state.status = Status.Ready
        })

        builder.addCase(deleteTab.fulfilled, (state, action) => {
            state.tabs = state.tabs.filter((tab) => tab._id !== action.payload)
            state.status = Status.Ready
            toast.success('Tab deleted successfully')
        })

        builder.addCase(editTab.fulfilled, (state, action) => {
            state.tabs = state.tabs.map((tab) => tab._id === action.payload._id ? action.payload : tab)
            state.status = Status.Ready
            toast.success('Tab updated successfully')
        })

        builder.addCase(changeTabOrderApi.fulfilled, (state, action) => {
            state.tabs = action.payload
            state.status = Status.Ready
            toast.success('Tab moved successfully')
        })

        // TODOS
        builder.addCase(createTodo.fulfilled, (state, action) => {
            state.tabs = state.tabs.map((tab) => tab._id === action.payload.tabId
                ? { ...tab, items: [...tab.items, { ...action.payload, isJustAdded: true }] }
                : tab)
            state.status = Status.Ready
            toast.success('Todo created successfully')
        })

        builder.addCase(deleteTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
            state.tabs = state.tabs.map((tab) => tab._id === action.payload.tabId
                ? { ...tab, items: tab.items.filter((todo) => todo._id !== action.payload._id) }
                : tab)
            state.status = Status.Ready
            toast.success('Todo deleted successfully')
        })

        builder.addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
            state.tabs = state.tabs.map((tab) => tab._id === action.payload.tabId
                ? { ...tab, items: tab.items.map((todo) => todo._id === action.payload._id ? { ...todo, ...action.payload } : todo) }
                : tab)
            state.status = Status.Ready
            toast.success('Todo updated successfully')
        })

        builder.addCase(changeTodoOrderInSameTab.fulfilled, (state, action: PayloadAction<IOrderData>) => {
            state.tabs = state.tabs.map((tab) => tab._id === action.payload.tabId
                ? { ...tab, items: action.payload.todos }
                : tab)
            state.status = Status.Ready
            toast.success('Todo moved successfully')
        })

        builder.addCase(changeTodoTabApi.fulfilled, (state, action: PayloadAction<ITodoTab[]>) => {
            state.tabs = action.payload
            state.status = Status.Ready
            toast.success('Todo moved successfully')
        })

        builder.addCase(getTodoById.fulfilled, (state, action: PayloadAction<Todo>) => {
            state.todo = action.payload
            state.status = Status.Ready
        })

        pendingActions.forEach((pendingAction) => {
            builder.addCase(pendingAction, (state, action) => {
                state.status = Status.Loading;
            });
        });

        rejectActions.forEach((rejectAction) => {
            builder.addCase(rejectAction, (state, action: any) => {
                if ('status' in action.payload && 'message' in action.payload) {
                    state.status = action.payload.status;
                    toast.error(action.payload.message);
                }
            });
        });
    }
})

export const { changeOrder, setTodoToEdit, selectTab, setTabs, changeTodoTab } = todoSlice.actions
export const selectTabs = (state: RootState) => state.todos.tabs
export const selectIsEdit = (state: RootState) => state.todos.isEdit
export const selectEditedTodo = (state: RootState) => state.todos.editedTodo
export const selectSelectedTabId = (state: RootState) => state.todos.currentTabSelectedId
export const selectStatus = (state: RootState) => state.todos.status

export const selectTabById = createSelector(
    [selectTabs, (state, tabId: string) => tabId],
    (tabs, tabId) => tabs.find(tab => tab._id === tabId)
);

export default todoSlice.reducer