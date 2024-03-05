import { User } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    auth0Id: string;
    email: string;
}

export const useCreateUser  = () => {

    const { getAccessTokenSilently } = useAuth0();

    const createUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }
    }

    const { 
        mutateAsync: createUser, 
        isLoading, 
        isError, 
        isSuccess 
    } = useMutation(createUserRequest);

    return { createUser, isLoading, isError, isSuccess };
}

type UpdateUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}
export const useUpdateUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateUserRequest = async (user: UpdateUserRequest) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        return response.json();
    }

    const { 
        mutateAsync: updateUser, 
        isLoading, 
        isSuccess,
        error,
        reset
    } = useMutation(updateUserRequest);

    if(isSuccess) {
       toast.success('User updated successfully');
    }

    if(error) {
        toast.error(error.toString());
        reset();
    }

    return { updateUser, isLoading, isSuccess, error, reset };
}

export const useGetUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get user');
        }

        return response.json();
    }

    const { 
        data: currentUser, 
        isLoading, 
        isError, 
        error 
    } = useQuery('fetchCurrentUser', getUserRequest);

    if(error) {
        toast.error(error.toString());
    }

    return { currentUser, isLoading, isError };
};