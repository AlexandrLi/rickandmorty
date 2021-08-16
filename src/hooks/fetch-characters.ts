import React from "react";
import axios, { AxiosError } from "axios";
import { Character, ResponseInfo } from "../types";

export type FetchCharactersResponse = {
  info: ResponseInfo;
  results: Character[];
};

type FetchCharactersError = AxiosError<{ error: string }>;

export function useFetchCharacters() {
  const [data, setData] = React.useState<Character[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<AxiosError["response"] | null>(null);

  const fetch = React.useCallback(async (name?: string) => {
    try {
      setLoading(true);
      const response = await axios.get<FetchCharactersResponse>(
        "https://rickandmortyapi.com/api/character",
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
          params: { name },
        }
      );
      setData(response.data.results);
      setError(null);
    } catch (e) {
      setError((e as FetchCharactersError).response);
    } finally {
      setLoading(false);
    }
  }, []);

  return React.useMemo(
    () => ({
      data,
      loading,
      error,
      fetch,
    }),
    [data, error, fetch, loading]
  );
}
