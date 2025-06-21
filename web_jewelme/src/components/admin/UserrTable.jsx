import React, { useState } from 'react'
import { useAdminUser, useDeleteOneUser } from '../../hooks/admin/useAdminUserr'
import { Link } from 'react-router-dom'
import DeleteModal from '../DeleteModal'
import { FaEdit, FaEye, FaTrash, FaUsers, FaPlus } from 'react-icons/fa'

export default function UserTable() {
  const { users, error, isPending } = useAdminUser()
  const deleteUserHook = useDeleteOneUser()
  const [deleteId, setDeleteId] = useState(null)

  const handleDelete = () => {
    deleteUserHook.mutate(deleteId, {
      onSuccess: () => setDeleteId(null)
    })
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col overflow-hidden">
      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this user?"
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white shadow-2xl rounded-3xl p-8 transition-transform hover:scale-[1.01] duration-300 min-h-full">
          {/* Heading and Add Button */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <FaUsers className="text-blue-600 text-3xl" />
              <h2 className="text-3xl font-extrabold text-gray-800">User Table</h2>
            </div>
            <Link to="/admins/user/create">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-md"
                title="Add User"
              >
                <FaPlus className="text-white" /> Add
              </button>
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-inner max-h-[calc(100vh-250px)]">
            <table className="min-w-full table-auto rounded-xl overflow-hidden">
              <thead className="bg-blue-600 text-white text-sm uppercase">
                <tr>
                  <th className="py-4 px-6 text-left">Username</th>
                  <th className="py-4 px-6 text-left">Email</th>
                  <th className="py-4 px-6 text-left">First Name</th>
                  <th className="py-4 px-6 text-left">Last Name</th>
                  <th className="py-4 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
                {users.map((row) => (
                  <tr key={row._id} className="hover:bg-indigo-50 transition duration-200">
                    <td className="py-4 px-6 font-medium">{row.name}</td>
                    <td className="py-4 px-6">{row.email}</td>
                    <td className="py-4 px-6">{row.phone}</td>
                    {/* <td className="py-4 px-6">{user.phone}</td> */}
                    <td className="py-4 px-6">
                      <div className="flex gap-3">
                        <Link to={`/admins/user/${row._id}`}>
                          <button
                            title="View"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm shadow-md"
                          >
                            <FaEye /> View
                          </button>
                        </Link>
                        <Link to={`/admins/user/${row._id}/edit`}>
                          <button
                            title="Edit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm shadow-md"
                          >
                            <FaEdit /> Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeleteId(row._id)}
                          title="Delete"
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm shadow-md"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
