"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

export const Header = () => {
  const { token, email, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b shadow bg-white relative">
      <Link href="/" className="text-black-600 no-underline">
        <h1 className="text-xl font-bold">🚆 Train Schedule App</h1>
      </Link>

      <div className="mr-[50px]">
        {token ? (
          <>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold hover:bg-blue-700 transition"
            >
              {email?.charAt(0).toUpperCase()}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};
