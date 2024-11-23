import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout } from './components/index.js'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Support from './pages/Support.jsx'
import Forum from './pages/Forum.jsx'
import Circulars from './pages/Circulars.jsx'
import Blogs from './pages/Blogs.jsx'
import Bookshop from './pages/Bookshop.jsx'
import Exams from './pages/Exams.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "",
            element: <Home />,
        },
        {
            path: "/support",
            element: <Support />,
        },
        {
            path: "/login",
            element: (   
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SignUp />
                </AuthLayout>
            ),
        },
        {
            path: "/forum",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Forum />
                </AuthLayout>
            ),
        },
        {
            path: "/circulars",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Circulars />
                </AuthLayout>
            ),
        },
        {
            path: "/blogs",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Blogs />
                </AuthLayout>
            ),
        },
        {
            path: "/bookshop",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Bookshop />
                </AuthLayout>
            ),
        },
        {
            path: "/exams",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Exams />
                </AuthLayout>
            ),
        },
        {
            path: "/dashboard",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Dashboard />
                </AuthLayout>
            ),
        },
    ],
},
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/> 
    </Provider>
  </React.StrictMode>,
)
