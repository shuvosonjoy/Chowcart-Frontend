import { useGetRestaurantAPI, useRestaurantAPI, useUpdateRestaurantAPI } from "@/api/myRestaurantAPI";
import ManageRestaurantForms from "@/components/forms/manage-restaurant-forms/manageRestaurantForms";

const ManageRestaurantPage = () => {
    const {CreateRestaurant,isLoading : isCreateLoading } = useRestaurantAPI();
    const {restaurant} = useGetRestaurantAPI();
    const {UpdateRestaurant, isLoading:isUpdateLoading} = useUpdateRestaurantAPI();
   
    const isEditing = !!restaurant;
    return (
      <ManageRestaurantForms restaurant={restaurant} onSave={isEditing? UpdateRestaurant:CreateRestaurant } isLoading={isCreateLoading || isUpdateLoading}/>
    );
};

export default ManageRestaurantPage;