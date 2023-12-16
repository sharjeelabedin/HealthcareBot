import React, { useState, useEffect, useRef } from "react";
import { Popover, Spin, Tooltip } from "antd";
import style from "./index.module.css";

import { ReactComponent as StarIcon } from "../../../Assets/svgs/StarIcon.svg";
import { ReactComponent as WhiteStarIcon } from "../../../Assets/svgs/WhiteStarIcon.svg";

import {
  RightOutlined,
  LeftOutlined,
  CheckOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

type Props = {
  data: string[];
  onPressOkay: (index: number) => any;
  apiCall: any;
  open: boolean;
  onChange: any;
  loading: boolean;
};

export const SuggestionPopup = ({
  data,
  onPressOkay,
  apiCall,
  open,
  onChange,
  loading,
}: Props) => {
  const heading = "Astera’s Northstar";
  const overridePopupStlye = `
  .ant-popover-inner-content{
      padding: 0px !important;
  }`;

  const [itemIndex, setItemIndex] = useState(0);
  const contentRef = useRef<any>(null);

  const onClickRight = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (itemIndex === data.length - 1) return;
    else if (itemIndex < data.length) setItemIndex(itemIndex + 1);
  };

  const onClicLeft = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (itemIndex === 0) return;
    else if (itemIndex < data.length) setItemIndex(itemIndex - 1);
  };

  const onClickCheck = () => onPressOkay(itemIndex);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.classList.add(style["fade-in"]);
      const animationDuration = 500; // in milliseconds
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.classList.remove(style["fade-in"]);
        }
      }, animationDuration);
    }
  }, [itemIndex]);

  const Content = (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.headingContainer}>
          <WhiteStarIcon style={{ marginRight: 6 }} />
          {heading}
        </div>
        <div className={style.buttonContainer}>
          <button className={style.button} onClick={onClicLeft}>
            <LeftOutlined />
          </button>
          <button className={style.button} onClick={onClickRight}>
            <RightOutlined />
          </button>
          <button className={style.button} onClick={onClickCheck}>
            <CheckOutlined />
          </button>
        </div>
      </div>
      <div className={style.content}>
        {loading ? (
          <Spin indicator={<LoadingOutlined spin />} />
        ) : (
          <>
            <div ref={contentRef} className={style.subContent}>
              {data[itemIndex]}
            </div>
            <div className={style.contentfooter}>
              {data.length !== 0 && (
                <>
                  {itemIndex + 1}/{data.length}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="top"
        content={Content}
        trigger="click"
        overlayClassName={style.suggestionContainer}
        open={open}
        onOpenChange={onChange}
      >
        <Tooltip title="Ask AI">
          <StarIcon onClick={() => apiCall()} style={{ cursor: "pointer" }} />
        </Tooltip>
      </Popover>
      <style>{overridePopupStlye}</style>
    </>
  );
};
