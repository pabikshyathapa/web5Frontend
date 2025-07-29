import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../api/wishlistApi";

export const addToWishlistService = async (data) => {
  try {
    const response = await addToWishlist(data);
    return response;
  } catch (err) {
    throw err.response?.data || { message: "Failed to add to wishlist" };
  }
};

export const getWishlistService = async (userId) => {
  try {
    const response = await getWishlist(userId);
    return response;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch wishlist" };
  }
};

export const removeFromWishlistService = async (data) => {
  try {
    const response = await removeFromWishlist(data);
    return response;
  } catch (err) {
    throw err.response?.data || { message: "Failed to remove from wishlist" };
  }
};
