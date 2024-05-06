import { httpAxios } from "@/helper/httpHelper";

export async function addSugarReport(data) {
    return await httpAxios.post("/api/sugarreport/measureSugarLevel", data).then((response) => response.data);
}

export async function getSuparReport(data) {
    return await httpAxios.post("/api/sugarreport/getSugarReport", data).then((response) => response.data);
}

export async function getSuparReportId(data) {
    return await httpAxios.post(`/api/sugarreport/getSugarReportId`,data).then((response) => response.data);
}

export async function deleteSugarReportId(data) {
    return await httpAxios.post(`/api/sugarreport/deleteSugarReportId`,data).then((response) => response.data);
}
