import apiClient from "../../shared/apiClient";


export const login = (URL, data) => apiClient.post(URL, data)

export const createAccountSignIn = (URL, data) => apiClient.post(URL, data)

export const getData = (URL) => apiClient(URL)

export const postData = (URL, data) => apiClient.post(URL, data)

export const userLogout = URL => apiClient.post(URL)

export const getDataByPost = (URL, object) => apiClient.post(URL, object)

export const getDataByID = (URL) => apiClient(URL)

export const getProductByID = URL => apiClient.post(URL)

export const updateData = (URL, obj) => apiClient.patch(URL, obj)

export const uploadImage = (URL, object) => apiClient.post(URL, object)

export const saveData = (URL, obj) => apiClient.post(URL, obj)

export const deleteData = (URL) => apiClient.delete(URL)