import useSWR from "swr";
import { Notification } from "../types";
import axios from "../lib/axios.config";




export default function useNotification(){
    const { data: notifications , isLoading , error} = useSWR<Notification[]>("/notify", async(url : string) => {
        const { data } = await axios.get(url);
        return data;
    })

    return {
        notifications,
        isLoading,
        error
    }
}