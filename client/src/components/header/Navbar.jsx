import React, { useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-indigo-700 to-indigo-500 shadow-md py-3">
      <div className="container mx-auto relative px-4 flex items-center justify-between text-white">
        <a href="/" className="uppercase text-xl">
          Achhaya's Invoice Generator
        </a>
        <nav>
          <ul
            className={`md:flex hidden space-x-16 md:space-x-6 ${
              isMobileMenuOpen ? "" : "hidden"
            } md:block`}
          >
            <li>
              <a
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Invoices
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Pricing
              </a>
            </li>
          </ul>
        </nav>

        {/* <div
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="cursor-pointer pr-4 text-white md:hidden"
        >
          {isMobileMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div> */}

        {/* {isMobileMenuOpen && (
          <ul className="flex flex-col justify-center items-center fixed top-12 left-0 w-full h-screen bg-gradient-to-b from-indigo-700 to-indigo-500 text-white text-5xl space-y-10">
            <li>
              <a
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Invoices
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Pricing
              </a>
            </li>
          </ul>
        )} */}
      </div>
    </header>
  );
};

export default Navbar;
