import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { sendReqPost } from "../../axios";
import dayjs, { Dayjs } from "dayjs";
import { useRecoilValue } from "recoil";
import { projectId } from "../../recilAtom/Atoms";
import { ThemeProvider } from "@mui/system";
import { CacheProvider } from "@emotion/react";
import { cacheRtl, theme } from "../SignIn";
interface Task {
  _id: string;
  projectId: string;
  taskDescription: string;
  startDate: Dayjs;
  endDate: Dayjs;
  taskTag: string;
  taskStatus: string;
}

const Tasks = () => {
  const [tasks, setTasks] = React.useState<Task[]>();
  const id = useRecoilValue(projectId);
  let count = 0;

  React.useEffect(() => {
    //בקשה לקבל את הנתונים של המפרויקט

    sendReqPost({ projectId: id }, "/taskFoProject")
      .then((res) => {
        setTasks(res);
        tasks?.sort((a, b) => {
          const dateA = new Date(dayjs(a.endDate).toDate());
          const dateB = new Date(dayjs(b.endDate).toDate());

          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }

          return 0;
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const listTask = (primary: string, item: string) => (
    <ListItem>
      <Typography>{`${primary} - ${item}`}</Typography>
    </ListItem>
  );

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 8, width: "100%" }}
        >
          <Grid
            container
            direction="column"
            sx={{
              boxShadow: 10,
              borderBottom: "3px solid #1C6EA4",
              borderRadius: "20px 20px 20px 20px",
              p: 2,
              mb: 2,
              width: "80%",
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Button>{"פעיל"}</Button>
              <Button>{"לא פעיל"}</Button>
            </Grid>
            <Grid item>
              <List>
                {tasks?.map((key, index) => (
                  <>
                    {key.taskStatus === "פעיל" && (
                      <div key={index}>
                        <ListItem>
                          <Typography variant="h5">{`משימה ${++count}`}</Typography>
                        </ListItem>
                        {listTask("תיאור המשימה", key.taskDescription)}
                        {listTask(
                          "תאריך התחלה",
                          dayjs(key.startDate).format("DD/MM/YYYY")
                        )}
                        {listTask(
                          "תאריך סיום",
                          dayjs(key.endDate).format("DD/MM/YYYY")
                        )}
                        {listTask("סטטוס משימה", key.taskStatus)}
                        <Divider />
                      </div>
                    )}
                  </>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Tasks;
