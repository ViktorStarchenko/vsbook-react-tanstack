import {redirect} from 'react-router-dom'

import axios from "axios";
import _WP from 'react-wp-api';
import {getAuthToken} from "./util/auth";


export async function booksLoader({params, request}) {

    const url = new URL(request.url);
    let page = params.page || 1; // Get the page number from the parameters or use 1 by default
    const sort = url.searchParams.get("sort") || "desc";

    const genre = url.searchParams.get("genre");
    const country = url.searchParams.get("country");
    const language = url.searchParams.get("language");
    const release = url.searchParams.get("release");
    const wrirer = url.searchParams.get("wrirer");
    const readingStatus = url.searchParams.get("reading_status");

    const genreParam = genre ? `&genre=${genre}` : '';
    const countryParam = country ? `&country=${country}` : '';
    const languageParam = language ? `&language=${language}` : '';
    const releaseParam = release ? `&release=${release}` : '';
    const wrirerParam = wrirer ? `&wrirer=${wrirer}` : '';
    const readingStatusParam = readingStatus ? `&reading_status=${readingStatus}` : '';

    const response = await fetch(`https://a.vsbookcollection.space/wp-json/wp/v2/book?page=${page}&order=${sort}${genreParam}${countryParam}${languageParam}${releaseParam}${wrirerParam}${readingStatusParam}`);

    if (!response.ok) {
        throw new Response(
            "could not fetch books",
            {status: 500}
        )
    } else {
        const resData = await response.json();
        return resData;
    }
}

export async function bookDetailLoader({request, params}) {
    const id = params.bookId;

    const response = await fetch('https://a.vsbookcollection.space/wp-json/wp/v2/book/' + id);

    if (!response.ok) {
        throw new Response(
            "could not fetch books",
            {status: 500}
        )
    } else {
        const resData = await response.json();
        return resData;
    }
}

export async function deleteBookAction({params, request}) {

    let id = params.bookId;
    let token = getAuthToken();
    let data = '';
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'https://a.vsbookcollection.space/wp-json/wp/v2/book/' + id,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data : data
    };

    try {
        await axios.request(config);
        return redirect('/books'); // Успешное удаление, редирект на список книг
    } catch (error) {
        console.error('Error deleting book:', error);
        throw new Response('Failed to delete book', { status: error.response?.status || 500 });
    }

}

// export function getBearerToken() {
//
//     let username = 'admin';
//     let password = 'Mk18Noveske12';
//     let params = `?username=${username}&password=${password}`
//
//     const response = await fetch('https://a.vsbookcollection.space/wp-json/jwt-auth/v1/token' + params, {
//         method: 'POST'
//     })
//
//     if (!response.ok) {
//         throw new Response(
//             "could not fetch token",
//             {status: 500}
//         )
//     } else {
//         const resData = await response.json();
//         console.log(resData.token)
//         if (resData.token) {
//             postBook(resData.token);
//         }
//         return resData;
//     }
// }
export async function getBearerToken() {
    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: 'https://a.vsbookcollection.space/wp-json/jwt-auth/v1/token?username=admin&password=Mk18Noveske12',
        headers: {}
    };

    try {
        const response = await axios.request(config);
        return response.data.token;
    } catch (error) {
        console.error('Error fetching token:', error);
        return null; // Возвращаем null в случае ошибки
    }
}

export async function uploadMedia(file) {

    let token = getAuthToken();
    if (!token || !file) {
        return null;
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://a.vsbookcollection.space/wp-json/wp/v2/media',
        headers: {
            'Content-Type': 'image/png',
            'Authorization': `Bearer ${token}`,
            'Content-Disposition': `attachment; filename="${file.name}"`,
        },
        data: file
    };

    try {
        const response = await axios.request(config);
        return response.data; // Returning success data
    } catch (error) {
        console.error("Error upload media:", error);
        return null; // In case of error we return null
    }

}

export async function postBook({request, params}) {

    let formData = await request.formData();
    let file = formData.get("featured_image");

    // Create an object and manually collect `genre` as an array
    let data = {};
    let errors = {};
    let errorMessage = null;
    formData.forEach((value, key) => {

        // If the key already exists (e.g. `genre`), add it to the array
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value); // Append to existing array
            } else {
                data[key] = [data[key], value]; // Convert to array
            }
        } else {
            data[key] = value; // Add the first value
        }
    });


    let featuredMedia = undefined;
    if (file.size > 0) {
        featuredMedia = await uploadMedia(file);
    }

    // Managing errors
    if (!data['title']) {
        errors.title = "The Title must not be empty"
    }
    if (!data['content']) {
        errors.content = "The Content must not be empty"
    }
    if (!featuredMedia || !featuredMedia.id) {
        errors.featured_media = "Failed to upload featured media.";
    } else {
        data.featured_media = featuredMedia.id;
    }

    // Convert `data` to a URL parameter string
    let urlParams = new URLSearchParams();

    // Adding data to `URLSearchParams`, correctly handling arrays
    for (const key in data) {
        if (Array.isArray(data[key])) {
            // For arrays (e.g. `genre`), concatenate values ​​separated by spaces
            urlParams.append(key, data[key].join(" "));
        } else {
            // For the remaining parameters, add one value
            urlParams.append(key, data[key]);
        }
    }

    console.log(data); // Now `genre` will be an array of all selected values
    console.log(urlParams); // Now `genre` will be an array of all selected values

    // let token = await getBearerToken();
    let token = getAuthToken();

    if (!token) {
        errors.token = "Token not available.";
    }

    // If there are errors, we return them
    if (Object.keys(errors).length > 0) {
        return { success: false, errors };
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://a.vsbookcollection.space/wp-json/wp/v2/book?' + urlParams,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await axios.request(config);
        // return response.data; // Returning response date
        return { success: true, post: response.data }; // Returning success data
    } catch (error) {
        console.error("Error posting book:", error);
        return null; // In case of error we return null
    }

}


export async function fetchGenre() {
    try {
        const response = await axios.get('https://a.vsbookcollection.space/wp-json/wp/v2/genre?per_page=100');
        return response.data; // Returns an array of genre data
    } catch (error) {
        console.error("Error fetching genres:", error);
        return null; // In case of error we return null
    }
}

export async function fetchLanguage() {
    try {
        const response = await axios.get('https://a.vsbookcollection.space/wp-json/wp/v2/language?per_page=100');
        return response.data; // Вернёт массив данных о жанрах
    } catch (error) {
        console.error("Error fetching languages:", error);
        return null; // В случае ошибки возвращаем null
    }
}

export async function fetchWrirer() {
    try {
        const response = await axios.get('https://a.vsbookcollection.space/wp-json/wp/v2/wrirer?per_page=100');
        return response.data; // Вернёт массив данных о жанрах
    } catch (error) {
        console.error("Error fetching wrirers:", error);
        return null; // В случае ошибки возвращаем null
    }
}

export async function fetchRelease() {
    try {
        const response = await axios.get('https://a.vsbookcollection.space/wp-json/wp/v2/release?per_page=100');
        return response.data; // Вернёт массив данных о жанрах
    } catch (error) {
        console.error("Error fetching releases:", error);
        return null; // В случае ошибки возвращаем null
    }
}

export async function fetchCountry() {
    try {
        const response = await axios.get('https://a.vsbookcollection.space/wp-json/wp/v2/country?per_page=100');
        return response.data; // Вернёт массив данных о жанрах
    } catch (error) {
        console.error("Error fetching countries:", error);
        return null; // В случае ошибки возвращаем null
    }
}

export async function fetchReadingStatus() {
    try {
        const response = await axios.get('https://a.vsbookcollection.space/wp-json/wp/v2/reading_status?per_page=100');
        return response.data; // Вернёт массив данных о жанрах
    } catch (error) {
        console.error("Error fetching countries:", error);
        return null; // В случае ошибки возвращаем null
    }
}