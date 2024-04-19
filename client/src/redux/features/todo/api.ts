import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse, IEditTodo, IOrderData, ITabForm, ITodoForm, ITodoTab } from "../../../types";
import axios from 'axios'
import { Status } from "./todoSlice";

// @ts-ignore
export const BASE_URL = import.meta.env.VITE_APP_ENV === 'docker' ? `https://localhost:${import.meta.env.VITE_SERVER_PORT}/api/` :
    // @ts-ignore
    `http://localhost:${import.meta.env.VITE_SERVER_PORT}/`


function handleErrors(err: any): ErrorResponse {
    if (err.message === 'Network Error' || err.message.includes('net::ERR_CONNECTION_REFUSED')) {
        return { message: 'Server not responding', status: Status.NetworkError }
    } else if (err.response && err.response.status === 404) {
        return { message: "Resource not found", status: Status.Error };
    } else if (err.response) {
        return { message: err.response.data, status: Status.Error };
    }

    return { message: err.message, status: Status.Error };
}

export const createTab = createAsyncThunk(
    'tab/createTab',
    async (tab: ITabForm, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}tab`, tab)
            return response.data
        } catch (err: any) {
            return rejectWithValue(handleErrors(err))
        }
    }
)

export const getTabs = createAsyncThunk(
    'tab/getTabs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}tab`)
            return response.data
        } catch (err: any) {
            return rejectWithValue(handleErrors(err))
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
            return rejectWithValue(handleErrors(err))
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
            return rejectWithValue(handleErrors(err))
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
            return rejectWithValue(handleErrors(err))
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
            return rejectWithValue(handleErrors(err))
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
            return rejectWithValue(handleErrors(err))
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
            return rejectWithValue(handleErrors(err))
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
            return rejectWithValue(handleErrors(err))
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
            return rejectWithValue(handleErrors(err))
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
            return rejectWithValue(handleErrors(err))
        }
    }
)

