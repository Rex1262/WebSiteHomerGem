import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import img from "/Homer.svg";

function NavBar() {
  const location = useLocation();
  // Function to determine if a link is active
  const isLinkActive = (pathname) => {
    return location.pathname === pathname;
  };
  return (
    <nav id="navbar">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2  sm:p-4 flex-col gap-5 lg:flex-row">
        <Link to="/" className="flex items-center">
          <img src={img} className="h-24 mr-3" alt="BART Logo" />
          <span
            id="navText"
            className="self-center text-2xl sm:text-5xl font-semibold whitespace-nowrap"
          >
            HomerGem
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-5">
          <Link
            to="/"
            className={`border border-[#1E202B] bg-transparent font-semibold text-[#141414] ${
              isLinkActive("/")
                ? "text-[#f6e58d] !bg-[#1E202B]"
                : "hover:text-[#f6e58d]"
            } hover:border-transparent hover:bg-[#1E202B] rounded-full px-4 py-2`}
          >
            Home
          </Link>
          <Link
            to="/roadmap"
            className={`border border-[#1E202B] bg-transparent font-semibold text-[#141414] ${
              isLinkActive("/roadmap")
                ? "text-[#f6e58d] !bg-[#1E202B]"
                : "hover:text-[#f6e58d]"
            } hover:border-transparent hover:bg-[#1E202B] rounded-full px-4 py-2`}
          >
            Road Map
          </Link>
          <Link
            to="/founders"
            className={`border border-[#1E202B] bg-transparent font-semibold text-[#141414] ${
              isLinkActive("/founders")
                ? "text-[#f6e58d] !bg-[#1E202B]"
                : "hover:text-[#f6e58d]"
            } hover:border-transparent hover:bg-[#1E202B] rounded-full px-4 py-2`}
          >
            Founders
          </Link>
          <Link
            to="/staking"
            className={`border border-[#1E202B] bg-transparent font-semibold text-[#141414] ${
              isLinkActive("/staking")
                ? "text-[#f6e58d] !bg-[#1E202B]"
                : "hover:text-[#f6e58d]"
            } hover:border-transparent hover:bg-[#1E202B] rounded-full px-4 py-2`}
          >
            Staking
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
