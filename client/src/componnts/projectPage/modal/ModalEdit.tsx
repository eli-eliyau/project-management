import { Button, Grid, Paper, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ThemeProvider } from "@mui/system";
import { CacheProvider } from "@emotion/react";
import { cacheRtl, theme } from "../../logn/SignIn";
import { useForm } from "react-hook-form";
import { sendReqPut } from "../../../axios";
import ChipsArray from "./Chip";
import { ChipData, ModalProps, UpdateProjectData } from "../Interface";
import { useRecoilValue } from "recoil";
import { atomTaskId, projectId } from "../../../recoilAtom/Atoms";
import InputDate from "../../task/InputDate";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useState } from "react";
import SelectInput from "../../createNewProjectPage/SelectInput";

interface TeamMember {
  name: string;
  nameRow: string;
  _id: string;
}

interface ProjectData {
  projectTeam: (TeamMember | string)[];
}

const ModalEdit = ({ onClose, data, nameInput, typeModal }: ModalProps) => {
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);

  const pId = useRecoilValue(projectId);
  const tId = useRecoilValue(atomTaskId);
  // console.log(data);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<any>();

  const onSubmit = (data: UpdateProjectData | ChipData) => {
    let url: string;

    console.log(data);

    url =
      typeModal === "editProject"
        ? "/editProject"
        : typeModal === "editTask"
        ? "/editTask"
        : "";

    // sendReqPut(
    //   {
    //     id: url === "editProject" ? pId : tId,
    //     nameRow: Object.values(data)[0]
    //       ? Object.keys(data)[0]
    //       : Object.values(data)[0][0].nameRow,
    //     value: Object.values(data)[0],
    //   },
    //   `${url}`
    // )
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    onClose(false);
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Grid
          container
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          justifyContent="center"
          sx={{ mt: 20 }}
        >
          <Paper
            sx={{
              width: 200,
              maxWidth: 360,
              p: 2,
              boxShadow: 10,
              borderBottom: "3px solid #acacac",
              borderRadius: "20px 20px 20px 20px",
            }}
          >
            {nameInput === "צוות הפרוייקט" ? (
              <>
                <ChipsArray data={data} onData={setValue} />
                {openAddUser && (
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 2 }}
                  >
                    <SelectInput control={control} />
                  </Grid>
                )}
              </>
            ) : nameInput === "תאריך התחלה" || nameInput === "תאריך סיום" ? (
              <InputDate
                label={`${nameInput}`}
                name="endDate"
                onDate={setValue}
              />
            ) : (
              <TextField
                variant="standard"
                label={nameInput}
                type="text"
                {...register(`${Object.keys(data[0])[0]}`, {})}
                onChange={(e) => {
                  setValue(`${Object.keys(data[0])[0]}`, e.target.value);
                }}
              />
            )}
            <Button type="submit">
              <CloudUploadIcon htmlColor="#1976d2" fontSize="large" />
            </Button>
            <Button
              type="button"
              onClick={() => {
                setOpenAddUser(false);
                onClose(false);
              }}
            >
              <CloseIcon htmlColor="#121212" fontSize="medium" />
            </Button>

            {nameInput === "צוות הפרוייקט" && (
              <Button type="button" onClick={() => setOpenAddUser(true)}>
                <GroupAddIcon />
              </Button>
            )}
          </Paper>
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ModalEdit;
