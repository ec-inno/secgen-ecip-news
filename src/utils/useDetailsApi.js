import axios from 'axios';
import { useState, useEffect } from 'react';

const useDetailsApi = ({ location, locale }) => {
  const { GATSBY_INITIATIVES_API: api } = process.env;

  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    const initiativeId = location.hash.substr(1, location.hash.length);
    const endpoint = `${api}/register/details/${initiativeId}`;

    setIsLoading(true);

    axios
      .get(endpoint)
      .then(response => {
        setDetails(response.data);
        setIsLoading(false);
      })
      .catch(e => {
        setError(e);
        setIsLoading(false);
      });
  }, [locale]);

  return { details, isLoading, error };
};

export default useDetailsApi;
