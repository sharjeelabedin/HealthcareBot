import { Input } from "antd";
import "./textarea.css";

const CustomTextArea = ({ suffix, ...props }: any) => {
  const suffixIcon = suffix ? <div className="suffix-icon">{suffix}</div> : null;

  return (
    <div className="custom-text-area-container">
      <div className="text-area-wrapper">
        <Input.TextArea {...props} className="custom-text-area" />
        {suffixIcon}
      </div>
    </div>
  );
};

export default CustomTextArea;
