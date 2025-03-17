import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurantAPI = () =>{
    const {getAccessTokenSilently} = useAuth0();
    

    const getRestaurantRequest = async():Promise<Restaurant>=>{
     
        const accessToken = await getAccessTokenSilently();
      
        const response =await fetch(`${BASE_URL}/restaurant/get`,{
          
            method:"GET",
            headers:{
                Authorization: `Bearer ${accessToken}`,
            },
        });
  
        if(response.status !== 200){
            throw new Error("Failed to fetch restaurant");
        }
        return response.json();
    }
    const {data,isLoading,error} = useQuery<Restaurant,Error>({
        queryKey:["restaurant"],
        queryFn:getRestaurantRequest,
    });
    return{
        restaurant:data,
        isLoading,
        error,
    };
}


export const useRestaurantAPI = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${BASE_URL}/restaurant/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    console.log(response.status);
    if (response.status !== 201) {
      throw new Error("Failed to create restaurant");
    }
    return response.json();
  };
  const {
    mutateAsync: CreateRestaurant,
    isPending,
    isSuccess,
    error,
  } = useMutation<Restaurant, Error, FormData>({
    mutationFn: createRestaurantRequest,
  });

  if (isSuccess) {
    toast.success("Restaurant created successfully");
  }
  if (error) {
    toast.error("Failed to create restaurant");
  }

  return {
    CreateRestaurant,
    isLoading: isPending,
  };
};
