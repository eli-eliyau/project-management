import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { CacheProvider } from "@emotion/react";
import { useForm } from "react-hook-form";
import { cacheRtl } from "./LogIn";

const theme = createTheme();

interface IProps {
  onUserToken: (token: string | undefined) => void;
}
interface FormInputs {
  name: string;
  password: string;
  errorServer: string;
}

export default function SignUp({ onUserToken }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      password: "",
    },
  });
  const onSubmit = (data: FormInputs) => {
    axios
      .post("http://localhost:3001/signUpPage", {
        name: data.name,
        pass: data.password,
      })
      .then((res) => {
        console.log(res.data);
        res.data.name === data.name
          ? axios
              .post("http://localhost:3001/signInPage", {
                name: data.name,

                pass: data.password,
              })
              .then((res) => {
                console.log(res.data.token);
                axios
                  .get("http://localhost:3001/authenticationToken", {
                    headers: {
                      "x-api-key": res.data.token,
                    },
                  })
                  .then((res) => {
                    onUserToken(res.data.token);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              })
          : setError("errorServer", {
              type: "custom",
              message: `${res.data}`,
            });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {"הרשמה למערכת"}
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      required
                      fullWidth
                      id="firstName"
                      label="שם מלא"
                      autoFocus
                      {...register("name", {
                        required: "שדה חובה",
                        maxLength: {
                          value: 10,
                          message: "שם המלא עד 10 תויים",
                        },
                      })}
                    />
                    <Typography color={"red"}>
                      {errors.name && errors.name.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="סיסמה"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: "שדה חובה",
                        maxLength: { value: 5, message: "הכנס עד 5 תווים" },
                        minLength: { value: 3, message: "הכנס 3-5 תווים " },
                      })}
                      onChange={() => {
                        clearErrors("errorServer");
                      }}
                    />
                    <Typography color={"red"}>
                      {errors.password && errors.password.message}
                    </Typography>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {"כניסה"}
                </Button>
                <Typography color={"red"}>
                  {errors.errorServer?.message}
                </Typography>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
