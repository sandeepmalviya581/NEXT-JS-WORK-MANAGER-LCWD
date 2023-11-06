import { httpAxios } from "@/helper/httpHelper";

export async function getAllQuestionAPI() {
    return await httpAxios.get("/api/examportal/getAllQuestion").then((response) => response.data);
}

export async function createQuestionAPI(data) {
    return await httpAxios.get("/api/examportal/createQuestion", data).then((response) => response.data);
}






