import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Label from '../label/Label.index';
import "./FieldTextBox.css";
import TextBoxWithoutStrip from '../TextBox/TextBoxWithoutStrip';
type Props = {
  title?: string;
  className?: string;
  icon?: string;
  initialText: string;
  callFunction: (param: string) => void;
  maxCharacters: number;
};

function FieldTextBox({
  title,
  className,
  icon,
  callFunction,
  initialText,
  maxCharacters,
}: Props): JSX.Element {
  const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);

  const makeTextBoxVisible = () => {
    setIsTextBoxVisible(true);
  };

  const hideTextBox = () => {
    setIsTextBoxVisible(false);
  };

  const handleIconClick = () => {
    makeTextBoxVisible();
  };

  return (
    <div>
      {isTextBoxVisible ? (
        <div style={{marginBottom: "15px" ,marginLeft :"-2px"}}>
          <TextBoxWithoutStrip
            callFunction={callFunction}
            HideTextBox={hideTextBox}
            initialDescriptionText={initialText ?? ""}
            maxCharacters={maxCharacters}
          />
        </div>
      ) : (
        <div className="text-with-icon">
          <span className="text">
            <h5 className='text-description'>
              <span>{initialText.toString().trim() === "" ? "Add a Business Title" : initialText}</span>
              <span>
                <button className="icon-button" onClick={handleIconClick}>
                  <img src={icon} alt="Icon" className="icon" width={15} height={15} />
                </button>
              </span>
            </h5>
          </span>
        </div>
      )}
    </div>
  );
}

// PropTypes
FieldTextBox.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
};

export default FieldTextBox;
