import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import './index.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('root element not found')
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
