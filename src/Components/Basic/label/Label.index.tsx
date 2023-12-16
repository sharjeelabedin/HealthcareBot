import PropTypes from 'prop-types';
import React from 'react';

type Props = {
  htmlFor?: string;
  className?: string;
  title?: string | React.ReactNode;
  color? : string;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
};

function Label({ htmlFor, className, title, color, onClick }: Props): JSX.Element {
  return (
    <label style={{color: color ? color : "black"}} htmlFor={htmlFor} className={` ${className || ''} `} onClick={onClick}>
      {title}
    </label>
  );
}

// PropTypes
Label.propTypes = {
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default Label;
