import React from "react";

// components
import List from "@mui/material/List";
import MenuItem from "./MenuItem";

const Menu = ({ items }) => {
  return (
    <List>
      {items.map((item, index) => {
        return <MenuItem key={index} data={item} />;
      })}
    </List>
  );
};

export default Menu;
