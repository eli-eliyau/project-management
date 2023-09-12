import { Button, Card, Grid, TextField } from "@mui/material";
import { useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { cacheRtl, theme } from "../SignIn";
import "dayjs/locale/he";
interface IProps {
  projectId: string | undefined;
  onEnterNewTask: (enter: boolean) => void;
  onRefreshing: (ref: boolean) => void;
}

const NewTask = ({ projectId, onEnterNewTask, onRefreshing }: IProps) => {
  const [taskDescription, setTaskDescription] = useState<string>();

  //קשור לתאריך מאיזה פורמט יהיה

  const [locale, setLocale] = useState<typeof locales[number]>("he");
  const locales = ["he"];
  const [startDate1, setStartDate1] = useState<Dayjs | null | string>(dayjs());
  const [startDate, setStartDate] = useState<Dayjs | null | string>(
    dayjs().format("DD/MM/YYYY")
  );

  const [endDate, setEndDate] = useState<Dayjs | null | string>(
    dayjs().format("DD/MM/YYYY")
  );
  const [endDate1, setEndDate1] = useState<Dayjs | null | string>(dayjs());

  const postNewTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/createNewTask", {
        projectId: projectId,
        taskDescription: taskDescription,
        startDate: startDate,
        endDate: endDate,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
    onRefreshing(true);
    onEnterNewTask(false);
  };
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Card
          classes
          sx={{
            mt: 5,
            p: 2,
            background: "#b0b0b0a1",
            width: {
              xs: "80%", //0
              sm: "80%", //600
              md: "80%", //900
              lg: "80%", //1200
              xl: "80%", //1536
            },
          }}
        >
          <form onSubmit={postNewTask}>
            <TextareaAutosize
              required
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
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item sx={{ mt: 2 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={locale}
                >
                  <DatePicker
                    label="תאריך התחלה"
                    value={startDate1}
                    onChange={(newValue) => {
                      setStartDate1(newValue);
                      setStartDate(dayjs(newValue).format("DD/MM/YYYY"));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item sx={{ mt: 2 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={locale}
                >
                  <DatePicker
                    label="תאריך סיום"
                    value={endDate1}
                    onChange={(newValue) => {
                      setEndDate1(newValue);
                      setEndDate(dayjs(newValue).format("DD/MM/YYYY"));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Button
                type="submit"
                variant="outlined"
                sx={{ width: "80%", boxShadow: 2, mt: 3 }}
              >
                {"שליחה"}
              </Button>
            </Grid>
          </form>
        </Card>
      </ThemeProvider>
    </CacheProvider>
  );
};
export default NewTask;
