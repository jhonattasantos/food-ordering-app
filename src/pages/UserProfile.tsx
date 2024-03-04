import { useUpdateUser } from "@/api/UserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfile = () => {
    const { updateUser, isLoading } = useUpdateUser();

    return <UserProfileForm onSave={updateUser} isLoading={isLoading} />
};

export default UserProfile;