import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaSignOutAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-red-50 items-center justify-center p-6">
      <main className="flex flex-col items-center justify-center w-full">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-2xl">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-28 h-28 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-4xl mb-3">
              <FaUser />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Welcome, {user.name || 'User'}</h2>
          </div>

          {/* Profile Details */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
                <FaUser className="mr-2 text-gray-400" />
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="bg-transparent w-full focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
                <FaEnvelope className="mr-2 text-gray-400" />
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="bg-transparent w-full focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Phone</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
                <FaPhone className="mr-2 text-gray-400" />
                <input
                  type="tel"
                  value={user.phone}
                  readOnly
                  className="bg-transparent w-full focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-red-500 text-white py-3 rounded-md shadow hover:bg-red-600 flex items-center justify-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
