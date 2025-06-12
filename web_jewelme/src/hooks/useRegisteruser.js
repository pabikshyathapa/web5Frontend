import { useState, useCallback } from "react";
import { registerUserService } from "../services/authService"; // adjust path if needed

/**
 * Custom hook that mimics the API of React-Query's useMutation
 * so <RegisterForm /> can call:
 *   const { mutate, isLoading, isSuccess, isError, data, error } = useRegisterUserTan();
 */
export const useRegisterUser = () => {
  // status: 'idle' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  /** Call this from the form: mutate(formData) */
  const mutate = useCallback(async (formData) => {
    setStatus("loading");
    setData(null);
    setError(null);

    try {
      const response = await registerUserService(formData);
      setData(response);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  }, []);

  return {
    mutate,
    data,
    error,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
};
