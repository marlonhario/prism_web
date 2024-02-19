import React from "react";
import "./Dropdown.scss";
import { isEmpty } from 'lodash';
import cn from "classnames";

const Dropdown = ({ 
  placeHolder, 
  type, 
  data, 
  handleChange,
  className,
  isDisabled,
  selectedItem
}) => {

  const dropdownOption = data.map((item) => (
    <option
      className={cn({ [item.classname] : !isEmpty(item.colorCode)})}
      style={ { background: !isEmpty(item.colorCode) ? item.colorCode : '' }}
      value={item.id} 
      selected={selectedItem === item.id} 
    > 
      {item.name}  
    </option>
  ));

  const selectCallback = (event) => {
    const selectedOption = event.target.value;
    handleChange(selectedOption);
  };

  return (
      <div className={cn("justify-content",className)}>
        <select
          className="px-4"
          onChange={selectCallback}
          disabled={isDisabled}
        >
          <option value={placeHolder} selected>
            {placeHolder}
          </option>
          {dropdownOption}
        </select>
      </div>
  );
}

export default Dropdown;