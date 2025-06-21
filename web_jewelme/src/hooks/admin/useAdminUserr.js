import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
    getAllUserService,
    createOneUserService,
    getOneUserService,
    updateOneUserService,
    deleteOneUserService
} from "../../services/admin/userService"
import { toast } from "react-toastify"

// 1. Get All Users
export const useAdminUser = () => {
    const query = useQuery({
        queryKey: ["admin_user"],
        queryFn: getAllUserService
    })

    const users = query.data?.data || []
    return {
        ...query, users
    }
}

// 2. Create User
export const useCreateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createOneUserService,
        onSuccess: () => {
            toast.success("User created")
            queryClient.invalidateQueries(["admin_user"])
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Create failed")
        }
    })
}

// 3. Get One User
export const useGetOneUser = (id) => {
    const query = useQuery({
        queryKey: ["admin_user_detail", id],
        queryFn: () => getOneUserService(id),
        enabled: !!id,
        retry: false
    })
    const users = query.data?.data || {}
    return {
        ...query, users
    }
}

// 4. Update One User
export const useUpdateOneUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }) =>
            updateOneUserService(id, data),
        onSuccess: () => {
            toast.success("User updated")
            queryClient.invalidateQueries(["admin_user"])
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Update failed")
        }
    })
}

// 5. Delete One User
export const useDeleteOneUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteOneUserService,
        mutationKey: ["admin_user_delete"],
        onSuccess: () => {
            toast.success("User deleted")
            queryClient.invalidateQueries(["admin_user"])
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Delete failed")
        }
    })
}
