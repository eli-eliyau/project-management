import { Routes, Route, Navigate } from "react-router-dom";
import { Fragment, useState } from "react";
import ProjectsPage from "../componnts/projectsPage/Projects";
import { Grid, useMediaQuery, AppBar, Box } from "@mui/material";
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
  let userValid = localStorage.getItem("user");
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const role = localStorage.getItem("role");

  return (
    <Fragment>
      {userValid === null ? (
        <Box
          sx={{
            background: "#83c1edb1",
          }}
        >
          <Routes>
            <Route path="/sign-in" element={<LogIn toUrlServer={"signIn"} />} />
            <Route path="/sign-up" element={<LogIn toUrlServer={"signUp"} />} />
            <Route path="*" element={<Navigate replace to="/sign-in" />} />
          </Routes>
        </Box>
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
              sx={{
                width: { xs: "100%", sm: "80%", md: "80%", xl: "80%" },
                mr: { sm: "20%" },
              }}
            >
              <Routes>
                <Route path="*" element={<Navigate to="/projects" replace />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/project" element={<ProjectPage />} />
                {role !== "user" && (
                  <>
                    <Route
                      path="/create-new-project"
                      element={<CreateProject />}
                    />
                    <Route path="/create-new-task" element={<NewTask />} />
                  </>
                )}
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
