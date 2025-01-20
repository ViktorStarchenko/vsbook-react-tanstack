import { useState, useEffect } from 'react';
import {useParams, useSearchParams, useLocation, useNavigate} from 'react-router-dom';
import AccordionFilter from "./AccordionFilter";
import AccordionFilterItem from "./AccordionFilterItem";
import {useTaxonomies} from "../../hooks/useTaxonomies";
import LoadingIndicator from "../LoadingIndicator";

export default function Filters({ searchParams, setSearchParams }) {
    const { page } = useParams();
    const navigate = useNavigate();
    // const {genre, country, language, release, wrirer, readingStatus, loading, error} = useTaxonomies();
    const {genre, country, language, release, wrirer, readingStatus, isLoading, isError} = useTaxonomies();

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

    if (isLoading) {
        content = <LoadingIndicator />
    }

    if (genre && country && language && release && wrirer && readingStatus) {
        content = (
            <AccordionFilter className="filters">
                <AccordionFilterItem id="genre">
                    <AccordionFilter.Title className="Title">Genre</AccordionFilter.Title>
                    <AccordionFilter.Checkbox
                        object={genre} // Assuming `genre` is fetched from `useTaxonomies`
                        filterState={filterGenres}
                        handleFilterChange={handleFilterChange('genre')}
                    />
                </AccordionFilterItem>

                <AccordionFilterItem id="country">
                    <AccordionFilter.Title className="Title">Country</AccordionFilter.Title>
                    <AccordionFilter.Checkbox
                        object={country} // Assuming `country` is fetched from `useTaxonomies`
                        filterState={filterCountries}
                        handleFilterChange={handleFilterChange('country')}
                    />
                </AccordionFilterItem>

                <AccordionFilterItem id="language">
                    <AccordionFilter.Title className="Title">Language</AccordionFilter.Title>
                    <AccordionFilter.Checkbox
                        object={language} // Assuming `language` is fetched from `useTaxonomies`
                        filterState={filterLanguages}
                        handleFilterChange={handleFilterChange('language')}
                    />
                </AccordionFilterItem>

                <AccordionFilterItem id="release">
                    <AccordionFilter.Title className="Title">Release Date</AccordionFilter.Title>
                    <AccordionFilter.Checkbox
                        object={release} // Assuming `release` is fetched from `useTaxonomies`
                        filterState={filterReleases}
                        handleFilterChange={handleFilterChange('release')}
                    />
                </AccordionFilterItem>

                <AccordionFilterItem id="wrirer">
                    <AccordionFilter.Title className="Title">Writer</AccordionFilter.Title>
                    <AccordionFilter.Checkbox
                        object={wrirer} // Assuming `wrirer` is fetched from `useTaxonomies`
                        filterState={filterWrirers}
                        handleFilterChange={handleFilterChange('wrirer')}
                    />
                </AccordionFilterItem>

                <AccordionFilterItem id="reading_status">
                    <AccordionFilter.Title className="Title">Reading Status</AccordionFilter.Title>
                    <AccordionFilter.Checkbox
                        object={readingStatus} // Assuming `readingStatus` is fetched from `useTaxonomies`
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
