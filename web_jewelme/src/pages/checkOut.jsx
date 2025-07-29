import React, { useState } from "react";
import { useCart } from "../pages/cartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { getBackendImageUrl } from "../utils/backend-image";

const provinces = [
  "Koshi Province",
  " Madesh Province",
  "Bagmati Province",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province",
  "Sudurpashchim Province",
];

const Checkout = () => {
  const { cartItems, removeFromCart } = useCart();
  const [location, setLocation] = useState("");
  const [landmark, setLandmark] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showModal, setShowModal] = useState(false);
  const [orderSnapshot, setOrderSnapshot] = useState([]);
  const navigate = useNavigate();

  const calculateTotal = (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOrder = () => {
    if (!location || !landmark) {
      alert("Please fill all required fields.");
      return;
    }

    // Capture a snapshot of current cart for modal before clearing it
    const snapshot = [...cartItems];
    setOrderSnapshot(snapshot);
    setShowModal(true);

    // Clear the cart
    snapshot.forEach((item) => removeFromCart(item._id));
  };

  const handleClose = () => {
    setShowModal(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Checkout
        </h2>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-7"
            >
              <div className="flex items-center gap-4">
                <img
                  src={getBackendImageUrl(item.filepath)}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-red-600">
                Rs. {item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label className="block font-medium mb-1">Select Province</label>
          <select
            className="w-full border rounded px-4 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="">Select a province</option>
            {provinces.map((prov, idx) => (
              <option key={idx} value={prov}>
                {prov}
              </option>
            ))}
          </select>
          <label className="block font-medium mt-4 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border rounded px-4 py-2"
            placeholder="New Baneshwor"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label className="block font-medium mt-4 mb-1">
            Landmark <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border rounded px-4 py-2"
            placeholder="e.g., Near Bhatbhateni, Opp. to school"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            required
          />

          <label className="block font-medium mt-4 mb-1">Payment Method</label>
          <select
            className="w-full border rounded px-4 py-2"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Cash on Delivery</option>
            <option value="esewa">eSewa</option>
            <option value="khalti">Khalti</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-bold">
            Total: Rs. {calculateTotal(cartItems)}
          </p>
          <button
            onClick={handleOrder}
            className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-all duration-200"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Order Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative text-center"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                onClick={handleClose}
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Order Successful!
              </h2>
              <p className="text-gray-700 mb-2">Thank you for your order.</p>

              <div className="text-left mt-4 space-y-2">
                <p>
                  <strong>Province:</strong> {location}
                </p>
                <p>
                  <strong>Address:</strong> {address}
                </p>
                <p>
                  <strong>Landmark:</strong> {landmark}
                </p>
                <p>
                  <strong>Payment Method:</strong> {paymentMethod}
                </p>
                <p>
                  <strong>Total Paid:</strong> Rs.{" "}
                  {calculateTotal(orderSnapshot)}
                </p>
              </div>

              <div className="mt-4 text-left max-h-60 overflow-y-auto">
                <h3 className="font-semibold mb-2">Ordered Items:</h3>
                {orderSnapshot.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 mb-3">
                    <img
                      src={getBackendImageUrl(item.filepath)}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Rs. {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
