import { useGetRestaurantAPI, useRestaurantAPI } from "@/api/restaurantAPI";
import ManageRestaurantForms from "@/components/forms/manage-restaurant-forms/manageRestaurantForms";

const ManageRestaurantPage = () => {
    const {CreateRestaurant,isLoading} = useRestaurantAPI();
    const {restaurant} = useGetRestaurantAPI();
   
    return (
      <ManageRestaurantForms restaurant={restaurant} onSave={CreateRestaurant} isLoading={isLoading}/>
    );
};

export default ManageRestaurantPage;