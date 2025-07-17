import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../../api/publicProductApi";
import { getBackendImageUrl } from "../../utils/backend-image";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../wishlistContent";
import { motion } from "framer-motion";
import { useCart} from "../cartContext";
export default function RingsPage() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const toggleFavorite = (product) => {
    const alreadyFavorited = isInWishlist(product._id);
    if (alreadyFavorited) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  useEffect(() => {
    fetchAllProducts()
      .then((res) => {
        const rings = res.data.filter(
          (product) => product.categoryId?.name?.toLowerCase() === "rings"
        );
        setProducts(rings);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
        Rings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/products/${product._id}`)}
            className="relative group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Heart Icon */}
            <button
              className={`absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-lg transition-colors duration-300 ${
                isInWishlist(product._id)
                  ? "text-red-500"
                  : "text-gray-400 hover:text-red-500"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(product);
              }}
            >
              <FaHeart size={18} />
            </button>

            <img
              src={getBackendImageUrl(product.filepath)}
              alt={product.name}
              className="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-md text-gray-600">Rs. {product.price}</p>
              <p className="text-sm text-gray-500">In Stock: {product.stock}</p>
              <p className="text-sm text-gray-500 truncate">
                {product.description || "No description available"}
              </p>

              <div className="pt-3">
                <motion.button
                  whileTap={{ scale: 0.12, rotate: -12 }}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 rounded-xl shadow-md hover:from-pink-600 hover:to-red-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Bag
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
