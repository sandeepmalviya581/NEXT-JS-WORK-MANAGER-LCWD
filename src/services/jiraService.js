import { httpAxios } from "@/helper/httpHelper";

export async function createJiraTask(task) {
    return await httpAxios.post("/api/jira/createJiraTask", task).then((response) => response.data);
}

export async function getAllJiraTaskAPI() {
    return await httpAxios.get("/api/jira/getAllJiraTask").then((response) => response.data);
}

export async function updateJiraStatusAPI(data) {
    return await httpAxios.post("/api/jira/updateJiraStatus", data).then((response) => response.data);
}

export async function getJiraByJiraNoAPI(data) {
    return await httpAxios.post(`/api/jira/getJiraByJiraNo`, data).then((response) => response.data);
}

export async function updateJiraTaskAPI(data) {
    return await httpAxios.post("/api/jira/updatJiraTask", data).then((response) => response.data);
}


export async function createMultipleSubTaskAPI(data) {
    return await httpAxios.post("/api/jira/createMultipleSubTask", data).then((response) => response.data);
}





