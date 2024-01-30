import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Home from './pages/Home.tsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react"
import axios from "axios"
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL as string
axios.interceptors.request.use((config) => {

  const accessToken = localStorage.getItem("user")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/Chat",
    element: <App />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <RouterProvider router={router} />
  </NextUIProvider>,
)
