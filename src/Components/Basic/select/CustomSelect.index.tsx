import { Select as AntSelect } from 'antd';
import React from 'react';

const { Option } = AntSelect;

type KeyValue = {
  key: string;
  value: string;
};

type Props = {
  options: KeyValue[];
  onChange?: any;
  className?: string;
  value?: string;
  defaultValue?: string;
  style?: any;
  placeholder?: string;
  disabled?: boolean;
};

const Select = ({
  options,
  onChange,
  style,
  value,
  defaultValue,
  className,
  placeholder,
  disabled,
}: Props) => {
  const renderOptions = () => {
    const selectOptions = [];
    for (const option of options) {
      selectOptions.push(
        <Option value={option.value} key={option.value}>
          {option.key}
        </Option>,
      );
    }
    return selectOptions;
  };

  return (
    <AntSelect
      defaultValue={defaultValue}
      style={style}
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
    >
      {renderOptions()}
    </AntSelect>
  );
};

export default Select;
