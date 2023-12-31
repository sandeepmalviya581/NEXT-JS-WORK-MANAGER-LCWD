import { httpAxios } from "@/helper/httpHelper";

export async function getAllQuestionAPI(data) {
    return await httpAxios.post("/api/examportal/getAllQuestion",data).then((response) => response.data);
}

export async function createQuestionAPI(data) {
    return await httpAxios.post("/api/examportal/createQuestion", data).then((response) => response.data);
}


export async function saveAnswerAPI(data) {
    return await httpAxios.post("/api/examportal/saveAnswer", data).then((response) => response.data);
}

export async function getUserResultAPI() {
    return await httpAxios.get("/api/examportal/getUserResult").then((response) => response.data);
}

export async function getAllStudentResultAPI(data) {
    return await httpAxios.post("/api/examportal/getAllStudentResult",data).then((response) => response.data);
}

export async function deleteQuestionAPI(data) {
    return await httpAxios.post("/api/examportal/deleteQuestion", data).then((response) => response.data);
}

export async function createTimeTableAPI(data) {
    return await httpAxios.post("/api/examportal/createTimeTable", data).then((response) => response.data);
}

export async function getTimeTableAPI() {
    return await httpAxios.get("/api/examportal/getTimeTable").then((response) => response.data);
}





