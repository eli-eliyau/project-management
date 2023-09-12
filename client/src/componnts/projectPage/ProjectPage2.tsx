import React from "react";
import { sendReqPost } from "../../axios";
import {
  TextField,
  SxProps,
  Theme,
  ThemeProvider,
  createTheme,
  makeStyles,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { cacheRtl, theme } from "../SignIn";
import { Card, CardContent, Typography } from "@mui/material";

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

interface Props {
  id: string | undefined;
}

const ProjectPage2 = ({ id }: Props) => {
  const [projectData, setProjectData] = React.useState<Data | undefined>();

  React.useEffect(() => {
    //בקשה לקבל את הנתונים של המפרויקט
    sendReqPost({ projectId: id }, "/projectPage")
      .then((res) => {
        setProjectData(res);
        //   setRefreshingforProject(false);
      })
      .catch((err) => console.log(err));
    // res && console.log(res);
  }, []);

  const arr = [
    "",
    "שם",
    "תיאור הפרויקט",
    "סטטוס",
    "מצב",
    "משתמשים",
    "משתמש מוביל",
    "צוות הפרוייקט",
    "לקוח הפרוייקט",
  ];

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      width={"100%"}
      height={"100vh"}
      sx={{
        pt: 8,
      }}
    >
      <Grid
        item
        direction="column"
        sx={{
          boxShadow: 10,
          borderBottom: "3px solid #1C6EA4",
          borderRadius: "20px 20px 20px 20px",
          p: 2,
          width: "95%",
        }}
      >
        {projectData &&
          Object.entries(projectData).map(([key, value], index) => (
            <>
              {(value === projectData.name ||
                value === projectData.projectDescription) && (
                <Grid item>
                  <Typography variant="h6">{arr[index]}</Typography>
                  <Typography>{value}</Typography>
                  <Divider
                    orientation="horizontal"
                    flexItem
                    sx={{ bgcolor: "#ffffff" }}
                  />
                </Grid>
              )}
              {(value === projectData.projectClient ||
                value === projectData.projectTeam) && (
                <Grid
                  container
                  direction="row"
                //   justifyContent="space-between"
                //   alignItems="center"
                >
                    {/* <Grid item
          direction="row"
                  justifyContent="space-between"
                  alignItems="center"> */}
<div>
                    <Typography  variant="h6">{arr[index]}</Typography>
                    
                    {/* <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ bgcolor: "#ffffff" }}
                    /> */}
                    <Typography >{value}</Typography>
                    </div>
                  </Grid>
                //   </Grid>
              )}
              {/* <Grid item xs={6}>
                <Typography variant="h6">{arr[index]}</Typography>
                <Typography>{value}</Typography>
              </Grid> */}
            </>
          ))}
      </Grid>
    </Grid>
  );
};

export default ProjectPage2;
