import express from "express";
import './DB/MongoConnect'
import cors from "cors";
import allRoutes from "./routesServer/allUseRoutes"
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cors());
app.use(cookieParser());

allRoutes(app)

app.listen(3001, () => {
  console.log("3001");
});

