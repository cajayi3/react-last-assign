import { useCallback, useEffect, useState } from "react";
import { server_calls } from "../../src/api/server";
import {  useAuth0 } from "@auth0/auth0-react";


interface MarvelDataType {
  id: string;
  name: string;
  email: string;
}


export const useGetData = () => {
  const  {isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
  const [ MarvelData, setData] = useState<MarvelDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleDataFetch = useCallback(async () => {
  setLoading(true);
  setError(null);

  try {  
    if (isLoading || !isAuthenticated) {
      console.log("Waiting for authentication...");
      return;
    }  

    const token = await getAccessTokenSilently();
    const result = await server_calls.get(token);
    setData(result as unknown as MarvelDataType[]);
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
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);
  
  useEffect(() => {
    handleDataFetch();
  }, [handleDataFetch]);
  
  return { MarvelData, loading, error, getData: handleDataFetch };
};