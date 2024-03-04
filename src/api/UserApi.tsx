import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';

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
        isError, 
        isSuccess,
        error,
        reset
    } = useMutation(updateUserRequest);

    return { updateUser, isLoading, isError, isSuccess, error, reset };
}