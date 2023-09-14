import { Box, Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import InpotForm from "./Inpot";


const CreateProject = () => {
 

  const nameLabel = [
    "שם",
    "סטטוס",
    "מצב",
    "משתמשים",
    "משתמש מוביל",
    "תיאור הפרויקט",
    "צוות הפרויקט",
    "לקוח הפרויקט",
  ];

  const nameLabel2 = [
    "name",
    "status",
    "situation",
    "users",
    "topUser",
    "projectDescription",
    "projectTeam",
    "projectClient",
  ];

  return (
    <Box sx={{ p: 7 }}>
      <Grid
        container
        component={"form"}
        sx={{
          boxShadow: 10,
          borderBottom: "3px solid #1C6EA4",
          borderRadius: "20px 20px 20px 20px",
          p: 2,
        }}
      >
      <InpotForm item={nameLabel2} item2={nameLabel} />
      </Grid>
    </Box>
  );
};

export default CreateProject;
