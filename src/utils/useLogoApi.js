import axios from 'axios';
import { useState, useEffect } from 'react';

/**
 * Builds an API resource path for the given logo ID.
 * Implementers do not need to know api root or endpoint, but can get it.
 * @param {Number} logoId
 */
const getResource = logoId => {
  const { GATSBY_INITIATIVES_API: api } = process.env;
  const resource = `${api}/register/logo/${logoId}`;
  return resource;
};

const useLogoApi = logoId => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const resource = getResource(logoId);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(resource, { responseType: 'arraybuffer' })
      .then(response => {
        setData(Buffer.from(response.data, 'binary').toString('base64'));
        setIsLoading(false);
      })
      .catch(e => {
        setError(e);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
};

export { useLogoApi, getResource };
