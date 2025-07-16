import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getBackendImageUrl } from '../utils/backend-image'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:5050/api/products/${id}`)
      .then(res => {
        setProduct(res.data.data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching product:", err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="p-10 text-center text-gray-600">Loading product...</div>
  if (!product) return <div className="p-10 text-center text-red-500">Product not found.</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-6 py-12 flex justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-10">
        
        {/* Left Side: Image */}
        <div className="w-full md:w-3/5 h-full flex items-start">
          <img
            src={getBackendImageUrl(product.filepath)}
            alt={product.name}
            className="w-full h-full max-h-[600px] object-cover rounded-2xl shadow-md transition-transform duration-500 hover:scale-105 cursor-zoom-in"
          />
        </div>

        {/* Right Side: Info */}
        <div className="w-full md:w-2/5 flex flex-col justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-2">{product.name}</h1>
            <p className="text-xl text-red-600 font-bold mb-4">Rs. {product.price}</p>
            <p className="text-base text-gray-700 mb-2">{product.description || "No description available."}</p>
            <p className="text-sm text-gray-600">In Stock: <strong>{product.stock}</strong></p>
            <p className="text-sm text-gray-600">Category: {product.categoryId?.name || "N/A"}</p>
          </div>

          <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-3 rounded-xl shadow-md hover:from-pink-600 hover:to-red-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-300">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}
