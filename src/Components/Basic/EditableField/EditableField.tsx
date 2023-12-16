import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Label from '../label/Label.index';
import "./EditableField.css";
import TextBox from '../TextBox/TextBox';

type Props = {
  title?: string;
  className?: string;
  icon?: string;
  initialText: string;
  callFunction: (param: string) => void;
  maxCharacters : number
}

function EditableField({ title, className, icon, callFunction, initialText,maxCharacters }: Props): JSX.Element {
  const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);

  const makeTextBoxVisible = () => {
    setIsTextBoxVisible(true);
  }

  const hideTextBox = () => {
    setIsTextBoxVisible(false);
  }

  const handleIconClick = () => {
    makeTextBoxVisible();
  };

  return (
    <div>
      <div className="text-with-icon">
        <span className="text">
          <Label title={title} className={className} />
        </span>
        <button className="icon-button" onClick={handleIconClick}>
          <img src={icon} alt="Icon" className="icon" width={15} height={15} />
        </button>
      </div>
      <div className="description-container">
        {isTextBoxVisible ? (
          <div>
            <TextBox callFunction={callFunction} HideTextBox={hideTextBox} initialDescriptionText={initialText}
            maxCharacters={maxCharacters}
            />
          </div>
        ) : (
         <Label title={initialText} className="description-text" />
                                    
        )}
      </div>
    </div>
  );
}

// PropTypes
EditableField.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
};

export default EditableField;
