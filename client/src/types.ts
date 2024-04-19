import { Status } from "./redux/features/todo/todoSlice";

export interface Todo {
    title: string;
    isDaily: boolean;
    category: string;
    _id: string;
    endDate: string;
    order: number;
    description: string;
    tabId: string;
    isJustAdded?: boolean;
}

export type ITodoForm = Omit<Todo, 'isComplated' | '_id' | 'order'> & { tabId: string };

export interface ITodoCategory {
    value: string;
}

export interface IOrderData {
    tabId: string
    todos: Todo[]
}

export interface ITodoTab {
    _id: string
    title: string
    color: string
    textColor: string
    items: Todo[]
}

export interface ITabForm {
    title: string
    color: string
    textColor: string
}

export interface IEditTodo {
    todo: ITodoForm
    tabId: string
    todoId: string
}

export interface ErrorResponse {
    message: string
    status: Status
}