import React, { useEffect, useState } from "react";
import { useWishlist } from "../pages/wishlistContent";
import { getBackendImageUrl } from "../utils/backend-image";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cartContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, updateQuantity } = useWishlist();
  const [userName, setUserName] = useState("Your");
  const { addToCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUserName(storedUser.name.split(" ")[0]);
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white p-6 overflow-y-auto">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        onClick={() => navigate(-1)}
      >
        ✕
      </button>

      <h2 className="text-3xl font-bold mb-8">{userName}'s Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">No items in wishlist.</p>
      ) : (
        <div className="space-y-12">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="flex flex-col md:flex-row gap-6 items-start md:items-center"
            >
              <div className="w-[300px] h-[300px] bg-gray-100 rounded overflow-hidden">
                <img
                  src={getBackendImageUrl(product.filepath)}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => navigate(`/products/${product._id}`)}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 space-y-3">
                <div
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="cursor-pointer"
                >
                  <h3 className="text-xl font-medium">{product.name}</h3>
                  <p className="text-md mt-1">Rs. {product.price}</p>
                </div>

                {/* Quantity Buttons */}
                <div className="flex items-center space-x-3 mt-3">
                  <button
                    disabled={(product.quantity || 1) <= 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(product._id, -1);
                    }}
                    className={`px-3 py-1 border text-lg rounded-sm ${
                      (product.quantity || 1) <= 1
                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                        : "text-black border-black hover:bg-gray-100"
                    }`}
                  >
                    –
                  </button>
                  <span className="w-8 text-center">
                    {product.quantity || 1}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(product._id, 1);
                    }}
                    className="px-3 py-1 border border-black text-lg rounded-sm hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex items-center space-x-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product); // move to cart
                      removeFromWishlist(product._id); // remove from wishlist
                    }}
                    className="bg-red-500 text-white py-2 px-12 rounded-full hover:bg-indigo-600 transition"
                  >
                    Move To Bag
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(product._id);
                    }}
                    className="text-sm text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
