import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import InpotForm from "./Input";

const CreateProject = () => {
  const nameLabel = {
    name: "שם",
    // status: "סטטוס",
    situation: "מצב",
    users: "משתמשים",
    topUser: "משתמש מוביל",
    projectDescription: "תיאור הפרויקט",
    projectClient: "לקוח הפרויקט",
    projectTeam: "צוות הפרויקט",

  };

  return (
    <Box width={"80%"} sx={{ pt: 8 }}>
      <Grid
        container
        sx={{
          boxShadow: 10,
          borderBottom: "3px solid #1C6EA4",
          borderRadius: "20px 20px 20px 20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            background: "#83C1ED",
            borderRadius: "20px 20px 20px 20px",
            color: "#ffff",
            m: 2,
          }}
          align="center"
          width={"100%"}
          height={"5%"}
        >
          יצירת פרויקט
        </Typography>
        <InpotForm item={nameLabel} />
      </Grid>
    </Box>
  );
};

export default CreateProject;
