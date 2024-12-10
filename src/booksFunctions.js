import {redirect} from 'react-router-dom'

import axios from "axios";
import _WP from 'react-wp-api';


export async function booksLoader({params, request}) {
    // const response = await fetch('https://a.vsbookcollection.space/wp-json/wp/v2/book');
    const url = new URL(request.url);
    const page = params.page || 1; // Получаем номер страницы из параметров или используем 1 по умолчанию
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
        // return json(
        //     {message: "could not fetch books"},
        //     {status: 500}
        // );

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
        // return json(
        //     {message: "could not fetch books"},
        //     {status: 500}
        // );

        throw new Response(
            "could not fetch books",
            {status: 500}
        )
    } else {
        const resData = await response.json();
        return resData;
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

export async function postBook({request, params}) {

    let formData = await request.formData();
    let file = formData.get("featured_image");
    // console.log(file);
    // Создаем объект и вручную собираем `genre` как массив
    let data = {};
    formData.forEach((value, key) => {

        // Если ключ уже существует (например, `genre`), добавляем к массиву
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value); // Добавляем к существующему массиву
            } else {
                data[key] = [data[key], value]; // Преобразуем в массив
            }
        } else {
            data[key] = value; // Добавляем первое значение
        }
    });

    data.featured_media = 2817;

    // Преобразуем `data` в строку параметров URL
    let urlParams = new URLSearchParams();

    // Добавляем данные в `URLSearchParams`, корректно обрабатывая массивы
    for (const key in data) {
        if (Array.isArray(data[key])) {
            // Для массивов (например, `genre`), объединяем значения через пробел
            urlParams.append(key, data[key].join(" "));
        } else {
            // Для остальных параметров добавляем одно значение
            urlParams.append(key, data[key]);
        }
    }

    console.log(data); // Теперь `genre` будет массивом всех выбранных значений
    console.log(urlParams); // Теперь `genre` будет массивом всех выбранных значений

    // return null

    let token = await getBearerToken();

    if (!token) {
        console.error("Token not available");
        return null;
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
        // return response.data; // Возвращаем данные ответа
        return { success: true, post: response.data }; // Возвращаем данные об успехе
    } catch (error) {
        console.error("Error posting book:", error);
        return null; // В случае ошибки возвращаем null
    }

}


export async function fetchGenre() {
    try {
        const response = await axios.get('https://a.vsbookcollection.space/wp-json/wp/v2/genre?per_page=100');
        return response.data; // Вернёт массив данных о жанрах
    } catch (error) {
        console.error("Error fetching genres:", error);
        return null; // В случае ошибки возвращаем null
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