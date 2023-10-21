import { useState, useEffect } from "react";
import { sendReqGet } from "../../axios";
import {
  Grid,
  Typography,
  Divider,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProgressCircle from "./ProgressCircle";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { projectId } from "../../recoilAtom/Atoms";

interface Projects {
  _id: string;
  name: string;
  status: string;
  situation: string;
  dateCreated: Date;
  percentNumber: number;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Projects[]>();
  const [progress, setProgress] = useState(0);

  const setId = useSetRecoilState(projectId);
  const navigate = useNavigate();

  useEffect(() => {
    sendReqGet({}, "/projectsHome").then((res) => {
      setProjects(res);
      console.log(res);
    });
  }, []);

  return (
    <Box width={"85%"} sx={{ pt: 8 }}>
      {projects ? (
        projects.map((element, index) => (
          <Grid
            container
            direction="row"
            key={index}
            sx={{
              boxShadow: 10,
              borderBottom: "3px solid #1C6EA4",
              borderRadius: "20px 20px 20px 20px",
              m: 2,
              p: 2,
              width: "100%",
            }}
          >
            <Grid
              item
              sx={{ flex: 1 }}
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography variant="h6" sx={{ p: 1 }}>
                {`שם - ${element.name}`}
                <Divider orientation="horizontal" />
                {`  סטטוס - ${element.status}`}
              </Typography>
            </Grid>

            <Grid
              container
              sx={{ flex: 1 }}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <ProgressCircle value={element.percentNumber} key={index} />
            </Grid>

            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-end"
              sx={{ flex: 1 }}
            >
              <Button
                onClick={() => {
                  setId(element._id);
                  navigate("/project");
                }}
              >
                <ArrowBackIcon color="info" sx={{ mr: "0" }} />
              </Button>

              <Typography align="left">
                {`${dayjs(element.dateCreated).format("DD/MM/YYYY")}`}
              </Typography>
            </Grid>
          </Grid>
        ))
      ) : (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "40%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </Box>
  );
};

export default ProjectsPage;
