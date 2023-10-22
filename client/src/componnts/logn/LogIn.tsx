import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { API_CLIET } from "../../App";
import { sendReqGet, sendReqPost } from "../../axios";
import { CacheProvider } from "@emotion/react";
import { cacheRtl } from "./SignIn";
import { FormControl } from "@mui/material";

interface IProps {
  toUrlServer: string;
}

const theme = createTheme();

const LogIn = ({ toUrlServer }: IProps) => {
  const [messeage, setMessage] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dataUserToForm = {
      name: data.get("fullName"),
      email: data.get("email"),
      pass: data.get("password"),
    };

    if (toUrlServer === "signIn" || toUrlServer === "signUp") {
      sendReqPost(dataUserToForm, `/${toUrlServer}`)
        .then((res) => {
          const data = res;
          console.log(res);

          res === "משתמש קיים במערכת"
            ? setMessage("משתמש קיים במערכת")
            : res === "משתמש לא קיים"
            ? setMessage("משתמש לא קיים")
            : sendReqGet(
                {
                  "x-api-key": res.token,
                },
                "/authToken"
              ).then((res) => {
                console.log(document.cookie);
                if (res === true) {
                  localStorage.setItem("user", "1");
                  localStorage.setItem("idMyUser", data.user._id);
                  localStorage.setItem("userName", data.user.name);
                  localStorage.setItem("role", data.user.role);
                  localStorage.setItem("token", data.token);
                  // navigate(0);
                } else {
                  setMessage("תוקן לא חוקי");
                }
              });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <CacheProvider value={cacheRtl}>
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
                {toUrlServer === "signIn" ? "Sign in" : "Sign up"}
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                {toUrlServer === "signUp" && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fullName"
                    label="שם מלא"
                    name="fullName"
                    autoComplete="fullName"
                    autoFocus
                  />
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="מייל"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="סיסמה"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  שליחה
                </Button>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    {toUrlServer === "signIn" && (
                      <Link href={`${API_CLIET}/sign-up`} variant="body2">
                        הרשמה
                      </Link>
                    )}
                  </Grid>
                  {messeage && (
                    <Typography color={"red"}>{messeage}</Typography>
                  )}
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default LogIn;
