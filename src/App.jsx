import { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import axios from "axios";


import router from './router.jsx'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

function App() {
  const [posts, setPosts] = useState([]);
    const routes = router.routes;
  const fetchPosts = () => {
      axios.get('https://a.vsbookcollection.space/wp-json/wp/v2/book').then((res) => {
          setPosts(res.data)
      })
  }

  // useEffect(() => {
  //     fetchPosts();
  // }, []);
    const queryClient = new QueryClient()
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
