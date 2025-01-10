import { HeroFormData } from '../../src/Pages/Marvel';

const baseUrl = 'http://localhost:5174';

export const server_calls = {
    get: async (token: string): Promise<HeroFormData[]> => {
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
            throw new Error('Unable to fetch data. Please try again later.');
        }
    },

    create: async ( data: HeroFormData) => {
        try {
          const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
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
          throw new Error('Unable to create data. Please try again later.');
        }
      },

    update: async (id: string, data: HeroFormData) => {
      try {
        const response = await fetch(`${baseUrl}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
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
            throw new Error('Unable to update data. Please try again later.');
        }
      },

      delete: async (token: string, id: string): Promise<void> => {
        try { 
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
            throw new Error('Unable to delete data. Please try again later.');
        }
    },
};