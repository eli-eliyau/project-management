import {
  List,
  ListItemButton,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import FolderIcon from "@mui/icons-material/Folder";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { buttonChat } from "./HeaderBar";

interface ListButtonsProps {
  listButtons: string[];
}

const ListButtonsBar = ({ listButtons }: ListButtonsProps) => {
  const navigte = useNavigate();
  const path = ["/projects", "/create-new-project", "/log-out"];

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ background: "#83C1ED", height: "100%" }}
    >
      <List>
        {listButtons.map((element, index) => (
          <>
            <ListItemButton
              key={index}
              onClick={() => {
                navigte(path[index]);
              }}
            >
              {index === 0 ? (
                <FolderIcon htmlColor={"#ffff"} />
              ) : index === 1 ? (
                <CreateIcon htmlColor={"#ffff"} />
              ) : index === 2 ? (
                <LogoutIcon htmlColor={"#ffff"} />
              ) : (
                ""
              )}
              <Typography variant="h6" sx={{ pr: 1 ,color:"#ffff" }}>
                {element}
              </Typography>
            </ListItemButton>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{ bgcolor: "#ffff" }}
            />
          </>

        ))}
        {buttonChat()}

      </List>
    </Grid>
  );
};

export default ListButtonsBar;
