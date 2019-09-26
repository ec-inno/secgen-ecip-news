import axios from 'axios';
import { useState, useEffect } from 'react';

/**
 * Builds an API resource path for the given document ID.
 * Implementers do not need to know api root or endpoint, but can get it.
 * @param {Number} documentId
 */
const getResource = documentId => {
  const { GATSBY_INITIATIVES_API: api } = process.env;
  const resource = `${api}/register/document/${documentId}`;
  return resource;
};

const useDocumentApi = documentId => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const resource = getResource(documentId);

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
  }, []);

  return { response, isLoading, error };
};

export { useDocumentApi, getResource };
