import React from "react";
import { sendReqPost } from "../../axios";
import {
  Button,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ModalEdit from "./modal/ModalEdit";
import { Data, UpdateProjectData } from "./Interface";
import { useRecoilValue } from "recoil";
import { projectId } from "../../recoilAtom/Atoms";

const ProjectDetails = () => {
  const [projectData, setProjectData] = React.useState<Data>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);
  const [items, setItems] = React.useState<UpdateProjectData>([{s:"s"}]);
  const id = useRecoilValue(projectId);


  React.useEffect(() => {
    //בקשה לקבל את הנתונים של המפרויקט
    sendReqPost({ projectId: id }, "/projectPage")
      .then((res) => {
        setProjectData(res);
      })
      .catch((err) => console.log(err));
  }, [open,id]);

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
      <Typography
        variant="h6"
        sx={{
          background: "#83C1ED",
          borderRadius: "20px 20px 20px 20px",
          color: "#ffff",
        }}
        align="center"
        width={"100%"}
        height={"5%"}
      >
        תוכן הפרויקט
      </Typography>

      {projectData &&
        Object.entries(projectData).map(([key, value], index) => {
          // ids = projectData._id;

          return (
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
                      {key === "projectTeam"
                        ? value.map((item: any) => `${item.name},`)
                        : value}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button
                      onClick={() => {
                      if( key === "projectTeam") {
                          projectData.projectTeam.map((item)=>{
                            item[`nameRow`]="projectTeam"
                          })
                          setItems(projectData.projectTeam)
                          }
                          
                          else setItems([{ [key]: value }]);
                        setIndex(index);
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
          );
        })}
      {open && (
        <Modal open={open} sx={{ background: "#5be6f841" }}>
          <>
            <ModalEdit
              onClose={setOpen}
              data={items}
              nameInput={nameDetails[index]}
              typeModal="editProject"
            />
          </>
        </Modal>
      )}
    </Grid>
  );
};

export default ProjectDetails;
