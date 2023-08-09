import { httpAxios } from "@/helper/httpHelper";

export async function addTask(task) {
    return await httpAxios.post("/api/tasks", task).then((response) => response.data);
}

export async function editTask(task) {
    return await httpAxios.put(`/api/tasks/${task._id}`, task).then((response) => response.data);
}