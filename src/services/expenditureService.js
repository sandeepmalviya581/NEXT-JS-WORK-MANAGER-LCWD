import { httpAxios } from "@/helper/httpHelper";

export async function addMultipleExpd(data) {
    return await httpAxios.post("/api/expenditure/addMultipleExpenditure", data).then((response) => response.data);
}
