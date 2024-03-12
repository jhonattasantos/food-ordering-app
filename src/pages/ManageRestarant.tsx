import { useCreateRestaurant, useGetRestaurant } from "@/api/RestaurantApi";
import ManageRestarantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestarant = () => {
    const { createRestaurant, isLoading } = useCreateRestaurant();
    const { restaurant } = useGetRestaurant();

    return <ManageRestarantForm 
                restaurant={restaurant}
                onSave={createRestaurant} 
                isLoading={isLoading}  
            />
}
export default ManageRestarant;