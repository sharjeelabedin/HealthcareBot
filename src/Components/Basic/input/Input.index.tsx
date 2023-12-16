import { Input } from 'antd';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

type Props = {
  placeholder?: string | undefined;
  prefix?: ReactNode;
  classNames?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  error?: string | boolean;
  value?: string;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  name?: string;
  type?: string;
  disabled?: true | false;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement> | undefined) => void;
  style?: any;
  suffix?: any;
  size?: "large" | "middle" | "small";
  allowClear?: boolean | undefined
};

function CustomInput({
  placeholder,
  prefix,
  classNames,
  onChange,
  onPressEnter,
  error,
  type,
  value,
  style,
  size,
  allowClear,
  ...rest
}: Props): JSX.Element {
  if (type === "password") 
    return(
      <Input.Password placeholder={placeholder || ''}
      prefix={prefix || null}
      className={` ${classNames || ''}`}
      onChange={onChange || ((e) => { })}
      // style={error ? { border: '1px solid red' } : undefined}
      {...rest}
      size={size}
      value={value || ''} />
    )
  else
  return (
    <Input
      placeholder={placeholder || ''}
      prefix={prefix || null}
      className={` ${classNames || ''}`}
      onPressEnter={ onPressEnter || (e => {}) }
      onChange={onChange || ((e) => { })}
      style={error ? { border: '1px solid red' } : style}
      size={size}
      {...rest}
      value={value || ''}
      allowClear={allowClear ? true : false}
    />
  );
}

// PropTypes
CustomInput.propTypes = {
  placeholder: PropTypes.string,
  classNames: PropTypes.string,
  value: PropTypes.string,
  prefix: PropTypes.node,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  rest: PropTypes.any,
};

export default CustomInput;
