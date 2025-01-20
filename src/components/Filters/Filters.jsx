import { useState, useEffect } from 'react';
import {useParams, useSearchParams, useLocation, useNavigate} from 'react-router-dom';
import AccordionFilter from "./AccordionFilter";
import AccordionFilterItem from "./AccordionFilterItem";
import {usePostTaxonomies} from "../../hooks/usePostTaxonomies";
import LoadingIndicator from "../LoadingIndicator";

export default function Filters({ searchParams, setSearchParams }) {
    const { page } = useParams();
    const navigate = useNavigate();
    // const {genre, country, language, release, wrirer, readingStatus, loading, error} = usePostTaxonomies();
    const {genre, country, language, release, wrirer, readingStatus} = usePostTaxonomies();

    let genreData
    let countryData
    let languageData
    let releaseData
    let wrirerData
    let readingStatusData
    if (genre.data) {
        genreData = genre.data
    }
    if (country.data) {
        countryData = country.data
    }
    if (language.data) {
        languageData = language.data
    }
    if (release.data) {
        releaseData = release.data
    }
    if (wrirer.data) {
        wrirerData = wrirer.data
    }
    if (readingStatus.data) {
        readingStatusData = readingStatus.data
    }

    // Local filter states
    const filterGenres = searchParams.get('genre') ? searchParams.get('genre').split(',') : [];
    const filterCountries = searchParams.get('country') ? searchParams.get('country').split(',') : [];
    const filterLanguages = searchParams.get('language') ? searchParams.get('language').split(',') : [];
    const filterReleases = searchParams.get('release') ? searchParams.get('release').split(',') : [];
    const filterWrirers = searchParams.get('wrirer') ? searchParams.get('wrirer').split(',') : [];
    const filterReadingStatus = searchParams.get('reading_status') ? searchParams.get('reading_status').split(',') : [];

    const handleFilterChange = (param) => (itemId) => {
        const updatedFilters = new Set(searchParams.get(param) ? searchParams.get(param).split(',') : []);
        let itemIdStr = itemId.toString()
        if (updatedFilters.has(itemIdStr)) {
            updatedFilters.delete(itemIdStr);
        } else {
            updatedFilters.add(itemIdStr);
        }
        console.log(updatedFilters)

        const newParams = new URLSearchParams(searchParams);
        if (updatedFilters.size > 0) {
            newParams.set(param, Array.from(updatedFilters).join(','));
        } else {
            newParams.delete(param);
        }

        setSearchParams(newParams);
        navigate(`/books/page/1?${newParams.toString()}`);
    };

    const handleResetAllFilters = () => {
        setSearchParams(new URLSearchParams());
        navigate(`/books/page/1`);
    };

    let content

    if (genre.isLoading || country.isLoading || language.isLoading || release.isLoading, wrirer.isLoading || readingStatus.isLoading) {
        content = <LoadingIndicator />
    }

    if ( genreData && countryData && languageData && releaseData && wrirerData && readingStatusData) {
        content = (
            <AccordionFilter className="filters">
                <AccordionFilterItem id="genre">
                    <AccordionFilter.Title className="Title">Genre</AccordionFilter.Title>
                    <AccordionFilter.Checkbox
                        object={genreData} // Assuming `genre` is fetched from `usePostTaxonomies`
                        filterState={filterGenres}
                        handleFilterChange={handleFilterChange('genre')}
                    />
                </AccordionFilterItem>

                <AccordionFilterItem id="country">
                    <AccordionFilter.Title className="Title">Country</AccordionFilter.Title>
                    <AccordionFilter.Checkbox
                        object={countryData} // Assuming `country` is fetched from `usePostTaxonomies`
                        filterState={filterCountries}
                        handleFilterChange={handleFilterChange('country')}
                    />
                </AccordionFilterItem>

                <AccordionFilterItem id="language">
                    <AccordionFilter.Title className="Title">Language</AccordionFilter.Title>
                    <AccordionFilter.Checkbox
                        object={languageData} // Assuming `language` is fetched from `usePostTaxonomies`
                        filterState={filterLanguages}
                        handleFilterChange={handleFilterChange('language')}
                    />
                </AccordionFilterItem>

                <AccordionFilterItem id="release">
                    <AccordionFilter.Title className="Title">Release Date</AccordionFilter.Title>
                    <AccordionFilter.Checkbox
                        object={releaseData} // Assuming `release` is fetched from `usePostTaxonomies`
                        filterState={filterReleases}
                        handleFilterChange={handleFilterChange('release')}
                    />
                </AccordionFilterItem>

                <AccordionFilterItem id="wrirer">
                    <AccordionFilter.Title className="Title">Writer</AccordionFilter.Title>
                    <AccordionFilter.Checkbox
                        object={wrirerData} // Assuming `wrirer` is fetched from `usePostTaxonomies`
                        filterState={filterWrirers}
                        handleFilterChange={handleFilterChange('wrirer')}
                    />
                </AccordionFilterItem>

                <AccordionFilterItem id="reading_status">
                    <AccordionFilter.Title className="Title">Reading Status</AccordionFilter.Title>
                    <AccordionFilter.Checkbox
                        object={readingStatusData} // Assuming `readingStatus` is fetched from `usePostTaxonomies`
                        filterState={filterReadingStatus}
                        handleFilterChange={handleFilterChange('reading_status')}
                    />
                </AccordionFilterItem>

                <div className="btn" onClick={handleResetAllFilters}>Reset All Filters</div>
            </AccordionFilter>
        )
    }

    return (
        <div className="wrapper-1220">
            {content}
        </div>
    );
}
