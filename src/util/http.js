import axios from "axios";

export async function fetchBooks({signal, page, sortOrder}) {
    console.log(signal)
    console.log(page)

    let paramPage = page || 1;
    const sort = sortOrder || "desc";

    let url = `https://a.vsbookcollection.space/wp-json/wp/v2/book?page=${paramPage}&order=${sort}`;

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
    };

    try {
        const response = await axios.request(config);
        return { success: true, posts: response.data, totalPosts: response.headers['x-wp-total'], totalPages: response.headers['x-wp-totalpages']  }; // Returning success data
    } catch (error) {
        console.error("Error fetching books:", error);
        const errorMessage = new Error('An error occurred while fetching the events');
        error.message = "Error fetching books";
        return errorMessage; // In case of error we return null
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