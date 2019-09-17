import axios from 'axios';
import { useState, useEffect } from 'react';

const useApi = ({ query }) => {
  console.log('query:init', query);
  const { GATSBY_INITIATIVES_API: api } = process.env;
  const { pagination, status, language: locale, filters } = query;

  // Remove filters with empty values or `any`.
  Object.keys(filters).forEach(filter => {
    const values = filters[filter].filter(f => f).filter(f => f !== 'any');
    if (values.length === 0) {
      delete filters[filter];
    }
  });

  const [initiatives, setInitiatives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    let request = null;

    setIsLoading(true);
    const language = locale.toUpperCase(); // Accepted values in service match the list in Gatsby, it's ensured.
    const endpoint = `${api}/register/search/${status}/${language}/${pagination}`;

    console.log('endpoint, filters', endpoint, filters);

    // For the service empty filters is not same as no filters.
    // We don't send payload if not needed.
    if (filters && Object.keys(filters).length !== 0) {
      request = axios.post(endpoint, { filters });
    } else {
      request = axios.get(endpoint);
    }

    request
      .then(response => {
        setInitiatives(response.data);
        setIsLoading(false);
      })
      .catch(e => {
        setError(e);
        setIsLoading(false);
      });
  }, [query]);

  return { initiatives, isLoading, error };
};

export default useApi;
