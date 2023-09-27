import {
  Container,
  TextField,
  Button,
  ThemeProvider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CacheProvider } from "@emotion/react";
import { cacheRtl, theme } from "../SignIn";
import { useState } from "react";
import heLocale from "date-fns/locale/he";
import { Dayjs } from "dayjs";

interface FormData {
  description: string;
  startDate: Date;
  endDate: Date;
}

const AddTask = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [valueStartDate, setValueStartDate] = useState<Date | null>();

  const [valueEndDate, setValueEndDate] = useState<Date | null>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // שליחת הנתונים לשרת
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              multiline
              rows={4}
              required
              autoComplete="off"
              variant="standard"
              id="outlined-read-only-input"
              label={"תיאור המשימה"}
              InputLabelProps={{
                htmlFor: "#000000",
              }}
              InputProps={{
                style: {
                  borderBottom: `1px solid #1259e6`,
                },
                disableUnderline: true,
              }}
              sx={{ borderBlockStyle: "#1259e6", width: "80%", pb: 2 }}
              {...register("description")}
            />

            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={heLocale}
            >
              <DatePicker
                required
                inputFormat="dd/MM/yyyy"
                label="תאריך אתחלה"
                value={valueStartDate}
                renderInput={(props) => <TextField {...props} />}
                {...register("startDate")}
                onChange={(data) => {
                  setValueStartDate(data);
                }}
              />

              <DatePicker
                required
                inputFormat="dd/MM/yyyy"
                label="תאריך סיום"
                value={valueEndDate}
                renderInput={(props) => <TextField {...props} />}
                {...register("endDate")}
                onChange={(data) => {
                  setValueEndDate(data);
                }}
              />
            </LocalizationProvider>

            <Button type="submit">יצירת משימה</Button>
          </form>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AddTask;
