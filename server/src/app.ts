import express, { Request, Response } from "express";
import './DB/MongoConnect'
import cors from "cors";
import allRoutes from "./routesServer/allUseRoutes"
import cookieParser from 'cookie-parser'
import path from "node:path";
require("dotenv").config({ path: "../.env" });


const app = express()
const buildClient = path.join(__dirname, '../../client/build/index.html')

app.use(express.json())
app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.static(buildClient))

allRoutes(app)
app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'), (err) =>
    err && res.send(err))
})

app.listen(3001, () => {
  console.log("3001");
});

