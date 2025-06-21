// src/services/admin/userApi.js

import axios from "../api";

// Get all users
export const getAllUsersApi = () => axios.get("/admin/user");

// Create a new user
export const createOneUserApi = (data) =>
    axios.post("/admin/user", data);

// Get a single user by ID
export const getOneUserApi = (id) =>
    axios.get("/admin/user/" + id);

// Update a user by ID
export const updateOneUserApi = (id, data) =>
    axios.put("/admin/user/" + id, data);

// Delete a user by ID
export const deleteOneUserApi = (id) =>
    axios.delete("/admin/user/" + id);
