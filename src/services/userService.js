import { httpAxios } from "@/helper/httpHelper";

export async function addUser(user) {
    return await httpAxios.post("/api/users", user).then((response) => response.data);
}

export async function login(user) {
    return await httpAxios.post("/api/login", user).then((response) => response.data);
}

export async function currentUser() {
    return await httpAxios.get("/api/current").then((response) => response.data);
}

export async function logout() {
    return await httpAxios.post("/api/logout").then((response) => response.data);
}

export async function getTaskOfUser(userId) {
    return await httpAxios.get(`/api/users/${userId}/tasks`).then((response) => response.data);
}

export async function deleteTaskById(taskId) {
    return await httpAxios.delete(`/api/tasks/${taskId}`).then((response) => response.data);
}

export async function getTaskById(taskId) {
    return await httpAxios.get(`/api/tasks/${taskId}`).then((response) => response.data);
}

export async function getAllUser() {
    return await httpAxios.get("/api/users").then((response) => response.data);
}

export async function deleteUserById(userId) {
    return await httpAxios.delete(`/api/users/${userId}`).then((response) => response.data);
}

export async function getAllUserPagniation(data) {
    return await httpAxios.post("/api/users/all/getAllUser", data).then((response) => response.data);
}

export async function getRondomNameAPI() {
    return await httpAxios.get("https://randomuser.me/api/").then((response) => response.data);
}
