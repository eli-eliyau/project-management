import { Box, Button, TextField, ThemeProvider } from "@mui/material";
import React from "react";
import { cacheRtl, theme } from "../SignIn";
import { CacheProvider } from "@emotion/react";
import { useForm } from "react-hook-form";

interface Props {
    item: string[]
    item2:string[]
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
interface N{
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
const InpotForm = ({ item,item2 }: Props) => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<Form>({
    defaultValues: {
      name:{},
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
        <Box component={"form"} onSubmit={handleSubmit(submit)}>
        {item.map((key,index)=>(
       

          <TextField
            autoComplete="off"
            variant="standard"
            id="outlined-read-only-input"
            label={`${item2[index]}`}
            InputLabelProps={{
              htmlFor: "#000000",
            }}
            InputProps={{
              style: {
                borderBottom: `1px solid #1259e6`,
              },
              disableUnderline: true,
            }}
            sx={{ borderBlockStyle: "#1259e6" }}
            {...register(`name.${item}`,{
              required: "שדה חובה",
              maxLength: { value: 10, message: "שם המלא עד 10 תויים" },
            })}
          />
        ))}
<Button type="submit">Submit</Button>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default InpotForm;
