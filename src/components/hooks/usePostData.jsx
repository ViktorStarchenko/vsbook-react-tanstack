import { useEffect, useState } from "react";
import axios from "axios";

export function usePostData(post) {
    const [data, setData] = useState({
        featuredImage: '',
        genre: '',
        language: '',
        wrirer: '',
        release: '',
        country: '',
        readingStatus: '',
    });

    useEffect(() => {
        if (!post) return;

        const fetchData = async () => {
            try {
                const newData = { ...data };

                if (post._links['wp:featuredmedia']?.[0]?.href) {
                    const imgResponse = await axios.get(post._links['wp:featuredmedia'][0].href);
                    newData.featuredImage = imgResponse.data?.source_url || '';
                }

                for (let i = 0; i <= 5; i++) {
                    if (post._links['wp:term']?.[i]?.href) {
                        const termResponse = await axios.get(post._links['wp:term'][i].href);
                        const key = ['genre', 'language', 'wrirer', 'release', 'country', 'readingStatus'][i];
                        newData[key] = termResponse.data || '';
                    }
                }

                setData(newData);
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };

        fetchData();
    }, [post]);

    return data;
}
