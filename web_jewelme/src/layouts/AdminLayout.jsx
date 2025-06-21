import { Outlet, NavLink } from "react-router-dom";

import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";

export default function AdminLayout() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="flex h-screen">
            <aside className="w-64 shadow-lg p-4">
                <h2 className="text-xl  font-bold mb-6">Admin Panel</h2>
                <nav className="flex flex-col space-y-3 ">
                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            `${
                                isActive
                                    ? "text-red-600 font-semibold"
                                    : "text-gray-700 hover:text-red-500"
                            } text-white block`
                        }
                    >
                        Users
                    </NavLink>
                    <NavLink
                        to="/admin/products"
                        className={({ isActive }) =>
                            `${
                                isActive
                                    ? "text-red-600 font-semibold"
                                    : "text-gray-700 hover:text-red-500"
                            } text-white block`
                        }
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/admin/categories"
                        className={({ isActive }) =>
                            `${
                                isActive
                                    ? "text-red-600 font-semibold"
                                    : "text-gray-700 hover:text-red-500"
                            } text-white block`
                        }
                    >
                        Categories
                    </NavLink>
                </nav>
            </aside>
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="shadow-md px-6 py-4 flex justify-between items-center">
                    <span className="text-lg font-medium">
                        Welcome, {user?.username || "Admin"}
                    </span>
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </header>

                {/* Content area */}
                <main className="p-6 overflow-y-auto flex-1">
                    <Outlet />
                </main>
                <footer className="text-center">
                    2025 @ My App
                </footer>
            </div>
        </div>
    );
}