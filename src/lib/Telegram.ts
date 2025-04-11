import dotenv from "dotenv";

dotenv.config();

export interface TelegramMessage {
    message_id: number;
    from?: {
        id: number;
        is_bot: boolean;
        first_name: string;
        username?: string;
        language_code?: string;
    };
    chat: {
        id: number;
        first_name?: string;
        username?: string;
        type: string;
    };
    date: number;
    text?: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const fetchDownloadUrl = async (progressURL: string): Promise<string | null> => {
    for (let i = 0; i < 30; i++) {
        const res: Response = await fetch(progressURL);
        const data = await res.json();
        console.log(`Attempt : ${i + 1}`, data);
        if (data.success === 1 && data.download_url) {
            return data.download_url;
        }
        await delay(500);
    }
    return null;
}


export const handleMessage = async (messageObj: TelegramMessage):Promise<string> => {
    try {
        const text: string = messageObj.text || "";
        if (text.startsWith("/")) {
            const command: string = text.substring(1);
            switch (command) {
                case "start":
                    return "Hey There, I'm Chiro the Prime APE. Paste the youtube link to download the video";
                default:
                    return "OOPS, that's a Wrong Command";
            }
        } else if (text.startsWith("https") || text.includes("www.youtube.com")) {
            const progressResp: Response = await fetch(`${process.env.VIDEOAPI}${text}`);
            const progResp = await progressResp.json();
            // console.log(progResp);
            const downloadUrl = await fetchDownloadUrl(progResp.progress_url);
            if (downloadUrl) {
                console.log(downloadUrl);
                return downloadUrl;
            }else{
                return "Video taking time. Try Again Later"
            }
        } else {
            return "Provide me a youtube Link"
        }
    } catch (e: any) {
        console.error("Error in handle Message", e?.message);
        return "Something went wrong. Please try again later.";
    }
}