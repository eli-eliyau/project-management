import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
  control: Control<FormValues>;
}

const SelectInput = ({ control }:Props) => {
  const [users, setUsers] = useState<Users[]>();

  useEffect(() => {
    sendReqGet({}, "/getAllUsers").then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <FormControl sx={{ width: "85%" }}>
      <InputLabel id="users-select-label" required sx={{ textAlign: "right" }}>
        צוות הפרויקט
      </InputLabel>
      <Controller
        name="projectTeam"
        control={control}
        defaultValue={[]}
        render={({ field }: { field: ControllerRenderProps<FormValues, 'projectTeam'> }) => (
          <Select
            labelId="users-select-label"
            id="projectTeam"
            multiple
            variant="standard"
            {...field}
            renderValue={(selected: string[]) =>
              selected
                .map((userId) => {
                  const user = users?.find((user) => user._id === userId);
                  return user ? user.name : "User not found";
                })
                .join(", ")
            }
          >
            {users?.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SelectInput;
