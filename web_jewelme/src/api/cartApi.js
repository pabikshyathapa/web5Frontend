import axios from "../api/api";

// Get user's cart items
export const  getUserCartApi = async (userId) => {
  const res = await axios.get(`/cart/${userId}`);
  return res.data;
};

export const addToCartApi = async ({ userId, productId, name, price, quantity, filepath }) => {
  return await axios.post("/cart/add", {
    userId,
    productId,
    name,
    price,
    quantity,
    filepath,
  });
};

// update
export const updateCartItemApi = async (data) => {
  return await axios.put(`/cart/update`, data);
};

// delete
export const deleteCartItemApi = async (data) => {
  return await axios.delete(`/cart/remove`, { data });
};

