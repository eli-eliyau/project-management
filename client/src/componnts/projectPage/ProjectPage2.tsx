import React from "react";
import { sendReqPost } from "../../axios";
import {
  Grid,
  Divider,
  Button,
  Drawer,
  Modal,
  TextField,
  Paper,
} from "@mui/material";
import { Typography } from "@mui/material";
import Api from "../Api";
import { Dayjs } from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/system";
import { CacheProvider } from "@emotion/react";
import { cacheRtl, theme } from "../SignIn";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

interface Data {
  _id: string;
  name: string;
  status: string;
  situation: string;
  users: string;
  topUser: string;
  projectDescription: string;
  projectTeam: string;
  projectClient: string;
}

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
  const [projectData, setProjectData] = React.useState<Data | undefined>();
  const [task, setTask] = React.useState<Task[]>();
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    //בקשה לקבל את הנתונים של המפרויקט
    sendReqPost({ projectId: id }, "/projectPage")
      .then((res) => {
        setProjectData(res);
        //   setRefreshingforProject(false);
      })
      .catch((err) => console.log(err));

    sendReqPost({ projectId: id }, "/taskFoProject")
      .then((res) => {
        setTask(res);
        //   setRefreshingforProject(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = [
    "id",
    "שם",
    "סטטוס",
    "מצב",
    "משתמשים",
    "משתמש מוביל",
    "תיאור הפרויקט",
    "צוות הפרוייקט",
    "לקוח הפרוייקט",
  ];

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
        <Grid
          container
          // direction="column"
          // justifyContent="flex-start"
          // alignItems="flex-start"
          sx={{
            boxShadow: 10,
            borderBottom: "3px solid #1C6EA4",
            borderRadius: "20px 20px 20px 20px",
            p: 2,
          }}
        >
          {projectData &&
            Object.entries(projectData).map(([key, value], index) => (
              <>
                {value !== projectData._id && (
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width={"100%"}
                    key={index}
                  >
                    <Grid
                      item
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      width={"90%"}
                      key={index}
                    >
                      <Divider
                        orientation="horizontal"
                        flexItem
                        sx={{ bgcolor: "#83C1ED" }}
                      />
                      <Typography variant="h6">{arr[index]}</Typography>
                      <Typography
                        sx={{
                          wordWrap: "break-word",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {value}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Button onClick={() => setOpen(true)}>
                        <EditIcon htmlColor="#0661A2" />
                      </Button>
                    </Grid>

                    {/* <Api task={task} /> */}
                  </Grid>
                )}
              </>
            ))}
        </Grid>
      </Grid>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          {open && (
            <Modal open={open}>
              <Grid container justifyContent="center" sx={{ mt: 20 }}>
                <Paper
                  sx={{
                    maxWidth: 325,
                    p: 2,
                    boxShadow: 10,
                    borderBottom: "3px solid #acacac",
                    borderRadius: "20px 20px 20px 20px",
                  }}
                >
                  <TextField
                    variant="standard"
                    value={"123"}
                    label={"שם"}
                    type="text"
                  />
                  <Button onClick={() => setOpen(false)}>
                    <CloudUploadIcon htmlColor="#37fd0089" fontSize="large" />
                  </Button>
                  <Button onClick={() => setOpen(false)}>
                    <CloseIcon htmlColor="#ff0000"fontSize="medium" />
                  </Button>
                </Paper>
              </Grid>
            </Modal>
          )}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default ProjectPage2;
