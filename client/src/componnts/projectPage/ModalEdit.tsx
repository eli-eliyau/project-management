import { Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ThemeProvider } from "@mui/system";
import { CacheProvider } from "@emotion/react";
import { cacheRtl, theme } from "../SignIn";
import { useForm } from "react-hook-form";

interface Props {
  onClose: Function;
  data: { [index: string]: string };
  nameInput: string | undefined;
}
interface Form {
  detail: string;
}

const ModalEdit = ({ onClose, data, nameInput }: Props) => {
  const [projectItem, setProjectItem] = React.useState<{
    [index: string]: string;
  }>(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Form>({
    defaultValues: {
      detail: Object.values(projectItem)[0],
    },
  });

  const onSubmit = (data: Form) => {
    console.log(data.detail);
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
              value={Object.values(projectItem)}
              label={nameInput}
              type="text"
              {...register("detail", {
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
