import axios from 'axios';
import { useState, useEffect } from 'react';

const useInitiativesSearchApi = ({ query }) => {
  const { GATSBY_INITIATIVES_API: api } = process.env;
  const { pagination, section, language, filters } = query;

  const hasFilters =
    filters && typeof filters === 'object' && Object.keys(filters).length !== 0;

  // Remove filters with empty values or `any`.
  if (hasFilters) {
    Object.keys(filters).forEach(filter => {
      const values = filters[filter].filter(f => f).filter(f => f !== 'any');
      if (values.length === 0) {
        delete filters[filter];
      }
    });
  }

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    let request = null;

    setIsLoading(true);
    const lang = language.toUpperCase(); // Accepted values in service match the list in Gatsby, it's ensured.
    const endpoint = `${api}/register/search/${section}/${lang}/${pagination}`;

    // For the service empty filters is not same as no filters.
    // We don't send payload if not needed.
    if (hasFilters) {
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
  }, [pagination, section, language, filters]);

  return { results, isLoading, error };
};

export default useInitiativesSearchApi;
