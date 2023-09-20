import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Grid,
} from "@mui/material";
import React from "react";
import { cacheRtl, theme } from "../SignIn";
import { CacheProvider } from "@emotion/react";
import { useForm } from "react-hook-form";

interface Props {
  item:{
    [key:string]: string

  }
    // [status:string]: string
    // [situation:string]: string,
    // [users:string]: string,
    // [topUser:string]: string,
    // [projectDescription:string]: string,
    // [projectTeam:string]: string,
    // [projectClient:string]: string,
    // [name:string]: string
  } 
  

interface Form {
  name: any;
  //   status: string;
  //   situation: string;
  //   users: string;
  //   topUser: string;
  //   projectDescription: string;
  //   projectTeam: string;
  //   projectClient: string;
  //   dadeCreated: Date;
}
interface N {
  name: string;
  status: string;
  situation: string;
  users: string;
  topUser: string;
  projectDescription: string;
  projectTeam: string;
  projectClient: string;
  dadeCreated: Date;
}
const InpotForm = ({ item }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Form>({
    defaultValues: {
      name: {},
      //   status: "",
      //   situation: "",
      //   users: "",
      //   topUser: "",
      //   projectDescription: "",
      //   projectTeam: "",
      //   projectClient: "",
    },
  });

  const submit = (data: Form) => {
    console.log(data);
  };
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Grid
         container
         direction="column"
         justifyContent="center"
         alignItems="center"
        component={"form"} onSubmit={handleSubmit(submit)}>
          {Object.entries(item).map(([key,value], index) => (
            <>
          
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
                multiline={key ==='projectDescription'}
                rows={key ==='projectDescription' ? 4 : 1}
                sx={{ borderBlockStyle: "#1259e6" ,width:'80%',pb:2}}
                {...register(`name.${key}`, {
                  required: "שדה חובה",
                  // maxLength: { value: 10, message: "שם המלא עד 10 תויים" }
                  // ,
                })}
                key={index}
              />
            
            </>
          ))}

          <Button type="submit" >שלח</Button>
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default InpotForm;
