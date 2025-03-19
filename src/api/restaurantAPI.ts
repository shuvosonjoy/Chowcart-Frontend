
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { searchType } from '@/pages/searchPage';

export const useSearchRestaurants = (searchState?:searchType,city?:string) => {



   const useSearchRestaurantRequest = async():Promise<RestaurantSearchResponse>=>{
      const params = new URLSearchParams();
      params.set("searchQuery",searchState?.searchQuery || "");
      params.set("page",searchState?.page.toString() || "1");
      params.set("selectedCuisines",searchState?.selectedCuisines.join(",") || "");
      params.set("sortOption",searchState?.sortOption || "bestMatch");
      
     const response = await fetch (`${BASE_URL}/restaurant/search/${city}?${params.toString()}`);
     console.log(`${BASE_URL}/restaurant/search/${city}?${params.toString()}`);

       if(response.status !== 200){
          throw new Error("Failed to fetch restaurants");
       }
         return response.json();
   }
const {data:results,isLoading} = useQuery({
      queryKey: ["searchRestaurants",searchState],
      queryFn: useSearchRestaurantRequest,
      enabled: !!city
});
   return{
       results,
       isLoading,
   };
}
   

export default useSearchRestaurants;