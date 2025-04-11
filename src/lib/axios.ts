import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface Params {
    chat_id: number,
    text: string
}

const BASE_URL = `https://api.telegram.org/bot${process.env.BOT}`;

export const axiosInstance = () => {
    return {
        async get(method: string, params: Params) {
            const res = await axios.get(`${BASE_URL}/${method}`, {
                params
            })
            return res.data;
        }
    }
}