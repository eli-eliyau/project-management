import React from "react";
import { sendReqPost } from "../../axios";
import {
  Grid,
} from "@mui/material";
import Api from "../Api";
import { Dayjs } from "dayjs";
import ProjectDetails from "./ProjectDetails";

interface Task {
  _id: string;
  projectId: string;
  taskDescription: string;
  startDate: Dayjs;
  endDate: Dayjs;
  taskTag: string;
  taskStatus: string;
}
interface Props {
  id: string | undefined;
}

const ProjectPage2 = ({ id }: Props) => {
  const [task, setTask] = React.useState<Task[]>();

  React.useEffect(() => {
    //בקשה לקבל את הנתונים של המפרויקט

    sendReqPost({ projectId: id }, "/taskFoProject")
      .then((res) => {
        setTask(res);
        //   setRefreshingforProject(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
