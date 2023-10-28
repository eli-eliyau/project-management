import {
  List,
  ListItemButton,
  Grid,
  Typography,
  Divider,
  Icon,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { buttonChat } from "./HeaderBar";
import React, { useEffect, useState } from "react";

export interface ListButtonsProps {
  listButtons: {
    name: string;
    path: string;
    icon: JSX.Element;
  }[];
}

const ListButtonsBar = ({ listButtons }: ListButtonsProps) => {
  const navigte = useNavigate();
  const location = useLocation();

  const [pressed, setPressed] = useState<number>();

  useEffect(() => {
    location.pathname === "/projects" && setPressed(0);
  }, [location.pathname]);
  let size = -1;

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <List>
        {listButtons.map((item, index) => {
          size++;

          return (
            <>
              <ListItemButton
                key={index}
                sx={{
                  bgcolor: index === pressed ? "#ffff" : "#83c1ed0",
                  borderRadius: " 20px 0px 0px 30px",
                }}
                onClick={() => {
                  setPressed(index);
                  navigte(item.path);
                }}
              >
                {index === size && (
                  <Icon>
                    {React.cloneElement(item.icon, {
                      htmlColor: index === pressed ? "#83C1ED" : "#ffff",
                    })}
                  </Icon>
                )}

                <Typography
                  variant="h6"
                  sx={{
                    pr: 1,
                    color: index === pressed ? "#83C1ED" : "#ffff",
                    "&:hover": {
                      color: "#ffff",
                    },
                  }}
                >
                  {item.name}
                </Typography>
              </ListItemButton>

              <Divider
                orientation="horizontal"
                flexItem
                sx={{
                  mt: 1,
                  mb: 1,
                  bgcolor: index === size ? "#ffff" : "transparent",
                }}
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
