import { useEffect, useState } from "react";
import { server_calls } from "../../src/api/server";
import { Auth0ContextInterface, useAuth0, User } from "@auth0/auth0-react";


interface MarvelDataType {
  id: string;
  name: string;
  email: string;
}


export const useGetData = () => {
  const  auth0Client = useAuth0() as Auth0ContextInterface<User>;
  const [ MarvelData, setData] = useState<MarvelDataType[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleDataFetch = async () => {
    try {  
      if (auth0Client.isLoading || !auth0Client.isAuthenticated) {
        console.log('Waiting for authentication...');
        return;
      }  

      const token = await auth0Client.getAccessTokenSilently();
      const result = await server_calls.get(token);
      setData(result as MarvelDataType[]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch marvel data');
      }
        console.log('Error fetching Marvel Data:', err);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      handleDataFetch();
    }, [auth0Client.isLoading, auth0Client.isAuthenticated]);
  
    return { MarvelData, loading, error, getData: handleDataFetch };
  };