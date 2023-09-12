import { Button, Card, Grid, TextareaAutosize, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const a = [
  "שם",
  "סטטוס",
  "מצב",
  "משתמשים",
  "משתמש מוביל",
  "צוות הפרויקט",
  "לקוח הפרויקט",
];

const CreateNewProject = () => {
  const [name, setName] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [situation, setSituation] = useState<string>();
  const [users, setUsers] = useState<string>();
  const [topUser, setTopUser] = useState<string>();
  const [projectDescription, setProjectDescription] = useState<string>();
  const [projectTeam, setProjectTeam] = useState<string>();
  const [projectClient, setProjectClient] = useState<string>();

  const navigate = useNavigate();
  const DataNewProject = {
    name,
    status,
    situation,
    users,
    topUser,
    projectDescription,
    projectTeam,
    projectClient,
    dadeCreated: Date.now(),
  };

  const postNewProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/createNewProject", { DataNewProject })
      .then((res) => {})
      .catch((err) => console.log(err));
    navigate("/projects");
  };
  return (
    <>
      <form onSubmit={postNewProject}>
        <Card
          sx={{
            p: 2,
            mt: 10,
            background: "#b0b0b0a1",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
          >
            {a?.map((item) => {
              console.log();

              return (
                <TextField
                  style={{ padding: 5 }}
                  label={item}
                  variant="outlined"
                  required
                  // value={}
                  // error={!a}
                  onChange={(e) => {
                    {
                      item === "שם" && setName(e.target.value);
                    }
                    {
                      item === "סטטוס" && setStatus(e.target.value);
                    }
                    {
                      item === "מצב" && setSituation(e.target.value);
                    }
                    {
                      item === "משתמשים" && setUsers(e.target.value);
                    }
                    {
                      item === "משתמש מוביל" && setTopUser(e.target.value);
                    }
                    {
                      item === "צוות הפרויקט" && setProjectTeam(e.target.value);
                    }
                    {
                      item === "לקוח הפרויקט" &&
                        setProjectClient(e.target.value);
                    }
                  }}
                  size={"small"}
                  type="text"
                  // helperText={!a && "הכנס תיאור"}
                />
              );
            })}
            <TextareaAutosize
              required
              aria-label="maximum height"
              placeholder={"תיאור הפרויקט..."}
              style={{
                width: "90%",
                height: 150,
                background: "#ffffff",
                borderRadius: "15px",
                fontFamily: "Arial",
              }}
              onChange={(e) => {
                setProjectDescription(e.target.value);
              }}
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{
                width: {
                  xs: "50%",
                  sm: "50%",
                  md: "50%", //900
                  lg: "35%", //1200
                  xl: "50%", //1536
                },
                boxShadow: 2,
                mt: 3,
              }}
            >
              {"שליחה"}
            </Button>
          </Grid>
        </Card>
      </form>
    </>
  );
};
export default CreateNewProject;
