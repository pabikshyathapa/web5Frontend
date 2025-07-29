import React from "react";
import { useUserCart } from "../hooks/useCart";
import { getBackendImageUrl } from "../utils/backend-image";
import { Link } from "react-router-dom";

export default function MyBag() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const {
    data: cartData,
    isLoading,
    isError,
    error,
  } = useUserCart(userId);

  // cartData is the full cart object with .products array inside
  const products = cartData?.products || [];

  console.log("📦 Cart data:", cartData);
  console.log("🧺 Products in cart:", products);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">👜 Your Bag</h1>

      {isLoading ? (
        <p>Loading your cart...</p>
      ) : isError ? (
        <p className="text-red-500">Error: {error?.message || "Unknown error"}</p>
      ) : products.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 text-lg">Your bag is empty.</p>
          <Link to="/" className="mt-4 inline-block text-red-500 hover:underline">
            🛍️ Shop now
          </Link>
        </div>
      ) : (
        <ul className="space-y-6">
          {products.map((item) => (
            <li key={item._id} className="flex items-center gap-4 border-b pb-4">
              <img
                src={getBackendImageUrl(item.filepath)}
                alt={item.name}
                className="w-24 h-24 object-cover rounded border"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">Rs. {item.price}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
