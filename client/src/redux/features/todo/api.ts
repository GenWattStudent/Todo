import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEditTodo, IOrderData, ITabForm, ITodoForm, ITodoTab } from "../../../types";
import axios from 'axios'

// @ts-ignore
export const BASE_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT}/api/`

export const createTab = createAsyncThunk(
    'tab/createTab',
    async (tab: ITabForm, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}tab`, tab)
            return response.data
        } catch (err: any) {
            if (err.response) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
)

export const getTabs = createAsyncThunk(
    'tab/getTabs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}tab`)
            console.log('response', response.data)
            return response.data
        } catch (err: any) {
            if (err.response) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
)

export const deleteTab = createAsyncThunk(
    'tab/deleteTab',
    async (tabId: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL}tab/${tabId}`)
            return response.data
        } catch (err: any) {
            if (err.response) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
)

export const editTab = createAsyncThunk(
    'tab/editTab',
    async (tab: ITodoTab, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}tab/${tab._id}`, tab)
            return response.data
        } catch (err: any) {
            if (err.response) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
)

export const changeTabOrderApi = createAsyncThunk(
    'tab/reorder',
    async (tabs: ITodoTab[], { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}tabs/reorder`, tabs)
            return response.data
        } catch (err: any) {
            if (err.response) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
)

// TODOS

export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async (todo: ITodoForm, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}todo`, todo)
            return response.data
        } catch (err: any) {
            if (err.response) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (todoId: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL}todo/${todoId}`)
            return response.data
        } catch (err: any) {
            if (err.response) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
)

export const editTodo = createAsyncThunk(
    'todo/editTodo',
    async (todo: IEditTodo, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}todo/${todo.todoId}`, todo)
            return response.data
        } catch (err: any) {
            if (err.response) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
)

export const changeTodoOrderInSameTab = createAsyncThunk(
    'todo/changeOrder',
    async (todos: IOrderData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}todos/reorder`, todos)
            return response.data
        } catch (err: any) {
            if (err.response) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
)

export const changeTodoTabApi = createAsyncThunk(
    'todo/changeTab/',
    async (data: { todoId: string, tabId: string, order: number }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}todo/reorder/${data.todoId}`, { tabId: data.tabId, order: data.order })
            return response.data
        } catch (err: any) {
            if (err.response) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
)

export const getTodoById = createAsyncThunk(
    'todo/getTodoById',
    async (todoId: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}todo/${todoId}`)
            return response.data
        } catch (err: any) {
            if (err.response) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
)

