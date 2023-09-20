import { Grid } from "@mui/material";
import ListButtonsBar from "../componnts/ListButtonsBar";
import CreateIcon from "@mui/icons-material/Create";
import FolderIcon from "@mui/icons-material/Folder";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useLocation } from "react-router-dom";

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

const addButton = [
  {
    name: "משימות פעילות",
    path: "/task",
    icon: <ListAltIcon htmlColor={"#ffff"} />,
  },
];
const SideBar = () => {
  const location = useLocation();
  let newButtons :any
  // = [{ name: "", path: "", icon: <></> }];
  location.pathname === "/project" && (newButtons = buttons.concat(addButton));

  return (
    <Grid
      container
      direction="row"
      sx={{ background: "#83C1ED", height: "100vh", mt: 5 }}
    >
      <Grid item direction="column" justifyContent="start" width={"100%"}>
        <ListButtonsBar
          listButtons={location.pathname === "/project" ? newButtons : buttons}
        />
      </Grid>
    </Grid>
  );
};

export default SideBar;
