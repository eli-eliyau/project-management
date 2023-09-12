import * as React from "react";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import Task from "./TaskFoProject";
import NewTask from "../createNewTask/newTask";
import EditProjectPage from "./EditProjectPage";
import Api from "../Api";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Dayjs } from "dayjs";
import { sendReqPost } from "../../axios";
interface Props {
  id: string | undefined;
}
interface IData {
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
interface ITask {
  _id: string;
  projectId: string;
  taskDescription: string;
  startDate: Dayjs;
  endDate: Dayjs;
  taskTag: string;
  taskStatus: string;
}

const ProjectPage = ({ id }: Props) => {
  const [dataProject, setDataProject] = React.useState<IData | undefined>();
  const [task, setTask] = React.useState<ITask[]>();
  const [taskStatus, setTaskStatus] = React.useState<string>();
  const [enterEditProject, setEnterEditProject] =
    React.useState<boolean>(false);
  const [enterNewTask, setEnterNewTask] = React.useState<boolean>(false);
  const [refreshingforTask, setRefreshingforTask] =
    React.useState<boolean>(false);
  const [refreshingforProject, setRefreshingforProject] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    //בקשה לקבל את הנתונים של המפרויקט
 sendReqPost({projectId: id },'/projectPage')
 .then((res) => {
  setDataProject(res);
  console.log(res);
  setRefreshingforProject(false);
})
.catch((err) => console.log(err));
// res && console.log(res);
   
  }, [refreshingforProject]);

  React.useEffect(() => {
    //בקשה לקבלת כל המשימות
    axios
      .post("http://localhost:3001/taskFoProject", { projectId: id })
      .then((res) => {
        setTask(res.data);

        setRefreshingforTask(false);
      })
      .catch((err) => console.log(err));
  }, [refreshingforTask]);
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(
    name: string | undefined,
    description: string | undefined
  ) {
    return { name, description };
  }

  const rows = [
    createData(
      "תיאור הפרויקט",
      dataProject && `${dataProject.projectDescription}`
    ),
    createData("סטטוס", dataProject && `${dataProject.status}`),
    createData("מצב", dataProject && `${dataProject.situation}`),
    createData("משתמשים", dataProject && `${dataProject.users}`),
    createData("משתמש מוביל", dataProject && `${dataProject.topUser}`),
    createData("צוות הפרוייקט", dataProject && `${dataProject.projectTeam}`),
    createData("לקוח הפרוייקט", dataProject && `${dataProject.projectClient}`),
  ];

  return (
    <>
      {dataProject && (
        <>
          <Typography
            sx={{ fontSize: 26, mt: 8 }}
            align="center"
            paragraph={true}
            color={"#0066ff"}
          >
            {`פרויקט ${dataProject.name}`}
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <TableContainer component={Paper}>
              <Table
                sx={{
                  width: {
                    xs: "100%", //0
                    sm: "100%", //600
                    md: "100%", //900
                    lg: "100%", //1200
                    xl: "100%", //1536
                  },
                }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">{"שם"}</StyledTableCell>
                    <StyledTableCell align="right">{"תוכן"}</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="right"
                        sx={{
                          width: {
                            xs: "1%", //0
                            sm: "50%", //600
                            md: "50%", //900
                            lg: "50%", //1200
                            xl: "50%", //1536
                          },
                        }}
                      >
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.description}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Api task={task} />
            <Grid
              container
              spacing={0.5}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ width: 150, boxShadow: 2 }}
                  onClick={() => {
                    setTaskStatus("פעיל");
                    setEnterEditProject(false);
                    setEnterNewTask(false);
                  }}
                >
                  {"משימות פעילות"}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="error"
                  variant="outlined"
                  sx={{ width: 150, boxShadow: 2 }}
                  onClick={() => {
                    setTaskStatus("לא פעיל");
                    setEnterEditProject(false);
                    setEnterNewTask(false);
                  }}
                >
                  {"משימות לא פעילות"}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{ width: 150, boxShadow: 2 }}
                  onClick={() => {
                    setEnterNewTask(true);
                    setEnterEditProject(false);
                    setTaskStatus("");
                  }}
                >
                  {"משימה חדשה"}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{ width: 150, boxShadow: 2 }}
                  onClick={() => {
                    setEnterEditProject(true);
                    setEnterNewTask(false);
                    setTaskStatus("");
                  }}
                >
                  {"עריכת פרויקט"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        {task?.map((item, key) => {
          return (
            item.taskStatus === taskStatus && (
              <Task
                taskData={item}
                key={key}
                onTaskStatus={setTaskStatus}
                onRefreshingToTask={setRefreshingforTask}
              />
            )
          );
        })}
        {enterNewTask && (
          <NewTask
            projectId={id}
            onEnterNewTask={setEnterNewTask}
            onRefreshing={setRefreshingforTask}
          />
        )}
        {enterEditProject && (
          <>
            <EditProjectPage
              projectId={id}
              dataProject={dataProject}
              onEnterEditProject={setEnterEditProject}
              onRefreshingforProject={setRefreshingforProject}
            />
          </>
        )}
      </Grid>
    </>
  );
};
export default ProjectPage;
