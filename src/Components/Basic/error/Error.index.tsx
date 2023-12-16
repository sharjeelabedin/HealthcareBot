import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import AlertIcon from '../../../Assets/svgs/AlertIcon.svg';

type Props = {
  message: string | ReactNode;
  className?: string | undefined;
};

const Error = ({ message = '', className }: Props): JSX.Element => {
  return (
    <div className="h-validation-error__wrapper">
      <AlertIcon />
      <span className={`${className || ''}`}>
        {message}
      </span>
    </div>
  );
};

// PropTypes
Error.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default Error;
