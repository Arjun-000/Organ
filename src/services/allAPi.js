import commonAPI from "./commonAPI";
import SERVER_URL from "./serverAPI";

// User Registration
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody);
};

// User Login
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody);
};

// Admin Login
export const adminLoginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/admin/login`, reqBody);
};

// add donor
export const addDonorAPI= async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-donor`,reqBody,reqHeader)
}

export const getDonorAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/donors`,{})
}

export const updatedDonorAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/edit-donors/${id}`, reqBody, reqHeader);
};

export const deleteDonorAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/donors/${id}/delete`,{},reqHeader)
}

export const addPatientAPI = async (reqBody, reqHeader = {}) => {
    return await commonAPI("POST", `${SERVER_URL}/add-patient`, reqBody, reqHeader);
};

export const getPatientsAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/patients`,{})
}


export const updatedPatientAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/edit-patients/${id}`, reqBody, reqHeader);
};


export const deletePatientAPI = async (id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/patients/${id}/delete`,{},reqHeader)
}

export const getDonorsForPatientsAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/patients/donors`, {});
};


export const getUserAPI = async (id,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-data/${id}`,{},reqHeader)
}

export const editUserAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/user-data/${id}/edit`,reqBody, reqHeader)
}

export const requestOrgan = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/patinet/request`,reqBody)
}