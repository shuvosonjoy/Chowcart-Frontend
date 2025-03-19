import useSearchRestaurants from "@/api/restaurantAPI";
import { useParams } from "react-router-dom";
import { SearchResultInfo } from './../components/searchResultInfo';
import SearchResultCard from "@/components/searchResultsCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "@/components/searchBar";
import { PaginationSelector } from "@/components/paginationSelector";

export type searchType ={
    searchQuery:string;
    page:number;
}

const SearchPage = () => {

    const {city}  = useParams();
    const [searchState,setSearchState]=useState<searchType>({
        searchQuery:"",
        page:1
    });
    const {results,isLoading} = useSearchRestaurants(searchState,city);

    const setPage = (page:number)=>{
        setSearchState((prevState)=>({
            ...prevState,
            page,

        }))
    }

    const handleSetSearchquery = (searchFormData:SearchForm)=>{
        setSearchState((prevState)=>(
            {
                ...prevState,
                searchQuery:searchFormData.searchQuery,
                page:1

            }
        ));
       

    }
    const onResetSearch = () =>{
        setSearchState((prevState)=>(
            {
                ...prevState,
                searchQuery:"",
                page:1

            }
        ))

    }

    if(isLoading){
        return <div>Loading...</div>
    }
    if(!city || !results?.data){
        return <div>No results found....</div>
    }


    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ml-5 mr-5 md:ml-0 md:mr-0">
            <div id="cuisines-list">
                Cuisines List
            </div>
            <div id="restaurent-list">
                <div>
                <SearchBar searchQuery={searchState.searchQuery} onSubmit={handleSetSearchquery} placeholder="Search By cuisine or restaurant" onReset={onResetSearch}/>
                    <SearchResultInfo total={results.pagination.total} city={city}/>
                    {results.data.map((restaurant)=>{
                        return <SearchResultCard restaurant={restaurant} />
                    })}
                    <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onSetPage={setPage}/>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;