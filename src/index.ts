import express,{Express,Request,Response} from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT:string|number=process.env.PORT||3000;
const app:Express=express();

app.get("*",(req:Request,res:Response)=>{
    res.send("Hello World!")
})

app.listen(PORT,()=>{
    console.log(`Listening on http://localhost:${PORT}`);
})
