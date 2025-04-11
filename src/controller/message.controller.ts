import {Response, Request} from "express";
import {axiosInstance} from "../lib/axios.js";
import {handleMessage} from "../lib/Telegram.js";

export const axiosController=async(req:Request,res:Response):Promise<void>=>{
    try {
        // console.log(req.body);
        const message=req.body.message;
        if(!message || !message.text || !message.chat?.id){
            res.status(400).json({
                success:false,
                message:"Invalid Telegram Message",
                body:req.body
            })
        }

        const messageText:string=await handleMessage(req.body.message);
        // console.log("This is the text",messageText);
        const chat_id:number=message.chat?.id;
        const data=await axiosInstance().get("sendMessage",{
            chat_id,
            text:messageText
        });

        res.status(200).json({
            success:true,
            data:{
                message:"Message sent successfully",
                response:data
            }
        })
    }catch (e:any) {
        console.error("Error...",e?.response?.data||e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: e?.response?.data || e.message || e,
        })
    }
}