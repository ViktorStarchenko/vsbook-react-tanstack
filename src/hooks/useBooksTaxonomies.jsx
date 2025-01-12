import { useEffect, useState } from "react";
import {
    fetchCountry,
    fetchGenre,
    fetchLanguage,
    fetchReadingStatus,
    fetchRelease,
    fetchWrirer,
} from "../booksFunctions";

export function useBooksTaxonomies() {
    const [data, setData] = useState({
        genre: null,
        country: null,
        language: null,
        release: null,
        wrirer: null,
        readingStatus: null,
        loading: false,
        error: null,
    });

    useEffect(() => {
        const loadData = async (key, fetchFunction) => {
            try {
                setData((prevData) => ({ ...prevData, loading: true }));
                const result = await fetchFunction();
                if (result) {
                    setData((prevData) => ({ ...prevData, [key]: result }));
                } else {
                    throw new Error(`Failed to load ${key}`);
                }
            } catch (error) {
                setData((prevData) => ({ ...prevData, error: error.message }));
            } finally {
                setData((prevData) => ({ ...prevData, loading: false }));
            }
        };

        loadData("genre", fetchGenre);
        loadData("country", fetchCountry);
        loadData("language", fetchLanguage);
        loadData("release", fetchRelease);
        loadData("wrirer", fetchWrirer);
        loadData("readingStatus", fetchReadingStatus);
    }, []);

    return data;
}
