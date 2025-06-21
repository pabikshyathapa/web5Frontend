import axios from "axios"


export const getAllUserService = () =>
    axios.get("/admin/user")

export const createOneUserService = (data) =>
    axios.post("/admin/user", data)

export const getOneUserService = (id) =>
    axios.get("/admin/user/" + id)

export const updateOneUserService = (id, data) =>
    axios.put("/admin/user/" + id, data)

export const deleteOneUserService = (id) =>
    axios.delete("/admin/user/" + id)
