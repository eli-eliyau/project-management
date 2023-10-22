import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import SignIn from "../componnts/logn/SignIn";
import axios from "axios";
import SignUp from "../componnts/logn/SignUp";
import { sendReqPost } from "../axios";

import ProjectsPage from "../componnts/projectsPage/Projects";
import { Grid, useMediaQuery, AppBar } from "@mui/material";
import SideBar from "../componnts/bars/SideBar";
import HeaderBar from "../componnts/bars/HeaderBar";
import LogOut from "../componnts/logn/LogOut";
import ProjectPage from "../componnts/projectPage/ProjectPage";
import CreateProject from "../componnts/createNewProjectPage/CreateProject";
import Tasks from "../componnts/task/Tasks";
import NewTask from "../componnts/task/NewTask";
import LogIn from "../componnts/logn/LogIn";
export interface DataProject {
  _id: string;
  name: string;
  status: string;
  situation: string;
}

const RoutesFront = () => {
  const [projectId, setProjectId] = useState<string>();
  const [userToken, setUserToken] = useState<string>();
  const [user, setUser] = useState<{
    name: string;
    token: string;
    role: string;
  }>();

  // useEffect(() => {
  //   //בקשה אימות לתוקן שקביל היוזר בכניסה למערכת לתוקן שנימצא בדאתא
  //   sendReqPost({ token: userToken }, "/authenticateTheLoginOfAPageUser")
  //     .then((res) => {
  //       console.log(res);

  //       if (res.token) {
  //         setUser(res);
  //         localStorage.setItem("user", `1`);
  //         localStorage.setItem("role", res.role);
  //         localStorage.setItem("id", res._id);
  //         localStorage.setItem("userName", `${res.name}`);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, [userToken]);
  let userValid = localStorage.getItem("user");
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Fragment>
      {userValid === null ? (
        <Routes>
           <Route path="/sign-in" element={<LogIn toUrlServer={"signIn"} />} />
          <Route path="/sign-up" element={<LogIn toUrlServer={"signUp"} />} />
          {/* <Route
            path="/login"
            element={<SignIn onUserToken={setUserToken} />}
          />
          <Route
            path="/sing-up"
            element={<SignUp onUserToken={setUserToken} />}
          /> */}
          <Route path="*" element={<Navigate replace to="/sign-in" />} />
        </Routes>
      ) : userValid === `1` ? (
        <>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            width={"100%"}
            height={"100vh"}
          >
            <AppBar position="fixed" sx={{ width: "100%", height: "5%" }}>
              <HeaderBar isSmallScreen={isSmallScreen} />
            </AppBar>

            {!isSmallScreen && (
              <AppBar
                position="fixed"
                sx={{
                  width: "15%",
                  height: "100%",
                  zIndex: +1,
                }}
              >
                <SideBar />
              </AppBar>
            )}

            <Grid
              container
              item
              direction="column"
              justifyContent="center"
              alignItems="center"
              // height={"100vh"}
              sx={{
                width: { xs: "100%", sm: "80%", md: "80%", xl: "80%" },
                mr: { sm: "20%" },
              }}
            >
              <Routes>
                <Route path="*" element={<Navigate to="/projects" replace />} />
                <Route
                  path="/projects"
                  element={<ProjectsPage  />}
                />
                <Route
                  path="/project"
                  element={<ProjectPage  />}
                />
                <Route path="/create-new-project" element={<CreateProject />} />
                <Route path="/create-new-task" element={<NewTask />} />
                <Route path="/task" element={<Tasks />} />
                <Route path="/log-out" element={<LogOut />} />
              </Routes>
            </Grid>
          </Grid>
        </>
      ) : (
        ""
      )}
    </Fragment>
  );
};
export default RoutesFront;
