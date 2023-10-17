import { useState, useEffect } from "react";
import { sendReqGet } from "../../axios";
import { Grid, Typography, Divider, Button, Box } from "@mui/material";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProgressCircle from "./ProgressCircle";
import { useNavigate } from "react-router-dom";
import {useRecoilState, useSetRecoilState} from 'recoil'
import { projectId } from "../../recoilAtom/Atoms";

interface Projects {
  _id: string;
  name: string;
  status: string;
  situation: string;
  dateCreated: Date;
}



const Project = () => {
  const [projects, setProjects] = useState<Projects[]>();
  const [progress, setProgress] = useState(0);
  const setId =useSetRecoilState(projectId)
  const navigate = useNavigate();
  const circularProgress = () => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const newProgress = oldProgress + 1;
        return newProgress;
      });
    }, 10);
    return () => {
      clearInterval(timer);
    };
  };

  useEffect(() => {

    sendReqGet({}, "/projectsHome").then((res) => {

      setProjects(res);

    });

    circularProgress();
  }, []);

  return (
    <Box width={"85%"} sx={{pt:8}}>
      {projects?.map((element, index) => (
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
            <ProgressCircle value={progress} />
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
                setId(element._id)
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
      ))}
    </Box>
  );
};

export default Project;
