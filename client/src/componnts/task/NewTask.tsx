import {
  Container,
  TextField,
  Button,
  ThemeProvider,
  Grid,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CacheProvider } from "@emotion/react";
import { sendReqPost } from "../../axios";
import { useRecoilValue } from "recoil";
import { projectId } from "../../recoilAtom/Atoms";
import { useNavigate } from "react-router-dom";
import InputDate from "./InputDate";
import { cacheRtl, theme } from "../logn/LogIn";

interface FormData {
  projectId: string;
  taskDescription: string;
  startDate: Date;
  endDate: Date;
}

const NewTask = () => {
  const navitate = useNavigate();

  const id = useRecoilValue(projectId);

  const { register, setValue, handleSubmit } = useForm<FormData>({
    defaultValues: {
      projectId: id,
      taskDescription: "",
      startDate: undefined,
      endDate: undefined,
    },
  });



  const onSubmit = (data: FormData) => {
    sendReqPost(data, "/createNewTask").then((res) => {
      console.log(res);
      alert("משימה נוספה בהצלחה");
      navitate("/projects");
    });
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
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
              color={"GrayText"}
              align="center"
              width={"100%"}
            >
              יצירת משימה
            </Typography>
            <TextField
              multiline
              rows={4}
              required
              autoComplete="off"
              variant="standard"
              id="outlined-read-only-input"
              label={"תיאור המשימה"}
              InputLabelProps={{
                htmlFor: "#000000",
              }}
              InputProps={{
                style: {
                  borderBottom: `1px solid #1259e6`,
                },
                disableUnderline: true,
              }}
              sx={{ borderBlockStyle: "#1259e6", width: "80%", pb: 2 }}
              {...register("taskDescription")}
            />

            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <InputDate label="תאריך אתחלה" name="startDate" onDate={setValue}/>
              <InputDate label="תאריך סיום" name="endDate" onDate={setValue}/>
            
            </Grid>

            <Button type="submit" sx={{ mt: 1 }}>
              יצירת משימה
            </Button>
          </Grid>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default NewTask;
