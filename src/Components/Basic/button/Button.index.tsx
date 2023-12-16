import { Button } from 'antd';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

type Props = {
  type:
    | 'link'
    | 'text'
    | 'ghost'
    | 'primary'
    | 'default'
    | 'dashed';
  shape?: 'circle' | 'round' | undefined;
  icon?: JSX.Element | string;
  size?: 'small' | 'middle' | 'large' | undefined;
  onClick?: () => any;
  classNames?: string;
  children?: ReactNode;
  block?: true | false;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  isLoading?: true | false;
  disabled?: true | false;
  danger?: true | false;
  hidden?: true | false;
  style?: any
};

function CustomButton({
  type,
  shape,
  icon,
  size,
  onClick = () => {},
  classNames,
  children,
  block,
  htmlType,
  isLoading,
  disabled,
  danger,
  hidden,
  style
}: Props): JSX.Element {
  return (
    <Button
      // type={type || 'primary'}
      shape={shape || undefined}
      icon={icon}
      size={size}
      danger={danger ?? false}
      block={block}
      htmlType={htmlType}
      hidden={hidden ?? false}
      className={`custom-button ${classNames || ''} ${
        icon ? '' : ''
      }`}
      onClick={onClick}
      loading={isLoading}
      disabled={disabled}
      style={style}
    >
      {children}
    </Button>
  );
}

// PropTypes
CustomButton.propTypes = {
  type: PropTypes.string,
  shape: PropTypes.string,
  classNames: PropTypes.string,
  size: PropTypes.string,
  htmlType: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  children: PropTypes.any,
  block: PropTypes.bool,
  danger: PropTypes.bool,
  hidden: PropTypes.bool
};

export default CustomButton;
