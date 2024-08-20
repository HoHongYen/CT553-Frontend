import createApiClient from "./api";

const baseUrl = "/api/auth";
const api = createApiClient(baseUrl);
const apiAccount = createApiClient("/api/accounts", { needAuth: true });

export async function login(data) {
    return (await api.post("/login", data)).data;
}

export async function loginWithGoogle(data) {
    return (await api.post("/loginWithGoogle", data)).data;
}

async function getLoggedInAccount(token) {
    return (
        await api.request({
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            url: import.meta.env.VITE_API_BASE_URL + "/api/auth/logged-in-account",
        })
    ).data;
}

export async function getCurrentUser() {
    const accessToken = localStorage["accesstoken"];
    if (!accessToken) throw new Error("User not login");
    const loggedInAccount = await getLoggedInAccount(accessToken);
    return loggedInAccount.metadata;
}

export async function register(data) {
    console.log(data);
    return (await api.post("/register", data)).data;
}

export async function updateCurrentUser(updatedInfo) { // { fullName, phone, gender, birthday }
    console.log(updatedInfo);
    return (await apiAccount.put("", updatedInfo)).data;
}

export async function changePassword(data) { // { password }
    console.log("password", data);
    return (await apiAccount.put("/password", data)).data;
}