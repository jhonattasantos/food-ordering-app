import { useUpdateUser, useGetUser } from "@/api/UserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfile = () => {
    const { updateUser, isLoading } = useUpdateUser();
    const { currentUser, isLoading: isGetLoading } = useGetUser();

    if(isGetLoading) {
        return <span>Loading...</span>
    }

    if(!currentUser) {
        return <span>Unable to load user profile</span>
    }

    return <UserProfileForm 
        user={currentUser}
        onSave={updateUser} 
        isLoading={isLoading} 
    />
};

export default UserProfile;