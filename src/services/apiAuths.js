import supabase, { supabaseUrl } from "./supabase";
import createApiClient from "./api";

const baseUrl = "/api/auth";
const api = createApiClient(baseUrl);
const apiAccount = createApiClient("/api/accounts", { needAuth: true });

export async function login(data) {
    const res = (await api.post("/login", data)).data;
    return res;
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

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email, password, options: {
            data: { fullName, avatar: "" }
        }
    });

    if (error) {
        console.error(error);
        throw new Error("Error signing up");
    }
    console.log(data);
    return data;
}



export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error(error);
        throw new Error("Logout failed");
    }
}

export async function updateCurrentUser(updatedInfo) { // { fullName, phone, gender, birthday }
    console.log(updatedInfo);
    return (await apiAccount.put("", updatedInfo)).data;
}

// export async function updateCurrentUser({ password, fullName, avatar }) {
//     // 1.Update password OR fullName
//     let updateData = {};
//     if (password) updateData = { password };
//     if (fullName) updateData = { fullName };

//     const { data, error } = await supabase.auth.updateUser(updateData);

//     if (error) {
//         console.error(error);
//         throw new Error("Error updating user");
//     }

//     if (!avatar) return data;

//     // 2. Upload the avatar image
//     const fileName = `avatar-${data.user.id}-${Math.random()}`;
//     const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);

//     if (storageError) {
//         console.error(storageError);
//         throw new Error("Error uploading avatar");
//     }

//     // 3. Update avatar in the user
//     const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({ data: { avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}` } });

//     if (error2) {
//         console.error(error2);
//         throw new Error("Error updating user avatar");
//     }

//     return updatedUser;
// }