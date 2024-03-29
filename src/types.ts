export interface Todo {
    title: string;
    isDaily: boolean;
    category: string;
    isComplated: boolean;
    id: string;
    endDate: string;
    order: number;
}

export type ITodoForm = Omit<Todo, 'isComplated' | 'id' | 'endDate' | 'order'>;

export interface ITodoCategory {
    value: string;
}

export interface IOrderData {
    id: string
    order: number
}