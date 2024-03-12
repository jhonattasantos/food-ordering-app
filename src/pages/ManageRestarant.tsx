import { useCreateRestaurant } from "@/api/RestaurantApi";
import ManageRestarantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestarant = () => {
    const { createRestaurant, isLoading } = useCreateRestaurant();

    return <ManageRestarantForm onSave={createRestaurant} isLoading={isLoading}  />
}
export default ManageRestarant;