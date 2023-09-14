import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import SignIn from "../componnts/SignIn";
import HeaderBa from "../componnts/HeaderBa";
import ProjectPage from "../componnts/projectPage/ProjectPage";
import CreateNewProject from "../componnts/createNewProjectPage/createNewProject";
import axios from "axios";
import SignUp from "../componnts/sign_up/SignUp";
import P from "../componnts/projectsPage/P";
import { sendReqPost } from "../axios";
import Projects from "../componnts/projectsPage/Projects";
import Project2 from "../componnts/projectsPage/Project2";
import { Grid, useMediaQuery, AppBar } from "@mui/material";
import SideBar from "./SideBar";
import HeaderBar from "../componnts/HeaderBar";
import LogOut from "../componnts/LogOut";
import ProjectPage2 from "../componnts/projectPage/ProjectPage2";
import CreateProject from "../componnts/createNewProjectPage/CreateProject";
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

  
  useEffect(() => {
    //בקשה אימות לתוקן שקביל היוזר בכניסה למערכת לתוקן שנימצא בדאתא
    sendReqPost({ token: userToken }, "/authenticateTheLoginOfAPageUser")
      .then((res) => {
        if (res.token) {
          setUser(res);
          localStorage.setItem("user", `1`);
          localStorage.setItem("userName", `${res.name}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userToken, user]);
  let userValid = localStorage.getItem("user");
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Fragment>
      {userValid === null ? (
        <Routes>
          <Route
            path="/login"
            element={<SignIn onUserToken={setUserToken} />}
          />
          <Route
            path="/sing-up"
            element={<SignUp onUserToken={setUserToken} />}
          />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      ) : userValid === `1` ? (
        <>
          {/* <HeaderBar onData={setProjectData} user={user} /> */}
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
                  width: "20%",
                  height: "100%",
                  zIndex: +1,
                }}
              >
                <SideBar />
              </AppBar>
            )}

            <Grid
              item
              height={"100vh"}
              sx={{
                width: { xs: "100%", sm: "80%", md: "80%", xl: "80%" },
                mr: { sm: "20%" },
              }}
            >
              <Routes>
                <Route path="*" element={<Navigate to="/projects" replace />} />
                <Route
                  path="/projects"
                  element={
                    // <P
                    //   data={projects}
                    //   userName={user?.name}
                    //   onId={setProjectId}
                    // />
                    // <Projects />
                    <Project2 onProjectId={setProjectId}/>
                  }
                />
                <Route
                  path="/project"
                  element={<ProjectPage2 id={projectId} />}
                />
                <Route
                  path="/create-new-project"
                  element={<CreateProject />}
                />
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
