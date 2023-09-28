import React from "react";
import { sendReqPost } from "../../axios";
import {
  Grid, Typography,
} from "@mui/material";
import Api from "../Api";
import ProjectDetails from "./ProjectDetails";


interface Props {
  id: string | undefined;
}

const ProjectPage2 = ({ id }: Props) => {



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
       
        <ProjectDetails projectId={id} />
      </Grid>
    </>
  );
};

export default ProjectPage2;
