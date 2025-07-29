import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserCartService,
  addToCartService,
  updateCartItemService,
  deleteCartItemService
} from "../services/cartService";
import { toast } from "react-toastify";

export const useUserCart = (userId) => {
  return useQuery({
    queryKey: ["user_cart", userId],
    queryFn: () => getUserCartService(userId),
    enabled: !!userId,
  });
};
 
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCartService,
    onSuccess: (data) => {
      toast.success(data.message);
      // ✅ Invalidate cart so it refetches
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?._id) {
        queryClient.invalidateQueries(["user_cart", user._id]);
      }
    },
    onError: () => {
      toast.error("Failed to add to cart");
    },
  });
};

// Update cart item
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCartItemService(id, data),
    onSuccess: () => {
      toast.success("Cart item updated");
      queryClient.invalidateQueries(["user_cart"]);
    },
    onError: (err) => {
      toast.error(err.message || "Update failed");
    }
  });
};

// Delete cart item
export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCartItemService,
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries(["user_cart"]);
    },
    onError: (err) => {
      toast.error(err.message || "Delete failed");
    }
  });
};
