import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { sendReqGet } from "../../axios";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";

interface Users {
  _id: string;
  name: string;
}

interface FormValues {
  projectTeam: string[];
}

interface Props {
 onDtat:Function
 name:string
}

const SelectInput = ({onDtat,name }:Props) => {
  const [users, setUsers] = useState<Users[]>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    sendReqGet({}, "/getAllUsers").then((res) => {
      setUsers(res);
    });
  }, []);

  const handleChange = (event:any) => {
    const ids = event.target.value;
    setSelectedIds(ids);
  };

  onDtat(`${name}`,selectedIds)

  return (
    <Box sx={{ width: "80%" }}>
      <InputLabel id="users-select-label" required sx={{ textAlign: "left" }}>
        צוות הפרויקט
      </InputLabel>
      <Select 
      fullWidth
      multiple 
      variant="standard"
      value={selectedIds}
      onChange={handleChange}
    >
      {users?.map(option => (
        <MenuItem key={option._id} value={option._id}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
    </Box>
  );
};

export default SelectInput;
