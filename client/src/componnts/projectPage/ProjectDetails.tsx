import React from "react";
import { sendReqPost } from "../../axios";
import { Button, Divider, Grid, Modal, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ModalEdit from "./ModalEdit";

export interface Data {
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

interface Props {
  projectId: string | undefined;
}

const ProjectDetails = ({ projectId }: Props) => {
  const [projectData, setProjectData] = React.useState<Data>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<{ [index: number]: string }>({});

  React.useEffect(() => {
    //בקשה לקבל את הנתונים של המפרויקט
    sendReqPost({ projectId: projectId }, "/projectPage")
      .then((res) => {
        setProjectData(res);
        //   setRefreshingforProject(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const nameDetails = [
    "id",
    "שם",
    "סטטוס",
    "מצב",
    "משתמשים",
    "משתמש מוביל",
    "תיאור הפרויקט",
    "צוות הפרוייקט",
    "לקוח הפרוייקט",
  ];

  return (
    <Grid
      container
      sx={{
        boxShadow: 10,
        borderBottom: "3px solid #1C6EA4",
        borderRadius: "20px 20px 20px 20px",
        p: 2,
      }}
    >
      {projectData &&
        Object.entries(projectData).map(([key, value], index) => (
          <>
            {value !== projectData._id && (
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={"100%"}
                key={index}
              >
                <Grid
                  item
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  width={"90%"}
                  key={index}
                >
                  <Divider
                    orientation="horizontal"
                    flexItem
                    sx={{ bgcolor: "#83C1ED" }}
                  />
                  <Typography variant="h6">{nameDetails[index]}</Typography>
                  <Typography
                    sx={{
                      wordWrap: "break-word",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {value}
                  </Typography>
                </Grid>

                <Grid item>
                  <Button
                    onClick={() => {
                      setIndex({ [index]: value });
                      setOpen(true);
                    }}
                  >
                    <EditIcon htmlColor="#0661A2" />
                  </Button>
                </Grid>

                {/* <Api task={task} /> */}
              </Grid>
            )}
          </>
        ))}
      {open && (
        <Modal open={open} sx={{ background: "#5be6f841" }}>
          <>
            <ModalEdit
              onClose={setOpen}
              data={index}
              nameInput={nameDetails[Number(Object.keys(index))]}
            />
          </>
        </Modal>
      )}
    </Grid>
  );
};

export default ProjectDetails;
