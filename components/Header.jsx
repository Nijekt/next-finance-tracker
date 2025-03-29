import React from "react";
import { IoMdStats } from "react-icons/io";

const Header = () => {
  return (
    <header className="container max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://thispersondoesnotexist.com"
              alt=""
            />
          </div>
          <div>Hi, Nikita</div>
        </div>

        <nav className="flex items-center gap-2">
          <div>
            <IoMdStats className="text-2xl" />
          </div>
          <div>
            <button className="btn btn-danger">Logout</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
