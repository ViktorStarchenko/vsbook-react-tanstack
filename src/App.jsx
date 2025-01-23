import { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { queryClient } from "./util/http";


import router from './router.jsx'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

function App() {
    const routes = router.routes;


  return (
    <>
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </HelmetProvider>
        {/*<RouterProvider router={router}/>*/}
    </>
  )
}

export default App
