import { Auth0ContextInterface } from "@auth0/auth0-react";

const baseUrl = 'http://localhost:5174/';

export const server_calls = {
    get: async (token: string) => {
        try {
            const response = await fetch(baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch data: ${response.status} ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error in GET request:', error);
            throw error
        }
    },

    create: async (auth0Client: Auth0ContextInterface, data: any = {}) => {
        try {
            const token = await auth0Client.getAccessTokenSilently();
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create data: ${response.status} ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error in POST request:', error);
            throw error;
        }
    },

    update: async (auth0Client: Auth0ContextInterface, id: string, data: any = {}) => {
        try {
            const token = await auth0Client.getAccessTokenSilently();
            const response = await fetch(`{baseUrl}${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update data: ${response.status} ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error in PUT request:', error);
            throw error;
        }
    },

    delete: async (auth0Client: Auth0ContextInterface, id: string) => {
        try { 
            const token = await auth0Client.getAccessTokenSilently();
            const response = await fetch(`${baseUrl}${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete data: ${response.status} ${errorText}`);
            }
        } catch (error) {
            console.error('Error in DELETE request:', error);
            throw error;
        }
    },
};