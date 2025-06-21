import React, { useState } from 'react'
import { useAdminCategory, useDeleteOneCategory } from '../../hooks/admin/useAdminCategory'
import { getBackendImageUrl } from '../../utils/backend-image'
import { Link } from 'react-router-dom'
import DeleteModal from '../DeleteModal'
import { FaEdit, FaEye, FaTrash, FaTags  } from 'react-icons/fa';

function Welcome(props) {
    return <h1>{props.name}</h1>
}
function NameCompoment({ name, age }) {
    return <h1>{name} {age}</h1>
}

export default function CategoryTable() {
    const { categories, error, isPending } = useAdminCategory()
    const deleteCategoryHook = useDeleteOneCategory()
    const [deleteId, setDeleteId] = useState(null)

    const handleDelete = () => {
        deleteCategoryHook.mutate(
            deleteId,
            {
                onSuccess: () => {
                    setDeleteId(null)
                }
            }
        )
    }
return (
  <div className="p-8 bg-gradient-to-br from-indigo-100 to-white min-h-screen">
    <Welcome name="Welcome,Pabikshya" />
    {/* <NameCompoment name="Shyam" age="20" /> */}

    <DeleteModal
      isOpen={deleteId}
      onClose={() => setDeleteId(null)}
      onConfirm={handleDelete}
      title="Delete Confirmation"
      description="Are you sure you want to delete"
    />

    <div className="bg-white shadow-2xl rounded-3xl p-8 mt-8 transition-transform hover:scale-[1.01] duration-300">
      <div className="flex items-center gap-3 mb-6">
        <FaTags className="text-red-500 text-3xl" />
        <h2 className="text-3xl font-extrabold text-gray-800">Category Table</h2>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-inner">
        <table className="min-w-full table-auto rounded-xl overflow-hidden">
          <thead className="bg-red-500 text-white text-sm uppercase">
            <tr>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
            {categories.map((row) => (
              <tr key={row._id} className="hover:bg-indigo-50 transition duration-200">
                <td className="py-4 px-6 font-medium">{row.name}</td>
                <td className="py-4 px-6">
                  <img
                    className="w-16 h-16 rounded-xl border shadow-sm object-cover"
                    src={getBackendImageUrl(row.filepath)}
                    alt={row.name}
                  />
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-3">
                    <Link to={`/admins/categoryy/${row._id}`}>
                      <button
                        title="View"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm shadow-md"
                      >
                        <FaEye /> View
                      </button>
                    </Link>
                    <Link to={`/admins/categoryy/${row._id}/edit`}>
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
);
}
