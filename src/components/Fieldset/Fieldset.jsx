import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Fieldset = ({
  helperId,
  helperText,
  invalid,
  invalidText,
  legend,
  legendClassName,
  name,
  optionalText,
  required,
  requiredText,
  className,
  children,
  ...props
}) => {
  const classNames = classnames(className, 'ecl-form-group');

  return (
    <fieldset
      {...props}
      {...(helperId ? { 'aria-describedby': helperId } : {})}
      className={classNames}
    >
      {legend && (
        <legend
          className={classnames(legendClassName, 'ecl-form-label', {
            'ecl-form-label--invalid': invalid,
          })}
        >
          {legend}
          {required ? (
            <Fragment>
              {requiredText && (
                <span className="ecl-form-label__required">{requiredText}</span>
              )}
            </Fragment>
          ) : (
            <Fragment>
              {optionalText && (
                <span className="ecl-form-label__optional">{optionalText}</span>
              )}
            </Fragment>
          )}
        </legend>
      )}

      {helperText && (
        <div {...(helperId ? { id: helperId } : {})} className="ecl-help-block">
          {helperText}
        </div>
      )}

      {invalid && invalidText && (
        <div className="ecl-feedback-message">{invalidText}</div>
      )}

      {children}
    </fieldset>
  );
};

Fieldset.propTypes = {
  helperId: PropTypes.string,
  helperText: PropTypes.node,
  invalid: PropTypes.bool,
  invalidText: PropTypes.node,
  children: PropTypes.any,
  legend: PropTypes.string,
  legendClassName: PropTypes.string,
  name: PropTypes.string,
  optionalText: PropTypes.string,
  required: PropTypes.bool,
  requiredText: PropTypes.string,
  className: PropTypes.string,
};

Fieldset.defaultProps = {
  helperId: '',
  helperText: '',
  invalid: false,
  invalidText: '',
  children: '',
  legend: '',
  legendClassName: '',
  name: '',
  optionalText: '',
  required: false,
  requiredText: '',
  className: '',
};

export default Fieldset;
