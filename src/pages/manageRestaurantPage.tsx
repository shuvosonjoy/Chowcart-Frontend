import { useRestaurantAPI } from "@/api/restaurantAPI";
import ManageRestaurantForms from "@/components/forms/manage-restaurant-forms/manageRestaurantForms";

const ManageRestaurantPage = () => {
    const {CreateRestaurant,isLoading} = useRestaurantAPI();
    return (
      <ManageRestaurantForms onSave={CreateRestaurant} isLoading={isLoading}/>
    );
};

export default ManageRestaurantPage;