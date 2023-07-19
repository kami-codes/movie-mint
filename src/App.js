

import Navbar from './Component/Navbar';
import Movies from './Component/Movies';

import Footer from './Component/Footer';
import Search from './Component/Search';
import { SearchContextProvider } from './Context/SearchContext';
import * as React from "react";


import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import SearchedMovie from './Component/SearchedMovie';
import Movie from './Component/Movie';


function App() {

  const Layout = () => {
    return (
      <>
        <Navbar />
        <Search />
        <Outlet />
        <Footer />
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Movies />
        },
        {
          path: '/searched',
          element: <SearchedMovie />
        },
        {
          path: "/movie/:id",
          element: <Movie />
        }
      ]
    }
  ])

  return (
    <>
      <SearchContextProvider>
        <RouterProvider router={router} />
      </SearchContextProvider>
    </>
  );
}

export default App;
