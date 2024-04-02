// import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './router/routes'

const root = document.getElementById('root')
const router = createBrowserRouter(routes)

if (!root) {
  throw new Error('root element not found')
}

ReactDOM.createRoot(root).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  // </React.StrictMode>

)
