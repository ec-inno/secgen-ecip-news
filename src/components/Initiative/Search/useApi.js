import axios from 'axios';
import { useState, useEffect } from 'react';

const useApi = ({ filters, pagination, language }) => {
  const { GATSBY_INITIATIVES_API: api } = process.env;

  const [initiatives, setInitiatives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    const lang = language.toUpperCase(); // Accepted values in service match the list in Gatsby, it's ensured.
    const endpoint = `${api}/register/search/ALL/${lang}/${pagination}`;

    axios
      .post(endpoint, filters)
      .then(response => {
        setInitiatives(response.data);
        setIsLoading(false);
      })
      .catch(e => {
        setError(e);
        setIsLoading(false);
      });
  }, [filters, pagination, language]);

  return { initiatives, isLoading, error };
};

export default useApi;
