import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useBooksTaxonomies } from "./hooks/useBooksTaxonomies";
import CheckboxFilter from "./elements/CheckboxFilter";

export default function useFilters() {
    const { page } = useParams();
    const navigate = useNavigate();
    const currentPage = parseInt(page, 10) || 1;
    const { hash, pathname, search } = useLocation();

    const [filterGenres, setFilterGenres] = useState([]);
    const [filterCountries, setFilterCountries] = useState([]);
    const [filterLanguages, setFilterLanguages] = useState([]);
    const [filterReleases, setFilterReleases] = useState([]);
    const [filterWrirers, setFilterWrirers] = useState([]);
    const [filterReadingStatus, setFilterReadingStatus] = useState([]);

    const {genre, country, language, release, wrirer, readingStatus, loading, error} = useBooksTaxonomies();

    const handleFilterChange = (filterStateUpdater) => (itemId) => {
        filterStateUpdater((prevState) => {
            if (prevState.includes(itemId)) {
                return prevState.filter((id) => id !== itemId);
            } else {
                return [...prevState, itemId];
            }
        });
    };

    const handleGenreChange = handleFilterChange(setFilterGenres);
    const handleCountryChange = handleFilterChange(setFilterCountries);
    const handleLanguageChange = handleFilterChange(setFilterLanguages);
    const handleReleaseChange = handleFilterChange(setFilterReleases);
    const handleWrirerChange = handleFilterChange(setFilterWrirers);
    const handleReadingStatusChange = handleFilterChange(setFilterReadingStatus);

    useEffect(() => {
        const params = new URLSearchParams(search);

        // Add filter parameters
        if (filterGenres.length) params.set('genre', filterGenres.join(','));
        else params.delete('genre');

        if (filterCountries.length) params.set('country', filterCountries.join(','));
        else params.delete('country');

        if (filterLanguages.length) params.set('language', filterLanguages.join(','));
        else params.delete('language');

        if (filterReleases.length) params.set('release', filterReleases.join(','));
        else params.delete('release');

        if (filterWrirers.length) params.set('wrirer', filterWrirers.join(','));
        else params.delete('wrirer');

        if (filterReadingStatus.length) params.set('reading_status', filterReadingStatus.join(','));
        else params.delete('reading_status');

        navigate(`${pathname}?${params.toString()}`);
    }, [
        filterGenres,
        filterCountries,
        filterLanguages,
        filterReleases,
        filterWrirers,
        filterReadingStatus,
        navigate,
        pathname,
        search,
    ]);

    return (
        <>
            <div>
                {genre && <CheckboxFilter
                    name="Genre"
                    id="genre"
                    object={genre}
                    filterState={filterGenres}
                    handleFilterChange={handleGenreChange}
                />}

                {country && <CheckboxFilter
                    name="country"
                    id="country"
                    object={country}
                    filterState={filterCountries}
                    handleFilterChange={handleCountryChange}
                />}
                {language && <CheckboxFilter
                    name="language"
                    id="language"
                    object={language}
                    filterState={filterLanguages}
                    handleFilterChange={handleLanguageChange}
                />}
                {release && <CheckboxFilter
                    name="release"
                    id="release"
                    object={release}
                    filterState={filterReleases}
                    handleFilterChange={handleReleaseChange}
                />}
                {wrirer && <CheckboxFilter
                    name="wrirer"
                    id="wrirer"
                    object={wrirer}
                    filterState={filterWrirers}
                    handleFilterChange={handleWrirerChange}
                />}
                {readingStatus && <CheckboxFilter
                    name="reading_status"
                    id="reading_status"
                    object={readingStatus}
                    filterState={filterReadingStatus}
                    handleFilterChange={handleReadingStatusChange}
                />}
            </div>
        </>
    )
}