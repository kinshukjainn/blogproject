const Header = () => {
    return (
      <header className="w-full px-6 py-4 bg-[#272822] text-[#f8f8f2] shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#a6e22e]">
              Welcome To My Blogs !!!! 
            </h1>
            <p className="text-sm sm:text-base font-light mt-1 text-white font-semibold">
              Tech insights, cloud magic & dev journeys 🚀
            </p>
          </div>
          <nav className="mt-2 sm:mt-0">
            <ul className="flex space-x-4 text-sm sm:text-base">
              <li>
                <a
                  href="https://cloudkinshuk.in"
                  className="hover:underline font-bold  text-[#66d9ef] hover:text-[#fd971f] transition-colors"
                >
                  Portfolio Link
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  };
  
  export default Header;
  