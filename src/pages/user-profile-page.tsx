
import { useGetUser, useUpdateUser } from '@/api/userAPI'
import UserProfileForm from '@/components/forms/user-profile-form/userProfileForm';


export const UserProfile =()=> {
   const {currentUser, isLoading:isGetLoading} = useGetUser();
    const {updateUser,isLoading:isUpdateLoading} = useUpdateUser();
    if(isGetLoading){
        return <span>Loading.....</span>
    }
    if(!currentUser){
        return <span>Failed to get user</span>
    }

  return (
    <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>

  )
}
