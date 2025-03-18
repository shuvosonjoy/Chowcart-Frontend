import useSearchRestaurants from "@/api/restaurantAPI";
import { useParams } from "react-router-dom";
import { SearchResultInfo } from './../components/searchResultInfo';
import SearchResultCard from "@/components/searchResultsCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "@/components/searchBar";

export type searchType ={
    searchQuery:string;
}

const SearchPage = () => {
    const {city}  = useParams();
    const [searchState,setSearchState]=useState<searchType>({
        searchQuery:""
    });
    const {results,isLoading} = useSearchRestaurants(searchState,city);
    if(isLoading){
        return <div>Loading...</div>
    }
    if(!city || !results?.data){
        return <div>No results found....</div>
    }

    const handleSetSearchquery = (searchFormData:SearchForm)=>{
        setSearchState((prevState)=>(
            {
                ...prevState,
                searchQuery:searchFormData.searchQuery

            }
        ));
        console.log("search query is : ", searchFormData.searchQuery);

    }
    const onResetSearch = () =>{
        setSearchState((prevState)=>(
            {
                ...prevState,
                searchQuery:""

            }
        ))

    }
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ml-5 mr-5 md:ml-0 md:mr-0">
            <div id="cuisines-list">
                Cuisines List
            </div>
            <div id="restaurent-list">
                <div>
                <SearchBar searchQuery={searchState.searchQuery} onSubmit={handleSetSearchquery} placeholder="Search By cuisine or restaurant" onReset={onResetSearch}/>
                    <SearchResultInfo total={results.data.length} city={city}/>
                    {results.data.map((restaurant)=>{
                        return <SearchResultCard restaurant={restaurant} />
                    })}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;