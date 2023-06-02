import React, { useEffect, useState } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import img from "/Homer.svg";

const Navbar = () => {
  const location = useLocation();

  const isLinkActive = (pathname) => {
    return location.pathname === pathname;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [dynamicRoute, setDynamicRoute] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setDynamicRoute(location.pathname.includes("coin/"));
  }, [location.pathname]);
  return (
    <nav
      id="navbar"
      className="flex items-center justify-between flex-wrap py-4 px-2 lg:py-6 lg:px-6"
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6 ">
        <Link to="/" className="flex items-center">
          <img src={img} className="h-16 lg:h-24 mr-3" alt="BART Logo" />
          <span
            id="navText"
            className="self-center text-2xl lg:text-5xl font-semibold whitespace-nowrap"
          >
            HomerGem
          </span>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-5 w-5 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-5 w-5 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block  lg:flex lg:items-center lg:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col gap-3 items-center lg:flex-row pt-6 pb-3 lg:mt-0">
          <Link
            to="/"
            className={`w-full lg:w-auto text-center border border-[#1E202B] bg-transparent font-semibold text-[#141414] ${
              isLinkActive("/")
                ? "text-[#f6e58d] !bg-[#1E202B]"
                : "hover:text-[#f6e58d]"
            } hover:border-transparent hover:bg-[#1E202B] rounded-full px-4 py-2`}
          >
            Home
          </Link>
          <Link
            to="/roadmap"
            className={`w-full lg:w-auto  text-center  border border-[#1E202B] bg-transparent font-semibold text-[#141414] ${
              isLinkActive("/roadmap")
                ? "text-[#f6e58d] !bg-[#1E202B]"
                : "hover:text-[#f6e58d]"
            } hover:border-transparent hover:bg-[#1E202B] rounded-full px-4 py-2`}
          >
            Road Map
          </Link>
          <Link
            to="/founders"
            className={`w-full lg:w-auto  text-center   border border-[#1E202B] bg-transparent font-semibold text-[#141414] ${
              isLinkActive("/founders")
                ? "text-[#f6e58d] !bg-[#1E202B]"
                : "hover:text-[#f6e58d]"
            } hover:border-transparent hover:bg-[#1E202B] rounded-full px-4 py-2`}
          >
            Founders
          </Link>
          <Link
            to="/staking"
            className={`w-full lg:w-auto  text-center   border border-[#1E202B] bg-transparent font-semibold text-[#141414] ${
              isLinkActive("/staking")
                ? "text-[#f6e58d] !bg-[#1E202B]"
                : "hover:text-[#f6e58d]"
            } hover:border-transparent hover:bg-[#1E202B] rounded-full px-4 py-2`}
          >
            Staking
          </Link>

          <Link
            to="/coinspage"
            className={`w-full lg:w-auto text-center border border-[#1E202B] bg-transparent font-semibold text-[#141414] ${
              isLinkActive("/coinspage") || dynamicRoute
                ? "text-[#f6e58d] !bg-[#1E202B]"
                : "hover:text-[#f6e58d]"
            } hover:border-transparent hover:bg-[#1E202B] rounded-full px-4 py-2`}
          >
            Coins Chart
          </Link>
        </div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
