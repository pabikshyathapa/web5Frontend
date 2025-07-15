import React, { useState } from "react";
import { useAdminUser, useDeleteUser } from "../../hooks/admin/useAdminUserr";
import { getBackendImageUrl } from "../../utils/backend-image";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import { toast } from "react-toastify";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useAdminCategory } from "../../hooks/admin/useAdminCategory";

export default function UserTable() {
  const { users, error, isPending } = useAdminUser();
  const deleteUser = useDeleteUser();
  const [deleteId, setDeleteId] = useState(null);

   const {
      data,
      lessons,
      pageNumber,
      setPageNumber,
      pagination,
      canNextPage,
      canPreviousPage,
      pageSize,
      setPageSize,
      search,
      setSearch,
    } = useAdminCategory();
  
    if (error) return <>{error.message}</>;
    if (isPending) return <>Loading...</>;
  
    const handlePrev = () => {
      if (canPreviousPage) {
        setPageNumber((prev) => prev - 1);
      }
    };
    const handleNext = () => {
      if (canNextPage) {
        setPageNumber((prev) => prev + 1);
      }
    };
    const handleSearch = (e) => {
      setPageNumber(1); // reset page number
      setSearch(e.target.value);
    };

  const handleDelete = () => {
    if (!deleteId) return;

    deleteUser.mutate(deleteId, {
      onSuccess: () => {
        toast.success("User deleted successfully");
        setDeleteId(null);
      },
      onError: () => {
        toast.error("Failed to delete user");
        setDeleteId(null);
      },
    });
  };

  if (isPending) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div className="p-4">
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this user?"
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#222740]">User Table</h2>
        <Link to="/admin/user/create">
          <button className="bg-[#222740] text-white px-4 py-2 rounded-lg hover:bg-[#1a1d33] transition-colors">
            + Create User
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#F0C5CE] text-[#222740] uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[#222740] divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-[#f9f9f9] transition-colors"
              >
                <td className="px-4 py-3">
                  <img
                    src={getBackendImageUrl(user.filepath)}
                    alt={user.firstName || "User"}
                    className="w-12 h-12 rounded-full object-cover border border-[#EFD365]"
                  />
                </td>

                <td className="px-4 py-3 font-medium">
                  {user.name}
                </td>

                <td className="px-4 py-3 text-gray-600">{user.email}</td>

                <td className="px-4 py-3 text-center">
                  {/* <div className="flex justify-center gap-2">
                <Link to={`/admin/user/${user._id}`}>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs">
                    <Eye size={16} />
                  </button>
                </Link>
                <Link to={`/admin/user/${user._id}/edit`}>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs">
                   <Pencil size={16} />
                  </button>
                </Link>
                <button
                  onClick={() => setDeleteId(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                >
                   <Trash2 size={16} />
                </button>
              </div> */}
                  <div className="flex justify-center gap-2">
                    <Link to={`/admin/user/${user._id}`}>
                      <button
                        className="group bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-full transition duration-200 shadow-sm"
                        title="View"
                      >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </Link>

                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button
                        className="group bg-yellow-100 hover:bg-yellow-200 text-yellow-700 p-2 rounded-full transition duration-200 shadow-sm"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </Link>

                    <button
                      onClick={() => setDeleteId(user._id)}
                      className="group bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-full transition duration-200 shadow-sm"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={!canPreviousPage}
          className={`px-4 py-2 rounded text-white text-sm ${
            canPreviousPage
              ? "bg-[#222740] hover:bg-[#33408c]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Back
        </button>
        <span className="text-[#222740] font-medium">
        Page {pagination?.page || 1} of {pagination?.totalPages || 1}
        </span>

        <button
          onClick={handleNext}
          disabled={!canNextPage}
          className={`px-4 py-2 rounded text-white text-sm ${
            canNextPage
              ? "bg-[#222740] hover:bg-[#33408c]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}