import React, { useState } from 'react'
import { useAdminProduct, useDeleteOneProduct } from '../../hooks/admin/useAdminProduct'
import { getBackendImageUrl } from '../../utils/backend-image'
import { FaBox, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DeleteModal from '../DeleteModal'


export default function ProductTable() {
  const {
    products, error, pagination,
    pageNumber, setPageNumber, pageSize, setPageSize,
    search, setSearch, canNextPage, canPreviousPage
  } = useAdminProduct()

  if (error) return <>{error.message}</>

  const handlePrev = () => {
    if (canPreviousPage) setPageNumber(prev => prev - 1)
  }

  const handleNext = () => {
    if (canNextPage) setPageNumber(prev => prev + 1)
  }

  const handleSearch = (e) => {
    setPageNumber(1)
    setSearch(e.target.value)
  }
   const deleteProductHook = useDeleteOneProduct()
      const [deleteId, setDeleteId] = useState(null)
  
      const handleDelete = () => {
          deleteProductHook.mutate(
              deleteId,
              {
                  onSuccess: () => {
                      setDeleteId(null)
                  }
              }
          )
      }


return (
  <div className="w-full h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col overflow-hidden">
    <DeleteModal
      isOpen={deleteId}
      onClose={() => setDeleteId(null)}
      onConfirm={handleDelete}
      title="Delete Confirmation"
      description="Are you sure you want to delete"
    />

    <div className="w-full h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white shadow-2xl rounded-3xl p-8 transition-transform hover:scale-[1.01] duration-300 min-h-full">
          
          {/* Heading with Add Button */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <FaBox className="text-red-500 text-3xl" />
              <h2 className="text-3xl font-extrabold text-gray-800">Product Table</h2>
            </div>
            <Link to="/admins/productss/create">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-md"
                title="Add Product"
              >
                <FaPlus className="text-white" /> Add
              </button>
            </Link>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Show</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Search:</label>
              <input
                onChange={handleSearch}
                value={search}
                type="text"
                placeholder="Search products..."
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-inner max-h-[calc(100vh-250px)]">
            <table className="min-w-full table-auto rounded-xl overflow-hidden">
              <thead className="bg-red-500 text-white text-sm uppercase">
                <tr>
                  <th className="py-4 px-6 text-left">Name</th>
                  <th className="py-4 px-6 text-left">Price</th>
                  <th className="py-4 px-6 text-left">Image</th>
                  <th className="py-4 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
                {products.map((row) => (
                  <tr key={row._id} className="hover:bg-indigo-50 transition duration-200">
                    <td className="py-4 px-6 font-medium">{row.name}</td>
                    <td className="py-4 px-6">Rs {row.price}</td>
                    <td className="py-4 px-6">
                      <img
                        className="w-16 h-16 rounded-xl border shadow-sm object-cover"
                        src={getBackendImageUrl(row.productImage)}
                        alt={row.name}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-3">
                        <Link to={`/admins/products/${row._id}`}>
                          <button
                            title="View"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm shadow-md"
                          >
                            <FaEye /> View
                          </button>
                        </Link>
                        <Link to={`/admins/products/${row._id}/edit`}>
                          <button
                            title="Edit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm shadow-md"
                          >
                            <FaEdit /> Edit
                          </button>
                        </Link>
                        <button
                          title="Delete"
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm shadow-md"
                          onClick={() => setDeleteId(row._id)}
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

          {/* Pagination */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={!canPreviousPage}
              className={`px-4 py-2 rounded-md text-sm font-medium shadow ${
                canPreviousPage
                  ? "bg-indigo-500 text-white hover:bg-indigo-600"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              ← Previous
            </button>

            <span className="text-sm text-gray-700">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={!canNextPage}
              className={`px-4 py-2 rounded-md text-sm font-medium shadow ${
                canNextPage
                  ? "bg-indigo-500 text-white hover:bg-indigo-600"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
