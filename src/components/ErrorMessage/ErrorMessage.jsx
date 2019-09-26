import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Message from '../Message';

const ErrorMessage = ({ title, error }) => {
  const { t } = useTranslation();
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    if (error.message) {
      setVisibility(true);
    }
  }, [error]);

  return (
    <Message
      variant="error"
      className={isVisible ? '' : 'ecl-u-d-none'}
      onClose={() => setVisibility(false)}
      title={title}
      description={error.message}
      icon={{
        shape: 'notifications--error',
        size: 'l',
      }}
      close={{
        variant: 'ghost',
        label: t('Close'),
        icon: {
          shape: 'ui--close',
          size: 's',
        },
      }}
    />
  );
};

ErrorMessage.propTypes = {
  title: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default ErrorMessage;
