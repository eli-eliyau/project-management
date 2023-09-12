import {
  Drawer,
  IconButton,
  Grid,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ListButtons from "./ListButtonsBar";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";

export const userName = () => (
  <Typography
    variant="h5"
    sx={{
      color: "#ffff",
      p: 1,
    }}
  >
    {`ברוך הבא ${localStorage.getItem("userName")}`}
  </Typography>
);

export const buttonChat = () => (
  <Button fullWidth aria-label="right" href="http://localhost:3002/home">
    <ChatIcon htmlColor={"#ffff"} />
  </Button>
);

const HeaderBar = (props: { isSmallScreen: boolean }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ background: "#0661A2" }}
    >
      {props.isSmallScreen ? (
        <>
          <Drawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            anchor="right"
          >
            <ListButtons listButtons={["פרויקטים", "יצירת פרויקט", "התנתק"]} />
          </Drawer>

          <IconButton
            sx={{ color: "#ffff" }}
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>
          {userName()}
        </>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item>{userName()}</Grid>
          <Grid item>לוגו</Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default HeaderBar;
