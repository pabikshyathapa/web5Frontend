import { useMutation } from "@tanstack/react-query";
import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";

/**
 * React Query hook to register a user.
 * Automatically handles success/error toast notifications.
 */
export const useRegisterUser = () => {
    return useMutation(
        {
            mutationFn: registerUserService, // what function to run
            mutationKey: ['register'],
            onSuccess: (data) => {
                toast.success(data?.message || "Registration Success")
            },
            onError: (err)=> {
                toast.error(err?.message || "Registration Failed")
            }
        }
    )
}
