import axios from 'axios';
import { useState, useEffect } from 'react';

/**
 * Builds an API resource path for the given locale.
 * Implementers do not need to know api root or endpoint, but can get it.
 * @param {String} locale
 */
const getResource = locale => {
  const { GATSBY_DRUPAL_API: api } = process.env;
  return `${api}/${locale}/api/counters`;
};

/**
 * Use Counters API's statistics.
 * @param {String} locale
 */
const useCountersApi = locale => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const resource = getResource(locale);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(resource)
      .then(res => {
        setResponse(res);
        setIsLoading(false);
      })
      .catch(e => {
        setError(e);
        setIsLoading(false);
      });
  }, [locale]);

  return { response, isLoading, error };
};

export { useCountersApi, getResource };
