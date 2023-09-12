import { Button, Card, Grid, TextareaAutosize, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { cacheRtl, theme } from "../SignIn";
interface IData {
  _id: string;
  name: string;
  status: string;
  situation: string;
  users: string;
  topUser: string;
  projectDescription: string;
  projectTeam: string;
  projectClient: string;
}

interface IProps {
  projectId: string | undefined;
  onEnterEditProject: (enter: boolean) => void;
  dataProject: IData | undefined;
  onRefreshingforProject: (ref: boolean) => void;
}

const a = [
  "שם",
  "סטטוס",
  "מצב",
  "משתמשים",
  "משתמש מוביל",
  "צוות הפרויקט",
  "לקוח הפרויקט",
];

const EditProjectPage = ({
  projectId,
  onEnterEditProject,
  onRefreshingforProject,
  dataProject,
}: IProps) => {
  const [name, setName] = useState<string | undefined>(dataProject?.name);
  const [status, setStatus] = useState<string | undefined>(dataProject?.status);
  const [situation, setSituation] = useState<string | undefined>(
    dataProject?.situation
  );
  const [users, setUsers] = useState<string | undefined>(dataProject?.users);
  const [topUser, setTopUser] = useState<string | undefined>(
    dataProject?.topUser
  );
  const [projectDescription, setProjectDescription] = useState<
    string | undefined
  >(dataProject?.projectDescription);
  const [projectTeam, setProjectTeam] = useState<string | undefined>(
    dataProject?.projectTeam
  );
  const [projectClient, setProjectClient] = useState<string | undefined>(
    dataProject?.projectClient
  );

  const DataAditProject = {
    name,
    status,
    situation,
    users,
    topUser,
    projectDescription,
    projectTeam,
    projectClient,
  };

  const postNewProject = (event: any) => {
    event.preventDefault();
    axios
      .put("http://localhost:3001/editProject", {
        projectId: projectId,
        DataAditProject,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    onRefreshingforProject(true);
    onEnterEditProject(false);
  };

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <form onSubmit={postNewProject}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Card
                sx={{
                  width: {
                    xs: "80%", //0
                    sm: "80%", //600
                    md: "80%", //900
                    lg: "80%", //1200
                    xl: "80%", //1536
                  },
                  p: 2,
                  mt: 10,
                  background: "#b0b0b0a1",
                  direction: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  value={name}
                  style={{ padding: 5 }}
                  label={"שם"}
                  variant="outlined"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  size={"small"}
                  type="text"
                />
                <TextField
                  value={status}
                  style={{ padding: 5 }}
                  label={"סטטוס"}
                  variant="outlined"
                  required
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  size={"small"}
                  type="text"
                />
                <TextField
                  value={situation}
                  style={{ padding: 5 }}
                  label={"מצב"}
                  variant="outlined"
                  required
                  onChange={(e) => {
                    setSituation(e.target.value);
                  }}
                  size={"small"}
                  type="text"
                />{" "}
                <TextField
                  value={users}
                  style={{ padding: 5 }}
                  label={"משתמשים"}
                  variant="outlined"
                  required
                  onChange={(e) => {
                    setUsers(e.target.value);
                  }}
                  size={"small"}
                  type="text"
                />
                <TextField
                  value={topUser}
                  style={{ padding: 5 }}
                  label={"משתמש מוביל"}
                  variant="outlined"
                  required
                  onChange={(e) => {
                    setTopUser(e.target.value);
                  }}
                  size={"small"}
                  type="text"
                />
                <TextField
                  value={projectTeam}
                  style={{ padding: 5 }}
                  label={"צוות הפרויקט"}
                  variant="outlined"
                  required
                  onChange={(e) => {
                    setProjectTeam(e.target.value);
                  }}
                  size={"small"}
                  type="text"
                />
                <TextField
                  value={projectClient}
                  style={{ padding: 5 }}
                  label={"לקוח הפרויקט"}
                  variant="outlined"
                  required
                  onChange={(e) => {
                    setProjectClient(e.target.value);
                  }}
                  size={"small"}
                  type="text"
                />
                <br />
                <TextareaAutosize
                  required
                  value={projectDescription}
                  aria-label="maximum height"
                  placeholder={"תיאור הפרויקט..."}
                  style={{
                    width: "100%",
                    height: 150,
                    background: "#b0b0b0a1",
                    borderRadius: "15px",
                    fontFamily: "Arial",
                    backgroundColor: "#ffff",
                  }}
                  onChange={(e) => {
                    setProjectDescription(e.target.value);
                  }}
                />
                <br />
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ width: "80%", boxShadow: 2, mt: 3 }}
                  >
                    {"שליחה"}
                  </Button>
                </Grid>
              </Card>
            </Grid>
          </form>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default EditProjectPage;
