import { httpAxios } from "@/helper/httpHelper";

export async function getAllGroceryItem() {
    return await httpAxios.get("/api/grocery/getAllGroceryItem").then((response) => response.data);
}

export async function addGroceryItem(data) {
    return await httpAxios.post("/api/grocery/addGroceryItem", data).then((response) => response.data);
}


export async function addKiranaSaman(data) {
    return await httpAxios.post("/api/grocery/addKiranaSaman", data).then((response) => response.data);
}

export async function getAllKiranaSaman(data) {
    return await httpAxios.post("/api/grocery/getAllKiranaSaman",data).then((response) => response.data);
}

export async function deleteKiranaSaman(data) {
    return await httpAxios.post("/api/grocery/deleteKiranaSaman", data).then((response) => response.data);
}



