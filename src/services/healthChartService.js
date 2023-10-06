import { httpAxios } from "@/helper/httpHelper";

export async function addHealthChart(data) {
    return await httpAxios.post("/api/healthchart/createHealthChart", data).then((response) => response.data);
}

export async function getChartByUserId(data) {
    return await httpAxios.post("/api/healthchart/getHealthChartByUserId", data).then((response) => response.data);
}

export async function takeAllTableBk() {
    return await httpAxios.post("/api/healthchart/backuptable", {}).then((response) => response.data);
}


export async function bktblcntAPI() {
    return await httpAxios.post("/api/healthchart/bktblcnt", {}).then((response) => response.data);
}

