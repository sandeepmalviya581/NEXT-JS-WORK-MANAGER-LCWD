import { httpAxios } from "@/helper/httpHelper";

export async function addTask(task) {
    return await httpAxios.post("/api/tasks", task).then((response) => response.data);
}