import { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import { queryClient } from "./util/http";


import router from './router.jsx'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

function App() {
    const routes = router.routes;


  return (
    <>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
        {/*<RouterProvider router={router}/>*/}
    </>
  )
}

export default App
