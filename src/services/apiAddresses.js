import createApiClient from "./api";

const baseUrl = "/api/addresses";
const api = createApiClient(baseUrl, { needAuth: true });

export async function getProvinces() {
    const provinces = (await api.get("/provinces")).data;
    console.log("provinces", provinces);
    return provinces;
}


export async function getDistricts(provinceId) {
    console.log("provinceId", provinceId);
    const districts = (await api.get("/districts?provinceId=" + provinceId)).data;
    console.log("districts", districts);
    return districts;
}

export async function getWards(districtId) {
    const wards = (await api.get("/wards?districtId=" + districtId)).data;
    console.log("wards", wards);
    return wards;
}

export async function createAddress(data) {
    console.log(data);
    return (await api.post("", data)).data;
}

export async function updateAddress(addressId, updatedAddress) {
    return (await api.put("/" + addressId, updatedAddress)).data;
}

export async function getAddressesOfCurrentUser() {
    return (await api.get("/current-account")).data;
}

export async function deleteAddress(addressId) {
    return (await api.delete("/" + addressId)).data;
}
