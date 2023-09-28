import {
  Container,
  TextField,
  Button,
  ThemeProvider,
  Grid,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CacheProvider } from "@emotion/react";
import { cacheRtl, theme } from "../SignIn";
import { useState } from "react";
import heLocale from "date-fns/locale/he";

interface FormData {
  description: string;
  startDate: Date;
  endDate: Date;
}

const AddTask = () => {
  const { register, setValue, handleSubmit } = useForm<FormData>({
    defaultValues: {
      description: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const [valueStartDate, setValueStartDate] = useState<Date | null>(null);

  const [valueEndDate, setValueEndDate] = useState<Date | null>(null);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              boxShadow: 10,
              borderBottom: "3px solid #1C6EA4",
              borderRadius: "20px 20px 20px 20px",
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                background: "#83C1ED",
                borderRadius: "20px 20px 20px 20px",
                color: "#ffff",
              }}
              color={"GrayText"}
              align="center"
              width={"100%"}
            >
              יצירת משימה
            </Typography>
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

            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={heLocale}
              >
                <DatePicker
                  required
                  inputFormat="dd/MM/yyyy"
                  label="תאריך אתחלה"
                  value={valueStartDate}
                  renderInput={(props) => (
                    <TextField variant="standard" {...props} />
                  )}
                  InputProps={{
                    style: {
                      borderBottom: `1px solid #1259e6`,
                    },
                    disableUnderline: true,
                  }}
                  {...register("startDate")}
                  onChange={(date) => {
                    date && setValue("startDate", date);
                    setValueStartDate(date);
                  }}
                />

                <DatePicker
                  required
                  inputFormat="dd/MM/yyyy"
                  label="תאריך סיום"
                  value={valueEndDate} 
                  {...register("endDate")}
                  onChange={(date) => {
                    date && setValue("endDate", date);
                    setValueEndDate(date);
                  }}
                  renderInput={(props) => (
                    <TextField variant="standard" {...props} />
                  )}
                  InputProps={{
                    style: {
                      borderBottom: `1px solid #1259e6`,
                    },
                    disableUnderline: true,
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Button type="submit" sx={{ mt: 1 }}>
              יצירת משימה
            </Button>
          </Grid>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AddTask;
