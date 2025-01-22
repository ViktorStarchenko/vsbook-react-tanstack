import axios from "axios";
import {getAuthToken} from "./auth";

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
        signal: signal
    };

    try {
        const response = await axios.request(config);

        if (response.status != 200) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        // console.log(response)
        return { success: true, posts: response.data, totalPosts: response.headers['x-wp-total'], totalPages: response.headers['x-wp-totalpages']  }; // Returning success data
    } catch (error) {
        throw new Error(error.message || "Failed to fetch books");
    }
}

export async function fetchPost({request, params, postId}) {
    if (!params.bookId) {
        throw new Error("Invalid argument provided");
    }

    let id = params.bookId;

    let url = 'https://a.vsbookcollection.space/wp-json/wp/v2/book/' + id;

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
    }

    try {
        const response = await axios.request(config);

        if (response.status != 200) {
            throw new Error("Failed to fetch book with id " + id);
        }

        return response.data

    } catch (error) {
        throw new Error("Failed to fetch book with id " + id);
        if (error.response && error.response.status === 404) {
            throw new Error("I can't find a post with this ID " + id);
        }
        return null;
    }

}

export async function fetchPostImage({signal, post, postId}) {
    if (!postId || !post) {
        throw new Error("Invalid post data or postId is missing");
    }

    try {
        const response = await axios.get(post?._links['wp:featuredmedia'][0]?.href);

        if (response.status != 200) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        if (response.data && response.data.source_url) {
            return response.data.source_url;
        }
    } catch(error) {
        if (error.response && error.response.status === 404) {
            // If the image is missing, return null
            return null;
        }
        throw new Error(error.message || "Failed to fetch image");
    }
}


export async function fetchTaxonomy({taxonomyName}) {
    if (!taxonomyName) {
        throw new Error("Invalid taxonomyName data");
    }

    try {
        const response = await axios.get(`https://a.vsbookcollection.space/wp-json/wp/v2/${taxonomyName}?per_page=100`);
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch image");
    }
}

export async function fetchPostTaxonomy({signal, taxonomyName, postId}) {
    if (!taxonomyName || !postId) {
        throw new Error("Invalid taxonomyName or postId data");
    }
    // "https://a.vsbookcollection.space/wp-json/wp/v2/genre?post=3109"
    let url = `https://a.vsbookcollection.space/wp-json/wp/v2/${taxonomyName}?post=${postId}`

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url
    }

    try {
        const response = await axios.request(config);

        if (response.status != 200) {
            throw new Error(`Failed to fetch taxonomy: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch post taxonomy " + taxonomyName);
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

export async function fetchPage({signal, postId}) {

    if (!postId) {
        throw new Error("Invalid argument provided");
    }

    let id = postId;

    let url = 'https://a.vsbookcollection.space/wp-json/wp/v2/pages/' + id;

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        signal: signal
    }

    try {
        const response = await axios.request(config);

        if (response.status != 200) {
            throw new Error("Failed to fetch page with id " + id);
        }

        return response.data

    } catch (error) {
        throw new Error("Failed to fetch page with id " + id);
        if (error.response && error.response.status === 404) {
            throw new Error("I can't find a page with this ID " + id);
        }
        return null;
    }
}


export async function createTaxonomyTerm({taxonomy, name}) {
    if (!name || !taxonomy) {
        throw new Error("Wrong or empty term name");
    }

    const token = getAuthToken();

    if (!token) {
        throw new Error("Wrong Auth token");
    }

    const slug = createSlug(name);
    const encodedText = encodeURIComponent(name);
    console.log(taxonomy)
    console.log(encodedText)
    console.log(slug)

    let url = `https://a.vsbookcollection.space/wp-json/wp/v2/${taxonomy}?slug=${slug}&name=${encodedText}`;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await axios.request(config);
        if (response.status != 200) {
            throw new Error("Failed to create term " + name);
        }
        console.log(response)
        return response
    } catch (error) {
        throw new Error("Failed to create term " + name);

        return null;
    }
}

function createSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
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