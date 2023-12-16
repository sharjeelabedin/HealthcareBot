import React, { useState, useRef, useEffect } from "react";
import style from "./dropdown.module.css";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Checkbox } from "antd";


type Props = {
  menuItems: any,
  placeholder?: string | undefined,
  onCheckChange?: (e: any) => any,
  checkedValue?: boolean,
  isPartialCheck?: boolean
}
export const DropDownButton = ({menuItems, placeholder, onCheckChange, checkedValue, isPartialCheck} : Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={dropdownRef}  >
    <Dropdown placement="bottomLeft" menu={menuItems} getPopupContainer={() => dropdownRef.current as HTMLElement}>
      <div className={style["checkbox-wrapper"]}>
        <Checkbox onChange={onCheckChange} checked={checkedValue} indeterminate={isPartialCheck} />
        <span className={style["checkbox-content"]}>
          <span className={style["count-text"]}>{placeholder}</span>
          <CaretDownOutlined style={{marginLeft: 5}}/>
        </span>
      </div>
    </Dropdown>
    </div>
  );
};