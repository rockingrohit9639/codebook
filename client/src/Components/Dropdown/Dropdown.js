import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Dropdown({ list, value, onChange, label, valueKey }) {
  return (
    <Select value={value} label={label} onChange={onChange}>
      {list.map((item, index) => (
        <MenuItem key={index} value={item[valueKey]}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default Dropdown;
