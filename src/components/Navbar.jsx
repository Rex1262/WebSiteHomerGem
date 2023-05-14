import img from "/Homer.svg";

function NavBar() {
  return (
    <nav id='navbar'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='#' className='flex items-center'>
          <img src={img} className='h-24 mr-3' alt='BART Logo' />
          <span
            id='navText'
            className='self-center text-5xl font-semibold whitespace-nowrap'
          >
            Homer Gem
          </span>
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
