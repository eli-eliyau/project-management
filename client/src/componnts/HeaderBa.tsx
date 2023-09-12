import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

interface IProps {
  onData: (id: IArr[] | undefined) => void;
  user: { name: string; token: string; role: string } | undefined;
}
interface IArr {
  _id: string;
  name: string;
  status: string;
  situation: string;
}

const HeaderBa = ({ onData, user }: IProps) => {
  const [projects, setProjects] = useState<IArr[]>();
  const [getProjectData, setGetProjectData] = useState<Boolean>(false);
  const [r, setR] = useState(true);
  const navigate = useNavigate();
  // useEffect(() => {
  //   //מביא את הפרויקטים לדף הבית
  //   axios
  //     .get("http://localhost:3001/projectsHome")
  //     .then((res) => {
  //       setProjects(res.data);
  //       onData(res.data);
  //       setGetProjectData(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [getProjectData]);

  return (
    <>
      <AppBar
        component="nav"
        sx={{
          height: {
            xs: 50,
          },
          background: "#0066ff",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography variant="h5" component="div" sx={{ m: 1 }}>
            {"ניהול פרויקטים"}
          </Typography>

          <Box>
            <Button
              sx={{ color: "#fff", mt: 0.5 }}
              onClick={() => {
                setGetProjectData(true);
                navigate("/projects");
              }}
            >
              {"פרויקטים"}
            </Button>
            <Button
              sx={{ color: "#fff", mt: 0.5 }}
              onClick={() => {
                navigate("/create-new-project");
              }}
            >
              {"יצירת פרויקט"}
            </Button>
            <Button
              // key={item}
              sx={{ color: "#fff", mt: 0.5 }}
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("userName");
                axios
                  .post("http://localhost:3001/logged-off", {
                    name: user?.name,
                  })
                  .then((res) => {})
                  .catch((err) => console.log(err));
                navigate(0);
              }}
            >
              {"התנתק"}
            </Button>
          </Box>
        </Grid>
      </AppBar>
    </>
  );
};
export default HeaderBa;
