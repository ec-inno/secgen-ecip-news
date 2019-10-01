import axios from 'axios';
import { useState, useEffect } from 'react';

const useInitiativesSearchApi = ({ query }) => {
  const { GATSBY_INITIATIVES_API: api } = process.env;
  const { pagination, status, language: locale, filters } = query;

  // Remove filters with empty values or `any`.
  Object.keys(filters).forEach(filter => {
    const values = filters[filter].filter(f => f).filter(f => f !== 'any');
    if (values.length === 0) {
      delete filters[filter];
    }
  });

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    let request = null;

    setIsLoading(true);
    const language = locale.toUpperCase(); // Accepted values in service match the list in Gatsby, it's ensured.
    const endpoint = `${api}/register/search/${status}/${language}/${pagination}`;

    // For the service empty filters is not same as no filters.
    // We don't send payload if not needed.
    if (filters && Object.keys(filters).length !== 0) {
      request = axios.post(endpoint, { filters });
    } else {
      request = axios.get(endpoint);
    }

    request
      .then(response => {
        setResults(response.data);
        setIsLoading(false);
      })
      .catch(e => {
        setError(e);
        setIsLoading(false);
      });
  }, [pagination, status, locale, filters]);

  return { results, isLoading, error };
};

export default useInitiativesSearchApi;
