import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

const LinkButton = ({
  variant,
  label,
  href,
  icon,
  iconPosition,
  className,
  ...props
}) => {
  const classNames = classnames(className, 'ecl-button', {
    [`ecl-button--${variant}`]: variant,
  });

  const iconMarkup =
    icon && icon.shape ? (
      <Icon
        {...icon}
        data-ecl-icon
        className={classnames(icon.className, 'ecl-button__icon', {
          [`ecl-button__icon--${iconPosition}`]: iconPosition,
        })}
      />
    ) : (
      ''
    );

  return (
    <a {...props} href={href} className={classNames}>
      <span className="ecl-button__container">
        {iconPosition === 'before' && iconMarkup}
        <span className="ecl-button__label" data-ecl-label>
          {label}
        </span>
        {iconPosition === 'after' && iconMarkup}
      </span>
    </a>
  );
};

LinkButton.propTypes = {
  variant: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.shape(Icon.propTypes),
  iconPosition: PropTypes.string,
  className: PropTypes.string,
};

LinkButton.defaultProps = {
  variant: '',
  href: '',
  label: '',
  icon: {},
  iconPosition: 'after',
  className: '',
};

export default LinkButton;
