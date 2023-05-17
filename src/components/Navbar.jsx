import img from "/homer.svg";

function NavBar() {
  return (
    <nav id="navbar">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 flex-col gap-5 lg:flex-row">
        <a href="#" className="flex items-center">
          <img src={img} className="h-24 mr-3" alt="BART Logo" />
          <span
            id="navText"
            className="self-center text-2xl sm:text-5xl font-semibold whitespace-nowrap"
          >
            Homer Gem
          </span>
        </a>
        <div className="flex items-center gap-5">
          <a
            href="#roadmap"
            className="border border-[#1E202B] bg-transparent font-semibold text-[#141414] hover:text-[#F9CA25] hover:border-transparent hover:bg-[#1E202B] rounded-full px-4 py-2"
          >
            Road Map
          </a>
          <a
            href="#founder"
            className="border border-[#1E202B] bg-transparent font-semibold text-[#141414] hover:text-[#F9CA25] hover:border-transparent hover:bg-[#1E202B] rounded-full px-4 py-2"
          >
            Founders
          </a>
          <a
            href="#staking"
            className="border border-[#1E202B] bg-transparent font-semibold text-[#141414] hover:text-[#F9CA25] hover:border-transparent hover:bg-[#1E202B] rounded-full px-4 py-2"
          >
            Stacking
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
