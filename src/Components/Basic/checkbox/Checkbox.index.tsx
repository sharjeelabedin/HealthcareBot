import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

type Props = {
    autoFocus? : boolean;
    checked? : boolean;
    defaultChecked? : boolean;
    disabled? : boolean;
    indeterminate? : boolean;
    singleValue? : boolean;
    onChange? : (e:Event | CheckboxChangeEvent | CheckboxValueType[]) => any;
    // Checkbox group

    defaultValue? : string[];
    name? : string;
    options? : string[] | number[]; // Option[]
    value? : string[];
    type : 'single' | 'group';
    children? : any;
    Style? : any;
};

function CustomCheckbox({
    autoFocus,
    checked,
    defaultChecked,
    disabled,
    indeterminate,
    onChange,
    defaultValue,
    name,
    options,
    value,
    type,
    children,
    Style,
    singleValue,
  ...rest
}: Props): JSX.Element {
  if(type === 'single')
  return (
    <Checkbox 
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        indeterminate={indeterminate}
        name={name}
        value={singleValue}
        style={Style}
        {...rest}
        >
          {children}
    </Checkbox>
  )  
  else
  return (
    <Checkbox.Group 
        defaultValue={defaultValue}
        options={options}
        onChange={onChange}
        value={value}
        {...rest}
        />
    
    );
}

// PropTypes
// CustomCheckbox.propTypes = {
//   placeholder: PropTypes.string,
//   classNames: PropTypes.string,
//   value: PropTypes.string,
//   prefix: PropTypes.node,
//   onChange: PropTypes.func,
//   error: PropTypes.bool,
//   rest: PropTypes.any,
// };

export default CustomCheckbox;
