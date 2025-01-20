import axios from "axios";

export async function fetchPosts({signal, page, sortOrder, filtersArray}) {
    // console.log(page)
    // console.log(sortOrder)
    // console.log(filtersArray)

    let paramPage = page || 1;
    const sort = sortOrder || "desc";

    let url = `https://a.vsbookcollection.space/wp-json/wp/v2/book?page=${paramPage}&order=${sort}`;

    if (filtersArray) {
        url += filtersArray.reduce((acc, [key, value]) => {
            if (key && value) {
                return `${acc}&${key}=${value}`;
            }
            return acc;
        }, "");
    }

    console.log(url)
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        // signal: signal
    };

    try {
        const response = await axios.request(config);
        console.log(response)
        return { success: true, posts: response.data, totalPosts: response.headers['x-wp-total'], totalPages: response.headers['x-wp-totalpages']  }; // Returning success data
    } catch (error) {
        console.error("Error fetching books:", error);
        const errorMessage = new Error('An error occurred while fetching the events');
        error.message = "Error fetching books";
        console.error("Error fetching books:", error);
        throw new Error('An error occurred while fetching the books');
    }
}

export async function fetchPostImage({post}) {
    try {
        const response = await axios.get(post?._links['wp:featuredmedia'][0]?.href);

        if (response.data && response.data.source_url) {
            return response.data.source_url;
        }
    } catch(error) {
        if (error.response && error.response.status === 404) {
            // If the image is missing, return null
            return null;
        }
        throw error;
    }
}

export async function fetchTaxonomy({taxonomyName}) {
    try {
        const response = await axios.get(`https://a.vsbookcollection.space/wp-json/wp/v2/${taxonomyName}?per_page=100`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function fetchPostTaxonomies({signal, postId, terms}) {
    if (!terms || terms.length === 0) return {};

    try {
        const results = await Promise.all(
            terms.map(async (item) => {
                try {
                    const config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: item.href,
                        signal: signal,
                    };
                    const response = await axios.request(config);
                    return { taxonomy: item.taxonomy, data: response.data };
                } catch (error) {
                    return { taxonomy: item.taxonomy, data: null };
                }
            })
        );

        // Collect data into an object
        const data = results.reduce((acc, curr) => {
            if (curr.data) {
                acc[curr.taxonomy] = curr.data;
            }
            return acc;
        }, {});

        return data;
    } catch (error) {
        console.error("Error fetching taxonomies:", error);
        return {};
    }
}


// export async function booksLoader({params, request}) {
//     // const response = await fetch('https://a.vsbookcollection.space/wp-json/wp/v2/book');
//     const url = new URL(request.url);
//     let page = params.page || 1; // Get the page number from the parameters or use 1 by default
//     const sort = url.searchParams.get("sort") || "desc";
//
//     const genre = url.searchParams.get("genre");
//     const country = url.searchParams.get("country");
//     const language = url.searchParams.get("language");
//     const release = url.searchParams.get("release");
//     const wrirer = url.searchParams.get("wrirer");
//     const readingStatus = url.searchParams.get("reading_status");
//
//     const genreParam = genre ? `&genre=${genre}` : '';
//     const countryParam = country ? `&country=${country}` : '';
//     const languageParam = language ? `&language=${language}` : '';
//     const releaseParam = release ? `&release=${release}` : '';
//     const wrirerParam = wrirer ? `&wrirer=${wrirer}` : '';
//     const readingStatusParam = readingStatus ? `&reading_status=${readingStatus}` : '';
//
//
//     const response = await fetch(`https://a.vsbookcollection.space/wp-json/wp/v2/book?page=${page}&order=${sort}${genreParam}${countryParam}${languageParam}${releaseParam}${wrirerParam}${readingStatusParam}`);
//
//
//     if (!response.ok) {
//         throw new Response(
//             "could not fetch books",
//             {status: 500}
//         )
//     } else {
//         const resData = await response.json();
//         return resData;
//     }
// }