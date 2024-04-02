export interface Todo {
    title: string;
    isDaily: boolean;
    category: string;
    id: string;
    endDate: string;
    order: number;
    description: string;
}

export type ITodoForm = Omit<Todo, 'isComplated' | 'id' | 'endDate' | 'order'> & { tabId: string };

export interface ITodoCategory {
    value: string;
}

export interface IOrderData {
    id: string
    order: number
}

export interface ITodoTab {
    id: string
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