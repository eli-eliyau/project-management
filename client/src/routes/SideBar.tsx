import { Grid } from "@mui/material";
import ListButtonsBar from "../componnts/ListButtonsBar";
import CreateIcon from "@mui/icons-material/Create";
import FolderIcon from "@mui/icons-material/Folder";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useLocation } from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useState } from "react";

export const buttons = [
  {
    name: "פרויקטים",
    path: "/projects",
    icon: <FolderIcon htmlColor={"#ffff"} />,
  },
  {
    name: "יצירת פרויקט",
    path: "/create-new-project",
    icon: <CreateIcon htmlColor={"#ffff"} />,
  },
  {
    name: "התנתק",
    path: "/log-out",
    icon: <LogoutIcon htmlColor={"#ffff"} />,
  },
];

const addButtonTask = [
  {
    name: "משימות",
    path: "/task",
    icon: <ListAltIcon htmlColor={"#ffff"} />,
  },
  
];

const addButtonAddTask = [
  {
    name: "הוספת משימה",
    path: "/create-new-task",
    icon: <PlaylistAddIcon htmlColor="#ffffff" />,
  },
];

const SideBar = () => {

  const location = useLocation();
  let newButtons: any;

  console.log(location.pathname);

  if (location.pathname === "/project") {
    newButtons = buttons.concat(addButtonTask);
  }

  if (location.pathname === "/task") {
    newButtons = buttons.concat(addButtonAddTask);
  }

  return (
    <Grid
      container
      direction="row"
      sx={{ background: "#83C1ED", height: "100vh", mt: 5 }}
    >
      <Grid item direction="column" justifyContent="start" width={"100%"}>
        <ListButtonsBar
          listButtons={
            location.pathname === `/project`
              ? newButtons
              : location.pathname === "/task"
              ? newButtons
              : buttons
          }
        />
      </Grid>
    </Grid>
  );
};

export default SideBar;
