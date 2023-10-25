import {
  Button,
  TextField,
  ThemeProvider,
  Grid,
} from "@mui/material";

import { CacheProvider } from "@emotion/react";
import { useForm, SubmitHandler } from "react-hook-form";
import {  sendReqPost } from "../../axios";
import { useNavigate } from "react-router-dom";
import SelectInput from "./SelectInput";
import { cacheRtl, theme } from "../logn/LogIn";
interface Props {
  item: Record<string, string>
}
interface Project {
  name: string;
  situation: string;
  users: string;
  topUser: string;
  projectDescription: string;
  projectClient: string;
  dadeCreated: Date;
  projectTeam: string[];
}
interface Form {
  newProject:  Record<string, string |Date> | string[];
}

const InpotForm = ({ item }: Props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data);
    
    sendReqPost(data, "/createNewProject").then((res) => {
      alert("הפרויקט נוסף בהצלחה");
      navigate("/projects");
    });
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          {Object.entries(item).map(([key, value], index) => (
            <>
              {key === "projectTeam" ? (
                <SelectInput name="projectTeam" onDtat={setValue}
                />
              ) : (
                <TextField
                  required
                  autoComplete="off"
                  variant="standard"
                  id="outlined-read-only-input"
                  label={`${value}`}
                  InputLabelProps={{
                    htmlFor: "#000000",
                  }}
                  InputProps={{
                    style: {
                      borderBottom: `1px solid #1259e6`,
                    },
                    disableUnderline: true,
                  }}
                  multiline={key === "projectDescription"}
                  rows={key === "projectDescription" ? 4 : 1}
                  sx={{ borderBlockStyle: "#1259e6", width: "80%", pb: 2 }}
                  {...register(`newProject.${key}`, {
                    required: "שדה חובה",
                  })}
                  key={index}
                />
              )}
            </>
          ))}

          <Button type="submit">שלח</Button>
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default InpotForm;
