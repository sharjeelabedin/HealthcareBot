import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cross from "./Cross.png";
import Check from "./Check.png";
import './TextBox.css';

import { Input, Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { TextArea } = Input;

type Props = {
  callFunction: (param: string) => void;
  HideTextBox: () => void;
  initialDescriptionText: string;
  maxCharacters: number;
};

const TextBox = ({
  callFunction,
  HideTextBox,
  initialDescriptionText,
  maxCharacters,
}: Props) => {
  const [text, setText] = useState('');
  const [previousText, setPreviousText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.style.setProperty('height', 'auto');
    textareaRef.current?.style.setProperty(
      'height',
      `${textareaRef.current?.scrollHeight}px`
    );
  }, [text]);

  const handleSave = () => {
    callFunction(text);
    HideTextBox();
  };

  const handleCancel = () => {
    setText(previousText);
    HideTextBox();
  };

  React.useEffect(() => {
    setText(initialDescriptionText);
    setPreviousText(initialDescriptionText);
  }, [initialDescriptionText]);

  return (
    <>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter the Description...."
        autoSize={{ minRows: 3, maxRows: 5 }}
        maxLength={maxCharacters}
        style={{ borderRadius: '10px', width: '99%' }}
        
      />
      <div className="counter-container">
        <span className="counter-text">{text.length}/{maxCharacters}</span>
      </div>
      <div className="button-container">
        <button className="icon-button" onClick={handleSave}>
          <img src={Check} alt="Check" className="icon" />
        </button>
        <button className="icon-button" onClick={handleCancel}>
          <img src={Cross} alt="Cross" className="icon" />
        </button>
      </div>
    </>
  );
};

export default TextBox;
