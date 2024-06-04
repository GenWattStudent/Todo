// import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './router/routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const root = document.getElementById('root')

const routerOptions = {
  basename: import.meta.env.MODE === 'development' ? '/' : '/Todo/',
}
const router = createBrowserRouter(routes, routerOptions)

if (!root) throw new Error('root element not found')

ReactDOM.createRoot(root).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
)
