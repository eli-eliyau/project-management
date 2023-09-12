import * as React from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EditTaskPage from "./editTaskPage";
import { Dayjs } from "dayjs";

interface ITask {
  _id: string;
  projectId: string;
  taskDescription: string;
  startDate: Dayjs;
  endDate: Dayjs;
  taskTag: string;
  taskStatus: string;
}
interface IProps {
  taskData: ITask;
  onTaskStatus: (enter: string) => void;
  onRefreshingToTask: (ref: boolean) => void;
}

const Task = ({ taskData, onTaskStatus, onRefreshingToTask }: IProps) => {
  const [enterToEditTask, setEnterToEditTask] = React.useState<boolean>();
  const [refreshingToTask, setRefreshingToTask] =
    React.useState<boolean>(false);

  return (
    <>
      <Card
        classes
        sx={{
          mt: 5,
          background: "#b0b0b0a1",
          width: {
            xs: "100%", //0
            sm: "100%", //600
            md: "60%", //900
            lg: "60%", //1200
            xl: "60%", //1536
          },
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            {`תיאור המשימה:${taskData.taskDescription}`}
            <br />
            {`תאריך התחלה:${taskData.startDate} `}
            {`תאריך סיום:${taskData.endDate}`}
            <br />
            {`סטטוס משימה:${taskData.taskStatus} `}
            <br />
          </Typography>
          <Button
            size="small"
            onClick={() => {
              setEnterToEditTask(true);
            }}
          >
            {"עריכת משימה"}
          </Button>
        </CardContent>
        {enterToEditTask && (
          <>
            <EditTaskPage
              taskData={taskData}
              onRefreshing={setRefreshingToTask}
            />
            {onRefreshingToTask(refreshingToTask)}
          </>
        )}
      </Card>
    </>
  );
};
export default Task;
