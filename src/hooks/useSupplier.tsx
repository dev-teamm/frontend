import axios from "../lib/axios.config";
import useSWR from "swr";
import { Supplier } from "../types";



export default function useSupplier() {
    const { data: suppliers , isLoading , error, mutate} = useSWR<Supplier[]>("/suppliers", async(url: string) => {
        const { data } = await axios.get(url);
        return data;
    })

    return {
        suppliers,
        isLoading,
        error
    }
}