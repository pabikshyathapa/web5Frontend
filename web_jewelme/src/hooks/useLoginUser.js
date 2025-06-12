import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
export const useLoginUser=()=>{
    const{login}=useContext(AuthContext)
    return useMutation(
        {
            mutationFn: loginUserService,
            mutationKey: ["Login_key"],
            onSuccess:(data)=> {
                login(data?.data,data?.token)
                toast.success(data?.message || "Login success")
            },
            onError:(err)=> {
                toast.error(err?.message || "login failed")
            }
        }
    )
}