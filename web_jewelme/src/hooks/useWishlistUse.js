// src/hooks/useWishlist.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../api/wishlistApi";
import { toast } from "react-toastify";

export const useFetchWishlist = (userId) => {
  return useQuery({
    queryKey: ["wishlist", userId],
    queryFn: () => getWishlist(userId),
    enabled: !!userId,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToWishlist,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["wishlist", variables.userId]);
      toast.success("Added to wishlist!");
    },
    onError: () => {
      toast.error("Failed to add to wishlist");
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["wishlist", variables.userId]);
      toast.success("Removed from wishlist");
    },
    onError: () => {
      toast.error("Failed to remove from wishlist");
    },
  });
};
