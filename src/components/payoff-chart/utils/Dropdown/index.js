import React from "react";
import "./Dropdown.scss";

const Dropdown = ({
  placeHolder,
  type,
  data,
  handleChange
}) => {

  const dropdownOption = data.map((item) => (
    <option key={item.id} value={item.id}>{item.name}</option>
  ));


  const selectCallback = (event) => {
    const selectedOption = event.target.value;
    handleChange(selectedOption, type);
  };

  return (
    <div className="gap-2 justify-content">
      <select
        className="px-4 gap-3"
        onChange={selectCallback}
      >
        <option value="0">
          {placeHolder}
        </option>
        {dropdownOption}
      </select>
    </div>
  );
}

export default Dropdown;