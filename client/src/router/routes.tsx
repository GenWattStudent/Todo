import { RouteObject } from 'react-router-dom'
import TodoView from '../view/TodoView/TodoView'
import TodoDetailsView from '../view/TodoDetailsView/TodoDetailsView'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <TodoView />,
  },
  {
    path: '/todo/:tabId/:todoId',
    element: <TodoDetailsView />,
  },
]
