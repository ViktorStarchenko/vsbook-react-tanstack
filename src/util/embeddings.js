import {aVsbookcollectionUrl} from "./http";
import {getAuthToken} from "./auth";

export async function sendEmbedding(sentencesData) {
    if (!sentencesData) return;

    const contentArr = sentencesData.map((item) => ({
        id: item.id.toString(),
        text: `${item.title.rendered} ${parseHTML(item.content.rendered)}`
    }));

    try {
        const response = await fetch(aVsbookcollectionUrl + "/wp-json/pinecone/v1/upsert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: contentArr }),
        });
        console.log("sentEmbedding response ", response);
    } catch (error) {
        throw new Error("Error sending embedding: ", error);
    }
}

export async function getSimilarEmbeddings(sentenceData) {
    if (!sentenceData) return;
    const token = getAuthToken();
    const queryText = `${sentenceData.title.rendered} ${parseHTML(sentenceData.content.rendered)}`;
    console.log(aVsbookcollectionUrl + "/wp-json/pinecone/v1/query")
    try {
        const response = await fetch(aVsbookcollectionUrl + "/wp-json/pinecone/v1/query", {
            method: "POST",
            headers: { 'Authorization': 'Bearer ' + token, "Content-Type": "application/json" },
            body: JSON.stringify({ queryText }),
        });
        const data = await response.json();
        console.log("response",response)
        return data;
    } catch (error) {
        throw new Error("Error fetching embedding: ", error);
    }
}

const parseHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
};


//
//
// export async function sendEmbedding(sentencesData) {
//     if (!sentencesData) return;
//
//     console.log(sentencesData)
//     const contentArr = sentencesData.map((item) => ({
//         id: item.id.toString(),
//         text: `${item.title.rendered} ${parseHTML(item.content.rendered)}`
//     }))
//
//     const data = contentArr;
//     try {
//         const response = await fetch("http://localhost:5000/api/upsert", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 data: data,
//             }),
//         });
//         console.log("sentEmbedding response ", response);
//     } catch (error) {
//         throw new Error("Error sending embedding: ", error);
//     }
// }
//
//
// export async function getSimilarEmbeddings(sentenceData) {
//     if (!sentenceData) return;
//
//     const queryText = `${sentenceData.title.rendered} ${parseHTML(sentenceData.content.rendered)}`;
//
//     try {
//         const response = await fetch("http://localhost:5000/api/query", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ queryText: queryText }),
//         });
//         const data = await response.json();
//         return data;
//     } catch(error) {
//         throw new Error("Error fetching embedding: ", error);
//     }
// }
//
// const parseHTML = (html) => {
//     const doc = new DOMParser().parseFromString(html, "text/html");
//     return doc.body.textContent || "";
// };
