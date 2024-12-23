import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import VideoDetails from './Container/VideoDetails';
import Home from './Container/Home';
const createRoutes = createHashRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/videoDetails/:vdID",
        element:<VideoDetails/>
      },
      {
      path:"*",
      element:<div> <h1> Page Not Found</h1></div>
      }
    ]}
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {createRoutes}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
