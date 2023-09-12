import {
  Button,
  Card,
  Grid,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { cacheRtl, theme } from "../SignIn";
import "dayjs/locale/he";
import { useNavigate } from "react-router-dom";

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
  onRefreshing: (ref: boolean) => void;
}

const EditTaskPage = ({ taskData, onRefreshing }: IProps) => {
  const n = useNavigate();

  const [taskDescription, setTaskDescription] = useState<string>(
    taskData.taskDescription
  );
  const [taskStatus, setTaskStatus] = useState<string>(taskData.taskStatus);
  const [enter, setEnter] = useState<boolean>(true);

  //קשור לתאריך מאיזה פורמט יהיה
  const locales = "he";
  const [startDate, setStartDate] = useState<Dayjs | null>(taskData.startDate);

  const [endDate, setEndDate] = useState<Dayjs | null>(taskData.endDate);
  // dayjs().format('DD/MM/YYYY')

  const handleChange = (event: SelectChangeEvent) => {
    setTaskStatus(event.target.value as string);
  };

  const putEditTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //בקשה לעדכן את המשימה
    axios
      .put("http://localhost:3001/editTask", {
        _id: taskData._id,
        taskDescription: taskDescription,
        startDate: startDate,
        endDate: endDate,
        taskStatus: taskStatus,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
    setEnter(false);

    onRefreshing(true);
  };

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          {enter && (
            <>
              <form onSubmit={putEditTask}>
                <Card sx={{ p: 1, background: "#b0b0b0a1" }}>
                  <TextareaAutosize
                    required
                    value={taskDescription}
                    aria-label="maximum height"
                    placeholder={"תיאור משימה..."}
                    style={{
                      width: "100%",
                      height: 150,
                      background: "#ffffff",
                      borderRadius: "15px",
                      fontFamily: "Arial",
                    }}
                    onChange={(e) => {
                      setTaskDescription(e.target.value);
                    }}
                  />
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item sx={{ mt: 2 }}>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={locales}
                      >
                        <DatePicker
                          label={"תאריך התחלה"}
                          value={startDate}
                          onChange={(newValue) => {
                            setStartDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item sx={{ mt: 2 }}>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={locales}
                      >
                        <DatePicker
                          label={"תאירך סיום"}
                          value={endDate}
                          onChange={(newValue) => setEndDate(newValue)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item>
                      <Select
                        required
                        label={"סטטוס משימה"}
                        value={taskStatus}
                        style={{ width: 100 }}
                        size={"small"}
                        onChange={handleChange}
                      >
                        <ListItem value={"פעיל"}>{"פעיל"}</ListItem>
                        <MenuItem value={"לא פעיל"}>{"לא פעיל"}</MenuItem>
                      </Select>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        type="submit"
                        variant="outlined"
                        sx={{ width: "80%", boxShadow: 2, mt: 1 }}
                        fullWidth
                      >
                        {"שליחה"}
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </form>
            </>
          )}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};
export default EditTaskPage;
