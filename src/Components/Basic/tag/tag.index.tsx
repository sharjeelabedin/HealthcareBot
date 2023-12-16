import { Tag } from "antd";
import { PresetColorType, PresetStatusColorType } from "antd/es/_util/colors";
import { LiteralUnion } from "antd/es/_util/type";
import { FormEventHandler, MouseEventHandler, ReactNode } from "react";

type Props = {
  closable?: boolean;
  closeIcon?: ReactNode;
  prefixCls?: string;
  className?: string;
  color?: LiteralUnion<PresetColorType | PresetStatusColorType>;
  icon?: ReactNode;
  visible?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement>) => any;
  onChange?: FormEventHandler<HTMLSpanElement> | undefined;
  onClick?: MouseEventHandler<HTMLSpanElement> | undefined; // checked? : boolean;,
  onPreventMouseDown? :  MouseEventHandler<HTMLSpanElement> | undefined
  children?: any;
  Style?: any;
  title? : string;
};
const CustomTag = ({
  closable,
  closeIcon,
  prefixCls,
  className,
  color,
  icon,
  visible,
  onClose,
  onChange,
  onClick,
  onPreventMouseDown,
  children,
  Style,
  title,
  ...rest
}: // checked,
Props) => {
  return (
    <Tag
      closable={closable}
      closeIcon={closeIcon}
      prefixCls={prefixCls}
      className={className}
      color={color}
      icon={icon}
      onClose={onClose}
      onChange={onChange}
      onClick={onClick}
      style={Style}
      onMouseDown={onPreventMouseDown}
      title={title}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default CustomTag;
