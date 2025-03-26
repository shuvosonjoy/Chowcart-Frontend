
import { useGetUser, useUpdateUser } from '@/api/userAPI'
import UserProfileForm from '@/components/forms/user-profile-form/userProfileForm';


export const UserProfile =()=> {
   const {currentUser, isLoading:isGetLoading} = useGetUser();
    const {updateUser,isLoading:isUpdateLoading} = useUpdateUser();
    if(isGetLoading){
      <div className="flex justify-center items-center h-screen ">
      <img src="/Circles-menu-3.gif" alt="Loading..." />
    </div>
    }
    if(!currentUser){
        return <span>Failed to get user</span>
    }

  return (
    <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>

  )
}
