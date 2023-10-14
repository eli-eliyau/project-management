import { Grid } from "@mui/material";
import ListButtonsBar from "./ListButtonsBar";
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
    icon: <FolderIcon />,
  },
  {
    name: "יצירת פרויקט",
    path: "/create-new-project",
    icon: <CreateIcon />,
  },
  {
    name: "התנתק",
    path: "/log-out",
    icon: <LogoutIcon />,
  },
];

const addButtonTask = [
  {
    name: "משימות",
    path: "/task",
    icon: <ListAltIcon />,
  },
];

const addButtonAddTask = [
  {
    name: "הוספת משימה",
    path: "/create-new-task",
    icon: <PlaylistAddIcon />,
  },
];

const SideBar = () => {
  const location = useLocation();
  let newButtons: any;

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
      <Grid
        item
        direction="column"
        justifyContent="start"
        width={"100%"}
        sx={{ mt: 1 }}
      >
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
