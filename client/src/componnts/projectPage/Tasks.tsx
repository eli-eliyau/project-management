import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import { sendReqPost } from "../../axios";
import dayjs, { Dayjs } from "dayjs";
import { useRecoilValue } from 'recoil';
import { projectId } from "../../recilAtom/Atoms";
import { ThemeProvider } from "@mui/system";
import { CacheProvider } from "@emotion/react";
import { cacheRtl, theme } from "../SignIn";
import ModalEdit from "./ModalEdit";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

export interface Task {
  _id: string;
  projectId: string;
  taskDescription: string;
  startDate: Dayjs;
  endDate: Dayjs;
  taskTag: string;
  taskStatus: string;
}

const Tasks = () => {
  const [taskList, setTasks] = React.useState<Task[]>();
  const [isActive, setIsActive] = React.useState("פעיל");
  const [openModal, setOpen] = React.useState(false);
  const [taskToUpdate, setTaskToUpdate] = React.useState<{
    [index: string]: string;
  }>();
  const [index, setIndex] = React.useState(0);

  const id = useRecoilValue(projectId);
  let countTask = 0;
  let countTaskItem = 0;

  React.useEffect(() => {
    //בקשה לקבל את הנתונים של המפרויקט

    sendReqPost({ projectId: id }, "/taskFoProject")
      .then((res) => {
        setTasks(res);
        taskList?.sort((a, b) => {
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
  }, [openModal,taskList,id]);

  const taskFields = {
    tasks: "משימה",
    taskDescription: "תיאור המשימה",
    startDate: "תאריך התחלה",
    endDate: "תאריך סיום",
    taskStatus: "סטטוס משימה",
  };

  const renderTaskField = (
    index: number,
    primary: string,
    value: string,
    taskId: string
  ) => (
    <ListItem
      sx={{
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>{`${primary} - ${value}`}</Typography>
      <Button
        onClick={() => {
          setTaskToUpdate({
            [Object.keys(taskFields)[index]]: value,
            id: taskId,
          });
          setIndex(index);
          setOpen(true);
        }}
      >
        <EditIcon htmlColor="#0661A2" />
      </Button>
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
              {/* <Button variant={"filled"}/> */}
              <Button  onClick={() => setIsActive("פעיל")}>{"פעיל"}</Button>
              <Button onClick={() => setIsActive("לא פעיל")}>
                {"לא פעיל"}
              </Button>
            </Grid>
            <Grid item>
              <List>
                {taskList?.map((key, index) => {
                  countTaskItem = 0;
                  return (
                    <>
                      {key.taskStatus === isActive && (
                        <div key={index}>
                          <ListItem  sx={{
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
                            <Typography variant="h5">{`${
                              Object.values(taskFields)[countTaskItem++]
                            } ${++countTask}`}</Typography>
                            <Button>
<DeleteIcon htmlColor="#0661A2"/>
                            </Button>
                          </ListItem>
                          {renderTaskField(
                            countTaskItem,
                            Object.values(taskFields)[countTaskItem++],
                            key.taskDescription,
                            key._id
                          )}
                          {renderTaskField(
                            countTaskItem,
                            Object.values(taskFields)[countTaskItem++],
                            dayjs(key.startDate).format("DD/MM/YYYY"),
                            key._id
                          )}
                          {renderTaskField(
                            countTaskItem,
                            Object.values(taskFields)[countTaskItem++],
                            dayjs(key.endDate).format("DD/MM/YYYY"),
                            key._id
                          )}
                          {renderTaskField(
                            countTaskItem,
                            Object.values(taskFields)[countTaskItem++],
                            key.taskStatus,
                            key._id
                          )}

                          <Divider />
                        </div>
                      )}
                    </>
                  );
                })}
              </List>
              {openModal && taskToUpdate && (
                <Modal open={openModal} sx={{ background: "#5be6f841" }}>
                  <>
                    <ModalEdit
                      onClose={setOpen}
                      items={taskToUpdate}
                      nameInput={Object.values(taskFields)[index]}
                      typeModal="editTask"
                    />
                  </>
                </Modal>
              )}
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Tasks;
