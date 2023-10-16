import { httpAxios } from "@/helper/httpHelper";

export async function createJiraTask(task) {
    return await httpAxios.post("/api/jira/createJiraTask", task).then((response) => response.data);
}

