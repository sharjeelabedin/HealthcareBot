import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cross from "./Cross.png";
import Check from "./Check.png";
import './TextBox.css';
import { Input, Space } from 'antd';

type Props = {
  callFunction: (param: string) => void;
  HideTextBox: () => void;
  initialDescriptionText: string;
  maxCharacters: number;
};

const TextBoxWithoutStrip = ({ callFunction, HideTextBox, initialDescriptionText, maxCharacters }: Props) => {
  const [text, setText] = useState('');
  const [previousText, setPreviousText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxCharacters) {
      setText(newText);
    }
  };

  const handleSave = () => {
    callFunction(text);
    HideTextBox();
  };

  const handleCancel = () => {
    setText(previousText);
    HideTextBox();
  };

  const handleBlur = () => {
    // handleSave();
  };

  React.useEffect(() => {
    setText(initialDescriptionText);
    setPreviousText(initialDescriptionText);
  }, [initialDescriptionText]);

  return (
    <div>
      <div className="textbox-wrapper">
        <Input
          className="textbox-input"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          showCount maxLength={100}
          bordered={true}
       
          style={{ borderRadius: '10px', width: '85%' }}
          suffix={
            <Space>
                <button>
              <img
                className="textbox-icon textbox-icon-tick"
                src={Check}
                alt="Check"
                onClick={handleSave}
    
              />
                 </button>
                 <button>
              <img
                className="textbox-icon textbox-icon-cross"
                src={Cross}
                alt="Cross"
                onClick={handleCancel}
              />
              </button>
            </Space>
          }
        />
      </div>
    </div>
  );
};

export default TextBoxWithoutStrip;
