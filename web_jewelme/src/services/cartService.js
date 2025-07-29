import {
  getUserCartApi,
  addToCartApi,
  updateCartItemApi,
  deleteCartItemApi,
  getAllCartItemsApi,
  clearAllCartItemsApi
} from "../api/cartApi";

// cartService.js
// export const getUserCartService = async (userId) => {
//   try {
//     const response = await getUserCartApi(userId);
//     console.log("🛒 Cart Fetch Response:", JSON.stringify(response.data, null, 2));

//     // Return the products array inside the cart object
//     return response.data?.data?.products || [];
//   } catch (err) {
//     throw err.response?.data || { message: "Failed to fetch cart" };
//   }
// };
export const getUserCartService = async (userId) => {
  try {
    const response = await getUserCartApi(userId);
    console.log("🛒 Fetched from API:", response.data);

    // response.data looks like { success, data: { cart object }, message }
    if (response.data && response.data.data) {
      return response.data.data; // Return the whole cart object including products
    }
    return null; // or throw new Error("No cart data found");
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch cart" };
  }
};


// updateCartItemService expects: { userId, productId, quantity }
export const updateCartItemService = async (id, data) => {
  try {
    const response = await updateCartItemApi(data); // send entire body
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update cart item" };
  }
};

// deleteCartItemService expects: { userId, productId }
export const deleteCartItemService = async (data) => {
  try {
    const response = await deleteCartItemApi(data); // body: { userId, productId }
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete cart item" };
  }
};

export const addToCartService = async (data) => {
  try {
    const response = await addToCartApi(data);
    console.log("ADD CART RESPONSE", response.data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to add to cart" };
  }
};

// Fetch all cart items from all users (for admin or general display)
export const getAllCartItemsService = async () => {
  try {
    const response = await getAllCartItemsApi();
    console.log(" All Cart Items Response:", response.data);
    return response.data?.data || [];
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch all cart items" };
  }
};
export const clearAllCartItemsService = async () => {
  try {
    const response = await clearAllCartItemsApi();
    return response.data; // usually has { success, message }
  } catch (err) {
    throw err.response?.data || { message: "Failed to clear all cart items" };
  }
};

