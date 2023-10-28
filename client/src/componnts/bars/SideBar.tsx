import { CardMedia, Grid } from "@mui/material";
import ListButtonsBar from "./ListButtonsBar";
import CreateIcon from "@mui/icons-material/Create";
import FolderIcon from "@mui/icons-material/Folder";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useLocation } from "react-router-dom";
import logo from "../../api/logo.png";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

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
  const role = localStorage.getItem("role");
  let newButtons = buttons;

  if (role === "user") {
    newButtons = buttons.filter((button) => {
      return button.name !== "יצירת פרויקט";
    });
  }

  if (location.pathname === "/project") {
    newButtons = newButtons.concat(addButtonTask);
  }

  if (role === "admin" && location.pathname === "/task") {
    newButtons = newButtons.concat(addButtonAddTask);
  }

  return (
    <Grid
      container
      direction="row"
      sx={{ background: "linear-gradient(0deg, rgba(131,193,237,1) 31%, rgba(6,97,162,1) 100%)", height: "100vh", mt: 5 }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        width={"100%"}
        sx={{ mt: 2 }}
      >
        <Grid item >

        <ListButtonsBar listButtons={newButtons} />
        </Grid>
        <Grid item >
          <CardMedia component="img" image={`${logo}`} height={"100%"} width={'100%'}/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SideBar;
