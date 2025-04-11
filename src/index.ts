import express, {Express} from "express";
import dotenv from "dotenv";
import {axiosController} from "./controller/message.controller.js";

dotenv.config();
const app:Express=express();
const PORT:string|number=process.env.PORT||3000;

app.use(express.json());

app.get("/",(req,res):void=>{
    res.send("Hell");
})

app.post("/",axiosController);

app.listen(PORT,():void=>{
    console.log(`http://localhost:${PORT}`);
})
