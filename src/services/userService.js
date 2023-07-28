import { httpAxios } from "@/helper/httpHelper";

export async function addUser(user) {
    return await httpAxios.post("/api/users", user).then((response) => response.data);
}

export async function login(user) {
    return await httpAxios.post("/api/login", user).then((response) => response.data);
}