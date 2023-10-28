import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, hexToRgb, ThemeProvider } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { useNavigate } from "react-router-dom";
import { API_CLIET } from "../../App";
import { sendReqGet, sendReqPost } from "../../axios";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import logo from "../../api/logo.png";
import { CardMedia } from "@mui/material";

interface IProps {
  toUrlServer: string;
}

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export const theme = createTheme({
  direction: "ltr",
});

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

          res === "משתמש קיים במערכת"
            ? setMessage("משתמש קיים במערכת")
            : res === "משתמש לא קיים"
            ? setMessage("משתמש לא קיים")
            : sendReqGet(
                {
                  "x-api-key": data.token,
                },
                "/authToken"
              ).then((res) => {
                console.log(res);
                if (res === true) {
                  localStorage.setItem("user", "1");
                  localStorage.setItem("idMyUser", data.user._id);
                  localStorage.setItem("userName", data.user.name);
                  localStorage.setItem("role", data.user.role);
                  localStorage.setItem("token", data.token);
                  navigate(0);
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
      <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            {/* <CssBaseline /> */}
            <Box
              sx={{
                // marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  height: "200px",
                  borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70% ",
                  background: 'linear-gradient(39deg, rgba(6,97,162,1) 90%, rgba(131,193,237,1) 90%)' ,
                  mt: 2,
                }}
              >
                <CardMedia component="img" image={`${logo}`} height={"200px"} />
              </Box>

              <Avatar sx={{ bgcolor: "#0661a2", mt: 4 }}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>

              {/* <Typography component="h1" variant="h5" sx={{color:'#035590a2'}}>
                {toUrlServer === "signIn" ? "כניסה" : "הרשמה"}
              </Typography> */}

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
                  variant="filled"
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
                  variant="filled"
                  name="password"
                  label="סיסמה"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {toUrlServer === "signIn" ? "כניסה" : "הרשמה"}
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
                        אינך רשום? הירשם עכשיו
                      </Link>
                    )}
                  </Grid>
                  {messeage && (
                    <Typography color={"red"}>{messeage}</Typography>
                  )}
                </Grid>
              </Box>
            </Box>
          </ThemeProvider>
        </CacheProvider>
      </Container>
    </>
  );
};

export default LogIn;
