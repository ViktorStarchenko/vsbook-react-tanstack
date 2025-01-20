import { useEffect, useState } from "react";
import {
    fetchCountry,
    fetchGenre,
    fetchLanguage,
    fetchReadingStatus,
    fetchRelease,
    fetchWrirer,
} from "../booksFunctions";
import {useQuery} from "@tanstack/react-query";
import {fetchTaxonomy} from "../util/http";
import LoadingIndicator from "../components/LoadingIndicator";

export function useTaxonomies() {

    const {data: dataGenre, isLoading: isLoadingGenre, isError: isErrorGenre, error: errorGenre} = useQuery({
        queryKey: ['taxonomy', {taxonomyName: 'genre'}],
        queryFn: () => fetchTaxonomy({taxonomyName: 'genre'})
    })
    const {data: dataCountry, isLoading: isLoadingCountry, isError: isErrorCountry, error: errorCountry} = useQuery({
        queryKey: ['taxonomy', {taxonomyName: 'country'}],
        queryFn: () => fetchTaxonomy({taxonomyName: 'country'})
    })
    const {data: dataLanguage, isLoading: isLoadingLanguage, isError: isErrorLanguage, error: errorLanguage} = useQuery({
        queryKey: ['taxonomy', {taxonomyName: 'language'}],
        queryFn: () => fetchTaxonomy({taxonomyName: 'language'})
    })
    const {data: dataRelease, isLoading: isLoadingRelease, isError: isErrorRelease, error: errorRelease} = useQuery({
        queryKey: ['taxonomy', {taxonomyName: 'release'}],
        queryFn: () => fetchTaxonomy({taxonomyName: 'release'})
    })
    const {data: dataWrirer, isLoading: isLoadingWrirer, isError: isErrorWrirer, error: errorWrirer} = useQuery({
        queryKey: ['taxonomy', {taxonomyName: 'wrirer'}],
        queryFn: () => fetchTaxonomy({taxonomyName: 'wrirer'})
    })
    const {data: dataReadingStatus, isLoading: isLoadingReadingStatus, isError: isErrorReadingStatus, error: errorReadingStatus} = useQuery({
        queryKey: ['taxonomy', {taxonomyName: 'reading_status'}],
        queryFn: () => fetchTaxonomy({taxonomyName: 'reading_status'})
    })

    let data = {
        'genre': '',
        'country': '',
        'language': '',
        'release': '',
        'wrirer': '',
        'readingStatus': '',
        'isLoading': false,
        'isError': false,
    };

    if (dataGenre) {
        data.genre = dataGenre
    }
    if (dataCountry) {
        data.country = dataCountry
    }
    if (dataLanguage) {
        data.language = dataLanguage
    }
    if (dataRelease) {
        data.release = dataRelease
    }
    if (dataWrirer) {
        data.wrirer = dataWrirer
    }
    if (dataReadingStatus) {
        data.readingStatus = dataReadingStatus
    }

    if (isLoadingGenre || isLoadingCountry || isLoadingLanguage || isLoadingRelease || isLoadingWrirer || isLoadingReadingStatus) {
        data.isLoading = true;
    }

    if (isErrorGenre || isErrorCountry || isErrorLanguage || isErrorRelease || isErrorWrirer || isErrorReadingStatus) {
        data.isError = true;
    }

    // const [data, setData] = useState({
    //     genre: null,
    //     country: null,
    //     language: null,
    //     release: null,
    //     wrirer: null,
    //     readingStatus: null,
    //     loading: false,
    //     error: null,
    // });
    //
    // useEffect(() => {
    //     const loadData = async (key, fetchFunction) => {
    //         try {
    //             setData((prevData) => ({ ...prevData, loading: true }));
    //             const result = await fetchFunction();
    //             if (result) {
    //                 setData((prevData) => ({ ...prevData, [key]: result }));
    //             } else {
    //                 throw new Error(`Failed to load ${key}`);
    //             }
    //         } catch (error) {
    //             setData((prevData) => ({ ...prevData, error: error.message }));
    //         } finally {
    //             setData((prevData) => ({ ...prevData, loading: false }));
    //         }
    //     };
    //
    //     loadData("genre", fetchGenre);
    //     loadData("country", fetchCountry);
    //     loadData("language", fetchLanguage);
    //     loadData("release", fetchRelease);
    //     loadData("wrirer", fetchWrirer);
    //     loadData("readingStatus", fetchReadingStatus);
    // }, []);

    return data;
}
