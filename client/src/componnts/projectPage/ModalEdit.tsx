import { Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ThemeProvider } from "@mui/system";
import { CacheProvider } from "@emotion/react";
import { cacheRtl, theme } from "../SignIn";
import { useForm } from "react-hook-form";
import { sendReqPut } from "../../axios";
import { Task } from "./Tasks";

interface Props {
  onClose: Function;
  items: { [index: string]: string } ;
  nameInput: string  |undefined
}
interface Form {
  item: string;
}

const ModalEdit = ({ onClose, items, nameInput }: Props) => {
  const [projectItem, setProjectItem] = React.useState<{
    [index: string]: string 
  }>(items);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Form>({
    defaultValues: {
      item: Object.values(projectItem)[0],
    },
  });
console.log('nameInput' ,'---',nameInput);
console.log('items' ,'---',items);

  const onSubmit = (dataForm: Form) => {
    const { projectId } = items;

    // sendReqPut(
    //   {
    //     projectId,
    //     nameRow: Object.keys(projectItem)[0],
    //     value: dataForm.item,
    //   },
    //   "/editProject"
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
              maxWidth: 325,
              p: 2,
              boxShadow: 10,
              borderBottom: "3px solid #acacac",
              borderRadius: "20px 20px 20px 20px",
            }}
          >
           
            <TextField
              variant="standard"
              value={Object.values(projectItem)[0]}
              label={nameInput}
              type="text"
              {...register("item", {
                // maxLength: { value: 10, message: "שם המלא עד 10 תויים" },
              })}
              onChange={(e) =>
                setProjectItem({
                  [Object.keys(projectItem)[0]]: e.target.value,
                })
              }
            />
            <Button type="submit">
              <CloudUploadIcon htmlColor="#37fd0089" fontSize="large" />
            </Button>
            <Button type="button" onClick={() => onClose(false)}>
              <CloseIcon htmlColor="#ff0000" fontSize="medium" />
            </Button>
          </Paper>
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ModalEdit;
