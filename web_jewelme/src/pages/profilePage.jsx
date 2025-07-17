import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    localStorage.removeItem('user'); // or clear auth token
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>

        <div className="space-y-4 text-left">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone}</p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
