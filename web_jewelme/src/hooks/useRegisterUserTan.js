import { useMutation } from "@tanstack/react-query";
import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";

/**
 * React Query hook to register a user.
 * Automatically handles success/error toast notifications.
 */
export const useRegisterUserTan = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (formData) => {
      return await registerUserService(formData);
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Registration successful!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed."
      );
    },
  });
};
