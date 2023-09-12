import express from "express";
import './DB/MongoConnect'
import cors from "cors";
import allRoutes from "./routesServer/allUseRoutes"


const app = express()
app.use(express.json())
app.use(cors());


allRoutes(app)

app.listen(3001, () => {
  console.log("3001");
});
//finalP
//ym9TsvaCQwzsuu17
