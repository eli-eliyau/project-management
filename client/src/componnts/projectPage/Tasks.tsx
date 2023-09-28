import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import { sendReqDelete, sendReqPost } from "../../axios";
import dayjs, { Dayjs } from "dayjs";
import { useRecoilValue } from "recoil";
import { projectId } from "../../recilAtom/Atoms";
import { ThemeProvider } from "@mui/system";
import { CacheProvider } from "@emotion/react";
import { cacheRtl, theme } from "../SignIn";
import ModalEdit from "./ModalEdit";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export interface Task {
  _id: string;
  projectId: string;
  taskDescription: string;
  startDate: Dayjs;
  endDate: string;
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
      })
      .catch((err) => console.log(err));
  }, [taskList, id]);

  const taskFields = {
    tasks: "משימה",
    taskDescription: "תיאור המשימה",
    startDate: "תאריך התחלה",
    endDate: "תאריך סיום",
    taskStatus: "סטטוס משימה",
  };

  const deleteTask = (id: string) => {
    sendReqDelete({ id }, "/deleteTask")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
              sx={{
                background: "#83C1ED",
                borderRadius: "20px 20px 20px 20px",
              }}
            >
              <Button
                sx={{ color: "#ffffff" }}
                onClick={() => setIsActive("פעיל")}
              >
                {"פעיל"}
              </Button>
              <Button
                sx={{ color: "#ffffff" }}
                onClick={() => setIsActive("לא פעיל")}
              >
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
                          <ListItem
                            sx={{
                              direction: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="h5">{`${
                              Object.values(taskFields)[countTaskItem++]
                            } ${++countTask}`}</Typography>
                            <Button onClick={() => deleteTask(key._id)}>
                              <DeleteIcon htmlColor="#0661A2" />
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
                            key.startDate.toString(),
                            key._id
                          )}
                          {renderTaskField(
                            countTaskItem,
                            Object.values(taskFields)[countTaskItem++],
                            key.endDate,
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
