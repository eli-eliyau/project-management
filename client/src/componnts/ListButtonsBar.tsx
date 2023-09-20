import { List, ListItemButton, Grid, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { buttonChat } from "./HeaderBar";

export interface ListButtonsProps {
  listButtons: {
    name: string;
    path: string;
    icon: JSX.Element;
  }[];
}

const ListButtonsBar = ({ listButtons }: ListButtonsProps) => {
  const navigte = useNavigate();

  let size = -1;

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ background: "#83C1ED", height: "100%" }}
    >
      <List>
        {listButtons.map((element, index) => {
          size++;

          return (
            <>
              <ListItemButton
                key={index}
                onClick={() => {
                  navigte(element.path);
                }}
              >
                {index === size && element.icon}
                <Typography variant="h6" sx={{ pr: 1, color: "#ffff" }}>
                  {element.name}
                </Typography>
              </ListItemButton>
              <Divider
                orientation="horizontal"
                flexItem
                sx={{ bgcolor: "#ffff" }}
              />
            </>
          );
        })}
        {buttonChat()}
      </List>
    </Grid>
  );
};

export default ListButtonsBar;
