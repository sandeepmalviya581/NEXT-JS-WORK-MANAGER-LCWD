import { httpAxios } from "@/helper/httpHelper";

export async function getAllBorrowerDetailsAPI() {
    return await httpAxios.post("/api/borrowdetails/getAllBorrowDetails",{}).then((response) => response.data);
}







