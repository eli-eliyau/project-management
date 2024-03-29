import React from "react";
import { Grid } from "@mui/material";
import Api from "../../api/Api";
import ProjectDetails from "./ProjectDetails";



const ProjectPage = () => {
  return (
    <>
      <Grid
        container
        width={"100%"}
        height={"100vh"}
        sx={{
          p: 8,
        }}
      >
        <ProjectDetails  />
      </Grid>
    </>
  );
};

export default ProjectPage;
