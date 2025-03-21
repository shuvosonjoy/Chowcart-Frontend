import { useSearchRestaurants } from "@/api/restaurantAPI";
import { useParams } from "react-router-dom";
import { SearchResultInfo } from "./../components/searchResultInfo";
import SearchResultCard from "@/components/searchResultsCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "@/components/searchBar";
import { PaginationSelector } from "@/components/paginationSelector";
import CuisineFilter from "@/components/cuisineFilter";
import SortOptionDropdown from "@/components/sortOptionDropdown";

export type searchType = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<searchType>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const handleSetSearchquery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };
  const onResetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!city || !results?.data) {
    return <div>No results found....</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ml-5 mr-5 md:ml-0 md:mr-0">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="restaurent-list">
        <div>
          <SearchBar
            searchQuery={searchState.searchQuery}
            onSubmit={handleSetSearchquery}
            placeholder="Search By cuisine or restaurant"
            onReset={onResetSearch}
          />
          <div className="flex flex-col lg:flex-row gap-3 justify-between items-center mb-2 mt-2">
            <SearchResultInfo total={results.pagination.total} city={city} />
            <SortOptionDropdown
              onChange={(value) => setSortOption(value)}
              sortOption={searchState.sortOption}
            />
          </div>
          {results.data.map((restaurant) => {
            return <SearchResultCard restaurant={restaurant} />;
          })}
          <PaginationSelector
            page={results.pagination.page}
            pages={results.pagination.pages}
            onSetPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
