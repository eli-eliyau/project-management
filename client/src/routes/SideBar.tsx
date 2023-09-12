import { Grid } from "@mui/material";
import ListButtonsBar from "../componnts/ListButtonsBar";

const SideBar = () => {
  return (
    <Grid
    container
    direction="row"
      sx={{ background: "#83C1ED" ,  height:"100vh",mt:5}}
    >
      <Grid item direction="column" justifyContent="start" width={'100%'}>
        <ListButtonsBar listButtons={["פרויקטים", "יצירת פרויקט", "התנתק"]} />
      </Grid>
    </Grid>
  );
};

export default SideBar;
