import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";



const BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const useRestaurantAPI =()=> {

    const { getAccessTokenSilently } = useAuth0();

    const createRestaurantRequest = async(restaurantFormData:FormData):Promise<Restaurant>=>{
        const accessToken = await getAccessTokenSilently();
       
      
        const response = await fetch(`${BASE_URL}/restaurant`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: restaurantFormData,
        });
        console.log(response.status);
        if(response.status !== 201){
            throw new Error('Failed to create restaurant');
        }
        return response.json();
    }
    const{
        mutateAsync:CreateRestaurant,
        isPending,
        isSuccess,
        error
       
    } = useMutation<Restaurant,Error,FormData>({
        mutationFn: createRestaurantRequest,
    });

    if(isSuccess){
        toast.success('Restaurant created successfully');
    }
    if(error){
        toast.error('Failed to create restaurant');
    }

    return{
        CreateRestaurant,
        isLoading:isPending,
       
       
    }
    
}
