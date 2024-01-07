import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react"
import axios from "axios"
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL as string

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <RouterProvider router={router} />
  </NextUIProvider>,
)
