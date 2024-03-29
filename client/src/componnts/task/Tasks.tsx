import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import { sendReqDelete, sendReqPost } from "../../axios";
import { Dayjs } from "dayjs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { atomTaskId, projectId } from "../../recoilAtom/Atoms";
import { ThemeProvider } from "@mui/system";
import { CacheProvider } from "@emotion/react";
import ModalEdit from "../projectPage/modal/ModalEdit";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UpdateProjectData } from "../projectPage/Interface";
import { cacheRtl, theme } from "../logn/LogIn";

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
  const [taskList, setTasksList] = React.useState<Task[]>();
  const [isActive, setIsActive] = React.useState("פעיל");
  const [openModal, setOpenModal] = React.useState(false);
  const [taskToUpdate, setTaskToUpdate] = React.useState<UpdateProjectData>();
  const [index, setIndex] = React.useState(0);

  const setId = useSetRecoilState(atomTaskId);
  const id = useRecoilValue(projectId);
  let countTask = 0;
  let countTaskItem = 0;

  React.useEffect(() => {
    sendReqPost({ projectId: id }, "/taskFoProject")
      .then((res) => {
        setTasksList(res);
      })
      .catch((err) => console.log(err));
  }, [openModal, id]);

  const deleteTask = (id: string) => {
    sendReqDelete({ id }, "/deleteTask")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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
  ) => {
    setId(taskId);

    return (
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
            setTaskToUpdate([
              {
                [Object.keys(taskFields)[index]]: value,
                id: taskId,
              },
            ]);
            setIndex(index);
            setOpenModal(true);
          }}
        >
          <EditIcon htmlColor="#0661A2" />
        </Button>
      </ListItem>
    );
  };

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
              <Typography
                variant="h6"
                sx={{
                  background: "#83C1ED",
                  borderRadius: "20px 20px 20px 20px",
                  color: "#ffff",
                }}
                align="center"
                width={"100%"}
                height={"5%"}
              >
                משימות
              </Typography>

              <Button
                sx={{ color: "#ffffff" }}
                onClick={() => setIsActive("פעיל")}
              >
                {"פעילות"}
              </Button>
              {"/"}
              <Button
                sx={{ color: "#ffffff" }}
                onClick={() => setIsActive("לא פעיל")}
              >
                {"לא פעילות"}
              </Button>
            </Grid>

            <Grid item>
              {taskList ? (
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
              ) : (
                <CircularProgress
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "60%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
              {openModal && (
                <Modal open={openModal} sx={{ background: "#5be6f841" }}>
                  <>
                    <ModalEdit
                      onClose={setOpenModal}
                      data={taskToUpdate}
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
