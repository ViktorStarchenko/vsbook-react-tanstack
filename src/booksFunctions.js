import axios from "axios";

export async function booksLoader({params}) {
    console.log(params)
    // const response = await fetch('https://a.vsbookcollection.space/wp-json/wp/v2/book');
    const page = params.page || 1; // Получаем номер страницы из параметров или используем 1 по умолчанию
    const response = await fetch(`https://a.vsbookcollection.space/wp-json/wp/v2/book?page=${page}`);

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

    let image = Object.fromEntries(formData.entries());

    console.log(image);

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

    console.log(data);

    return null
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
        return null; // Если токен недоступен, возвращаем null
    }
    // let title = 'MyTry5';
    // let content = 'SOME NEW CONTENT';
    // let status = 'publish';
    //
    // let urlParams = `title=${title}&content=${content}&status=${status}`;

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
        return response.data; // Возвращаем данные ответа
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