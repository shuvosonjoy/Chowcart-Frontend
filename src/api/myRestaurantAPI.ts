import { Order, Restaurant } from "@/types";
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


export const useUpdateRestaurantAPI = () =>{
  const {getAccessTokenSilently} = useAuth0();
  const updateRestaurantRequest = async(restaurantFormData:FormData):Promise<Restaurant>=>{
    const accessToken = await getAccessTokenSilently();
 
    const response = await fetch(`${BASE_URL}/restaurant/update`,{
      method:"PUT",
      headers:{
        Authorization: `Bearer ${accessToken}`,
      },
      body:restaurantFormData,
    });

    if(response.status !== 200){
      throw new Error("Failed to update restaurant");
    }
    return response.json();
  }
  const {
    mutateAsync: UpdateRestaurant,
    isPending,
    isSuccess,
    error,
  }= useMutation<Restaurant,Error,FormData>({

    mutationFn:updateRestaurantRequest,

  });
  if(isSuccess){
    toast.success("Restaurant updated successfully");
  }
  if(error){
    toast.error("Failed to update restaurant ");
  }
  return{
    UpdateRestaurant,
    isLoading:isPending,
  }
  
}



export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${BASE_URL}/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery({
    queryKey: ["fetchMyRestaurantOrders"],
    queryFn: getMyRestaurantOrdersRequest,
  });

  return { orders, isLoading };
};




type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${BASE_URL}/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );
    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isPending:isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation<unknown, Error, UpdateOrderStatusRequest>({
    mutationFn: updateMyRestaurantOrder,
  });

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};