import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateRequest = {
  auth0Id: string;
  email: string;
};
export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserRequest = async (user: CreateRequest) => {
    const userToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/signup`, {
      method: `POST`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.status !== 200) {
      throw new Error("Failed to create user");
    }
  };
  const {
    mutateAsync: createUser,
    isPending,
    isError,
  } = useMutation<void, Error, CreateRequest>({
    mutationFn: createUserRequest,
  });

  return {
    createUser,
    isLoading: isPending,
    isError,
  };
};

type UpdateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const userToken = await getAccessTokenSilently();

    const res = await fetch(`${BASE_URL}/update`, {
      method: `PUT`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.status !== 200) {
      throw new Error("Failed to update user from 200");
    }
  };
  const {
    mutateAsync: updateUser,
    isPending,
    isError,
    isSuccess,
    error,
    reset
  } = useMutation<void, Error, UpdateUserRequest>({
    mutationFn: updateUserRequest,
  });
  if (isSuccess) {
    toast.success("User updated successfully");
  }
  if (error) {
    toast.error("Failed to update user");
    reset();
  }
  return {
    updateUser,
    isLoading: isPending,
    isError,
    isSuccess,
    error,
    reset,
  };
};

 export const useGetUser = () =>{
    const {getAccessTokenSilently} = useAuth0();
    const getUserRequest = async ():Promise<User> =>{
        const userToken = await getAccessTokenSilently();
        const res = await fetch(`${BASE_URL}/user`,{
            method:'GET',
            headers:{
                Authorization:`Bearer ${userToken}`,
                'content-Type':'application/json',
            }
        });
        
        if(res.status !== 200){
            throw new Error('Failed to get user');
       
    };
    return res.json();
  
    }
   const {data:currentUser,isLoading, error} = useQuery({ queryKey: ["fetchCurrentUser"], queryFn: getUserRequest });
   if(error){
         toast.error('Failed to get user');
   }
    return {currentUser,isLoading};
 }