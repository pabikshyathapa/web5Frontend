// src/components/admin/UserTable.jsx
import React from 'react'
import { useAdminUsers } from '../../hooks/admin/useAdminUser'
import { FaUser } from 'react-icons/fa'

export default function UserTable() {
  const { data: users, error, isPending } = useAdminUsers()

  if (isPending) return <div className="text-center py-10">Loading users...</div>
  if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaUser className="text-red-500 text-3xl" />
          <h2 className="text-3xl font-extrabold text-gray-800">Registered Users</h2>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-inner">
          <table className="min-w-full table-auto">
            <thead className="bg-red-500 text-white text-sm uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700 divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-indigo-50 transition">
                  <td className="px-6 py-4 font-medium">
                    {user.firstName || ''} {user.lastName || ''}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
