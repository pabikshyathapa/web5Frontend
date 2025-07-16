import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/publicProductApi";
import { getBackendImageUrl } from "../utils/backend-image";
import {
  FaHeart,
  FaUserCircle,
  FaShoppingBag,
  FaInstagram,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "./cartContext";
import CartDrawer from "../components/cartDrawer";

export default function UserProductList() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({}); // Track favorited products by id
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleDrawer = () => {
    setCartOpen((prev) => !prev);
  };
  // Toggle favorite for product id
  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div className="font-serif">
      {/* Header */}
      <header
        className="flex justify-between items-center p-4 border-b"
        style={{ backgroundColor: "#FFFEF9" }}
      >
        <div className="w-32">
          <img
            src="/images/splash.png"
            alt="JewelMe Logo"
            className="w-full h-auto"
          />
        </div>

        <nav className="space-x-6 text-sm">
          {["/", "/shop", "/pages", "/about"].map((path, idx) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-red-500"
                  : "text-black hover:text-red-500 transition-colors duration-300"
              }
            >
              {["Home", "Shop", "Pages", "About us"][idx]}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-2xl">
          <Link
            to="/profile"
            title="Profile"
            className="text-red-500 hover:text-black transition-colors duration-200"
          >
            <FaUserCircle />
          </Link>
          <Link
            to="#"
            title="Bag"
            onClick={toggleDrawer}
            className="text-red-500 hover:text-black transition-colors duration-200"
          >
            <FaShoppingBag />
          </Link>

          <Link
            to="/wishlist"
            title="Wishlist"
            className="text-red-500 hover:text-black transition-colors duration-200"
          >
            <FaHeart />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <motion.div
        className="w-full h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/homepagee.png')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Product Grid */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-6 py-12">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
          Shop Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const isFavorited = favorites[product._id] || false;

            return (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="relative group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Favorite Icon */}
                <button
                  className={`absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-lg transition-colors duration-300
                 ${
                   isFavorited
                     ? "text-red-500"
                     : "text-gray-400 hover:text-red-500"
                 }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product._id);
                  }}
                >
                  <FaHeart size={18} /> {/* Increased heart size */}
                </button>

                {/* Product Image */}
                <img
                  src={getBackendImageUrl(product.filepath)}
                  alt={product.name}
                  className="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Product Info */}
                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-md text-gray-600">Rs. {product.price}</p>
                  <p className="text-sm text-gray-500">
                    Category: {product.categoryId?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    In Stock: {product.stock}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {product.description || "No description available"}
                  </p>

                  <div className="pt-3">
                    <motion.button
                      whileTap={{ scale: 0.12, rotate: -12 }} // tap feedback motion
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 rounded-xl shadow-md hover:from-pink-600 hover:to-red-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product); // your logic here
                      }}
                    >
                      Add to Bag
                    </motion.button>
                    {/* <button
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 rounded-xl shadow-md hover:from-pink-600 hover:to-red-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-300"
                     onClick={(e) => {
                     e.stopPropagation();
                     addToCart(product);
                      }}

                    >
                      Add to Bag
                    </button> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-red-300 text-black px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
        <div>
          <h4 className="text-lg font-bold mb-3 tracking-wide">
            Stay Connected
          </h4>
          <p className="leading-relaxed">
            Discover exclusive offers, early access to new collections, style
            inspiration, and personalized recommendations just for you.
          </p>
        </div>

        <div>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Help</li>
            <li className="hover:underline cursor-pointer">
              Shipping and Return
            </li>
            <li className="hover:underline cursor-pointer">Guide</li>
            <li className="hover:underline cursor-pointer">Our Story</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-3 tracking-wide">Contact Us</h4>
          <p className="mb-2">123456789</p>
          <p>Follow us on:</p>
          <div className="flex items-center gap-4 mt-2">
            <FaInstagram className="text-xl hover:scale-110 hover:text-white transition-all duration-200 cursor-pointer" />
            <FaFacebook className="text-xl hover:scale-110 hover:text-white transition-all duration-200 cursor-pointer" />
            <FaTiktok className="text-xl hover:scale-110 hover:text-white transition-all duration-200 cursor-pointer" />
          </div>
          <p className="mt-2 text-xs font-bold text-black">@Jewelmeeveryday</p>
        </div>
      </footer>
      <CartDrawer isOpen={isCartOpen} onClose={toggleDrawer} />
    </div>
  );
}

// import React, { useContext, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { FaInstagram, FaFacebook, FaTiktok, FaHeart, FaChevronRight,
//  FaUserCircle, FaShoppingBag, FaChevronLeft } from 'react-icons/fa';
// import { Link, NavLink } from 'react-router-dom';
// import { AuthContext } from '../auth/AuthProvider';

// const categories = [
//   { name: 'Jhumka', img: '/images/jhumka1.jpg' },
//   { name: 'Necklaces', img: '/images/necklace1.jpg' },
//   { name: 'Hoops', img: '/images/heartear.jpg' },
//   { name: 'Gold Rings', img: '/images/ring.jpg' },
//   { name: 'Vintage Watch', img: '/images/watch.jpg' },
//   { name: 'Diamond Rings', img: '/images/dia.jpg' },
//   { name: 'Bracelets', img: '/images/bracelet2.jpg' },
// ];

// const catalogImages = [
//   '/images/bracelet2.jpg',
//   '/images/dia.jpg',
//   '/images/necklace3.jpg',
//   '/images/watch.jpg',
//   '/images/dia.jpg',
//   '/images/necklace3.jpg',
//   '/images/watch.jpg',
// ];

// export default function JewelMeHome() {
//   const { user, logout } = useContext(AuthContext);
//   const scrollRef = useRef(null);

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
//   };

//   return (
//     <div className="font-serif">
//       {/* Header */}
//       <header className="flex justify-between items-center p-4 border-b" style={{ backgroundColor: '#FFFEF9' }}>
//         <div className="w-32">
//           <img src="/images/splash.png" alt="JewelMe Logo" className="w-full h-auto" />
//         </div>

//         <nav className="space-x-6 text-sm">
//           {['/', '/shop', '/pages', '/about'].map((path, idx) => (
//             <NavLink
//               key={path}
//               to={path}
//               className={({ isActive }) =>
//                 isActive ? 'text-red-500' : 'text-black hover:text-red-500 transition-colors duration-300'
//               }
//             >
//               {['Home', 'Shop', 'Pages', 'About us'][idx]}
//             </NavLink>
//           ))}
//         </nav>

//      <div className="flex items-center gap-4 text-2xl">
//   <Link to="/profile" title="Profile" className="text-red-500 hover:text-black transition-colors duration-200">
//     <FaUserCircle />
//   </Link>

//   <Link to="/cart" title="Cart" className="text-red-500 hover:text-black transition-colors duration-200">
//     <FaShoppingBag />
//   </Link>

//   <Link to="/wishlist" title="Wishlist" className="text-red-500 hover:text-black transition-colors duration-200">
//     <FaHeart />
//   </Link>
// </div>

//       </header>

//       {/* Hero */}
//       <motion.div
//         className="w-full h-[600px] bg-cover bg-center"
//         style={{ backgroundImage: "url('/images/homepagee.png')" }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       />

//       {/* Categories Section */}
//       <section className="py-10 bg-[linear-gradient(to_right,_#fef6f9,_#f0f4ff,_#f6fff9)]">
//         <motion.h2
//           className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 tracking-wide"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, type: 'spring' }}
//         >
//           Categories
//         </motion.h2>

//         <div className="flex justify-center flex-wrap gap-6 px-4">
//           {categories.map((cat, i) => (
//             <motion.div
//               key={cat.name}
//               className="text-center text-black cursor-pointer"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               whileHover={{ scale: 1.05, y: -5 }}
//               transition={{ type: 'spring', stiffness: 300, delay: i * 0.1 }}
//             >
//               <img src={cat.img} alt={cat.name} className="w-48 h-48 object-cover rounded-full shadow-lg mx-auto" />
//               <p className="mt-3 font-semibold text-lg text-gray-700">{cat.name}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Best Sellers Section */}
//       <section className="bg-[#f4f1ed] p-8 relative">
//         <motion.h2
//           className="text-4xl font-bold text-gray-800 mb-6 text-center"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: 'easeOut' }}
//         >
//           Best Sellers
//         </motion.h2>

//         {/* Scroll Buttons */}
//         <button
//           onClick={scrollLeft}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
//         >
//           <FaChevronLeft className="text-xl text-gray-700" />
//         </button>

//         <button
//           onClick={scrollRight}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
//         >
//           <FaChevronRight className="text-xl text-gray-700" />
//         </button>

//         {/* Scrollable Images */}
//         <div
//           ref={scrollRef}
//           className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth px-1 pb-2 h-80"
//           style={{
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none',
//           }}
//         >
//           {catalogImages.map((img, i) => (
//             <motion.div
//               key={i}
//               className="relative min-w-[200px] h-80 rounded-lg overflow-hidden shadow-lg flex-shrink-0 will-change-transform"
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: 'spring', stiffness: 300 }}
//               style={{ scrollbarWidth: 'none' }}
//             >
//               <img src={img} alt={`Catalog ${i}`} className="w-full h-full object-cover" />
//               <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow hover:text-red-500 transition text-gray-700">
//                 <FaHeart />
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Spring Catalog Section */}
//       <section className="relative bg-[url('/images/beachimg.jpg')] bg-cover bg-center h-[800px] md:h-[800px] w-full text-center text-white">
//         <div className="max-w-4xl mx-auto px-6 flex flex-col justify-center h-full">
//           <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6">Summer Catalog</h1>
//           <a
//             href="#"
//             className="text-xl md:text-5xl font-medium text-gray-700 hover:text-white inline-flex items-center justify-center gap-2"
//           >
//             View Now <span className="text-3xl">→</span>
//           </a>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-red-300 text-black px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
//         <div>
//           <h4 className="text-lg font-bold mb-3 tracking-wide">Stay Connected</h4>
//           <p className="leading-relaxed">
// Discover exclusive offers, early access to new collections, style inspiration, and personalized recommendations just for you.</p>
//         </div>

//         <div>
//           <ul className="space-y-2">
//             <li className="hover:underline cursor-pointer">Help</li>
//             <li className="hover:underline cursor-pointer">Shipping and Return</li>
//             <li className="hover:underline cursor-pointer">Guide</li>
//             <li className="hover:underline cursor-pointer">Our Story</li>
//           </ul>
//         </div>

//         <div>
//           <h4 className="text-lg font-bold mb-3 tracking-wide">Contact Us</h4>
//           <p className="mb-2">123456789</p>
//           <p>Follow us on:</p>
//           <div className="flex items-center gap-4 mt-2">
//             <FaInstagram className="text-2xl hover:scale-110 hover:text-white transition-all duration-200 cursor-pointer" />
//             <FaFacebook className="text-2xl hover:scale-110 hover:text-white transition-all duration-200 cursor-pointer" />
//             <FaTiktok className="text-2xl hover:scale-110 hover:text-white transition-all duration-200 cursor-pointer" />
//           </div>
//           <p className="mt-2 text-xs font-bold text-black">@Jewelmeeveryday</p>
//         </div>
//       </footer>
//     </div>
//   );
// }
