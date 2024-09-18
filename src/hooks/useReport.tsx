import useSWR, { mutate } from "swr";
import axios from "../lib/axios.config";

interface ReportParams {
    startDate: string;  
    endDate: string;
  }
  

export default function useReport(){
    const { data: reports , isLoading , error} = useSWR<Blob | null>(null , async(params: ReportParams) => {
        const { startDate, endDate } = params;
        const response = await axios.get("/report/order-history", {
            params: { startDateStr: startDate, endDateStr: endDate },
            responseType: 'blob' 
          });
          return response.data;
    }, { revalidateOnFocus: false })

    const fetchReport = async(params: ReportParams) => {
        try{
            const response = await axios.get("/report/order-history", {
                params: { startDateStr: params.startDate, endDateStr: params.endDate },
                responseType: 'blob' 
            });
            const fileUrl =  URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', `order_history_report_${params.startDate}_${params.endDate}.pdf`)
            document.body.appendChild(link)
            link.click();
            document.body.removeChild(link);

            mutate(response.data , false)
        }catch(error){
            console.error("Failed to fetch the report: ", error);
        }
    }

    const fetchReportExcel = async(params: ReportParams) => {
        try{
            const response = await axios.get("/report/order-history-excel", {
                params: { startDateStr: params.startDate, endDateStr: params.endDate },
                responseType: 'blob' 
            });
            const fileUrl =  URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', `order_history_excel_${params.startDate}_${params.endDate}.xlsx`)
            document.body.appendChild(link)
            link.click();
            document.body.removeChild(link);

            mutate(response.data , false)
        }catch(error){
            console.error("Failed to fetch the report: ", error);
        }
    }
    return {
        reports,
        fetchReport,
        fetchReportExcel,
        isLoading,
        error,
      };
}