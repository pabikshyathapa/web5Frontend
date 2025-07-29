import React, { useState, useEffect } from "react";
import { useAllCartItems } from "../hooks/useCart";
import { getBackendImageUrl } from "../utils/backend-image";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyBag = () => {
  const { data: fetchedItems = [], isLoading, isError, error } = useAllCartItems();
  const navigate = useNavigate();

  // Local cart state with default quantity = 1 if missing
  const [cartItems, setCartItems] = useState([]);

  // Selected item IDs for checkout
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (fetchedItems.length > 0) {
      const initialized = fetchedItems.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1,
      }));
      setCartItems(initialized);
      setSelectedItems(initialized.map((item) => item._id || item.productId)); // select all by default
    } else {
      setCartItems([]);
      setSelectedItems([]);
    }
  }, [fetchedItems]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    toast.error(error?.message || "Failed to load cart");
    return <div>Error loading cart</div>;
  }

  // Update quantity locally
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        (item._id || item.productId) === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item locally & from selection
  const handleRemove = (itemId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setCartItems((items) => items.filter((item) => (item._id || item.productId) !== itemId));
      setSelectedItems((ids) => ids.filter((id) => id !== itemId));
    }
  };

  // Toggle item selection
  const handleSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // Calculate total price only for selected items
  const total = cartItems
    .filter((item) => selectedItems.includes(item._id || item.productId))
    .reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.warn("Please select at least one item to checkout");
      return;
    }
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item._id || item.productId)
    );
    // Navigate to checkout page with selected items
    navigate("/checkout", { state: { selectedItems: selectedProducts } });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 flex items-center gap-2">
        <span role="img" aria-label="cart">
          
        </span>{" "}
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center text-lg py-20">No items in the cart.</p>
      ) : (
        <>
          <div className="space-y-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {cartItems.map((item) => {
              const id = item._id || item.productId;
              const isSelected = selectedItems.includes(id);
              return (
                <div
                  key={id}
                  className={`flex gap-5 items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${
                    isSelected ? "bg-indigo-50" : "bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelect(id)}
                    className="h-5 w-5 cursor-pointer"
                    aria-label={`Select ${item.name}`}
                  />
                  <img
                    src={getBackendImageUrl(item.filepath)}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                    onClick={() => navigate(`/products/${id}`)}
                  />
                  <div className="flex-grow cursor-pointer" onClick={() => navigate(`/products/${id}`)}>
                    <h2 className="font-semibold text-lg text-gray-900">{item.name}</h2>
                    <p className="text-gray-600 mt-1">
                      Price: <span className="font-medium">Rs.{item.price}</span>
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(id, item.quantity - 1);
                        }}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{item.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(id, item.quantity + 1);
                        }}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(id);
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between items-center border-t pt-6">
            <div className="text-2xl font-bold text-gray-900">
              Total ({selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""}): Rs.{total.toFixed(2)}
            </div>
            <button
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition ${
                selectedItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyBag;
