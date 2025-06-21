import {
  getAllProductApi,
  createOneProductApi,
  getOneProductApi,
  updateOneProductApi,
  deleteOneProductApi
} from "../../api/admin/productApi";

// Get all products (with pagination/search params)
export const getAllProductService = async (params) => {
  try {
    const response = await getAllProductApi(params);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch products" };
  }
};

// Create a new product
export const createOneProductService = async (data) => {
  try {
    const response = await createOneProductApi(data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to create product" };
  }
};

// Get one product by ID
export const getOneProductService = async (id) => {
  try {
    const response = await getOneProductApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to get product" };
  }
};

// Update product by ID
export const updateOneProductService = async (id, data) => {
  try {
    const response = await updateOneProductApi(id, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update product" };
  }
};

// Delete product by ID
export const deleteOneProductService = async (id) => {
  try {
    const response = await deleteOneProductApi(id);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete product" };
  }
};
