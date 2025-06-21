// src/hooks/admin/useAdminUser.js
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ['admin_users'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:5000/api/admin/users', {
        withCredentials: true,
      })
      return data.data // access `data` field from backend response
    },
  })
}
