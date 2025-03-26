import { useGetMyRestaurantOrders, useGetRestaurantAPI, useRestaurantAPI, useUpdateRestaurantAPI } from "@/api/myRestaurantAPI";
import ManageRestaurantForms from "@/components/forms/manage-restaurant-forms/manageRestaurantForms";
import OrderItemCard from "@/components/orderItemsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManageRestaurantPage = () => {
    const {CreateRestaurant,isLoading : isCreateLoading } = useRestaurantAPI();
    const {restaurant} = useGetRestaurantAPI();
    const {UpdateRestaurant, isLoading:isUpdateLoading} = useUpdateRestaurantAPI();
    const { orders } = useGetMyRestaurantOrders();
    const isEditing = !!restaurant;
    return (
      <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForms
          restaurant={restaurant}
          onSave={isEditing ? UpdateRestaurant : CreateRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
    );
};

export default ManageRestaurantPage;