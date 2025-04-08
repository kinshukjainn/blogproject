const Footer = () => {
  return (
    <footer className="w-full px-6 py-6 bg-[#272822] text-[#f8f8f2] border-t border-[#49483e]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <div className="text-center sm:text-left">
          <p className="text-sm sm:text-base text-[#a6e22e] font-semibold">
            © {new Date().getFullYear()} Cloud Kinshuk. All rights reserved.
          </p>
          <p className="text-xs text-white font-bold">
            Learn and build new things !!! .
          </p>
        </div>
        <div className="flex space-x-4 text-sm">
          <a
            href="https://cloudkinshuk.dev"
            className="text-[#66d9ef] hover:text-[#fd971f] transition-colors"
          >
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
