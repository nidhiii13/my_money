import React from "react";
import { useNavigate } from "react-router-dom";

// components
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from '@mui/material/ListItemText';

const MenuItem = ({ data }) => {
  // object
  const navigate = useNavigate();

  return (
    <ListItemButton onClick={() => navigate(data.path)}>
      <ListItemText primary={data.name} />
    </ListItemButton>
  );
};

export default MenuItem;
