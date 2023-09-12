import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Link, useMediaQuery } from "@mui/material";
import SideBar from "../../routes/SideBar";
import HeaderBar from "../HeaderBar";
import HeaderBa from "../HeaderBa";

interface IProps {
  data: IDtat[] | undefined;
  userName?: string;
  onId: (id: string) => void;
}
interface IDtat {
  _id: string;
  name: string;
  status: string;
  situation: string;
}

const P = ({ data, userName, onId }: IProps) => {
  const navigte = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  userName && localStorage.setItem("userName", `${userName}`);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        width={"100%"}
        height={"100vh"}
      >
        <Grid item 
        width={"100%"}
        >
        <HeaderBar isSmallScreen={isSmallScreen} />
        </Grid>
        {!isSmallScreen &&
        <Grid
          item
          height={"100vh"}
          width={"20%"}
          sx={{ background: "#83C1ED" }}
        >
          <SideBar />
        </Grid>
        }
        <Grid
          item
          direction="row"
          justifyContent="center"
          alignItems="center"
          height={"100vh"}
          sx={{ background: "#aced83" ,
          width:{ xs: "100%", sm: "80%", md: "80%", xl: "80%" }
        }}

        >
          
          <Box
            sx={{
              mt: 8,
            }}
          >
            <Grid
              item
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {data?.map((tier) => (
                <Grid
                  item
                  sx={{
                    m: 3,
                  }}
                  key={tier.name}
                  // xs={12}
                  // sm={3}
                  // md={3}
                  // lg={3}
                >
                  <Card>
                    <CardHeader
                      title={
                        <Typography variant="h3" align="center">
                          <StarIcon />
                          {`${tier.name}`}
                        </Typography>
                      }
                      titleTypographyProps={{ align: "center" }}
                      subheaderTypographyProps={{
                        align: "center",
                      }}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[700],
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "baseline",
                          mb: 2,
                        }}
                      >
                        <Typography
                          component="h2"
                          variant="h5"
                          color="text.primary"
                        >
                          {`סטטוס - ${tier.status}`}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="text.primary"
                          sx={{ mr: 5 }}
                        >
                          {`מצב - ${tier.situation}`}
                        </Typography>
                      </Box>
                      <ul></ul>
                    </CardContent>
                    <CardActions
                      sx={{
                        direction: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        sx={{
                          width: {
                            xs: "100%", //0
                            sm: "50%", //600
                            md: "50%", //900
                            lg: "50%", //1200
                            xl: "50%", //1536
                          },
                        }}
                        variant={"contained"}
                        onClick={() => {
                          onId(tier._id);
                          navigte("/project");
                        }}
                      >
                        {"כניסה לפרויקט"}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default P;
