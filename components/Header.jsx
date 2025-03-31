"use client";
import { AuthContext } from "@/lib/context/auth-context";
import React, { use, useContext } from "react";
import { IoMdStats } from "react-icons/io";

const Header = () => {
  const { user, loading, logout } = useContext(AuthContext);
  return (
    <header className="container max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between">
        {user && !loading && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={user.photoURL}
                  alt={user.displayName}
                />
              </div>
              <div>Hi, {user.displayName}</div>
            </div>

            <nav className="flex items-center gap-2">
              <div>
                <a href="#stats">
                  <IoMdStats className="text-2xl" />
                </a>
              </div>
              <div>
                <button onClick={logout} className="btn btn-danger">
                  Logout
                </button>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
