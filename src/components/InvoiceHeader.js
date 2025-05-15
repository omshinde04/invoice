import React, { useRef } from 'react';

function InvoiceHeader({ company }) {
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.classList.toggle('hidden');
      // You might want to toggle an 'open' class on the hamburger for styling later
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-md p-4 flex items-center justify-between relative">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <span className="font-bold text-xl">Your Logo/Text</span>
        </a>

        {/* Navbar Links for Desktop */}
        <ul className="hidden md:flex space-x-6 ml-auto">
          <li><a href="/" className="hover:text-blue-300 transition duration-300">Home</a></li>
          <li><a href="/" className="hover:text-blue-300 transition duration-300">About</a></li>
          <li><a href="/" className="hover:text-blue-300 transition duration-300">Get Started</a></li>
        </ul>

        {/* Hamburger Icon for Mobile */}
        <button ref={hamburgerRef} onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        <ul
          ref={mobileMenuRef}
          id="mobile-menu"
          className="absolute bg-blue-600 text-white hidden top-12 left-0 w-full flex-col space-y-4 p-4 transition-all duration-300 transform -translate-y-full opacity-0"
        >
          <li><a href="/" className="hover:text-blue-300 transition duration-300">Home</a></li>
          <li><a href="/" className="hover:text-blue-300 transition duration-300">About</a></li>
          <li><a href="/" className="hover:text-blue-300 transition duration-300">Get Started</a></li>
        </ul>
      </nav>

      {/* Header with Dynamic Company Info (remains the same) */}
      <header className="bg-white p-8 shadow-lg w-full">
        <div className="text-left w-full space-y-4 mb-8">
          <h1 className="text-black text-4xl font-bold mb-4">{company.name}</h1>
          {company.address && <p className="text-gray-600 text-lg">{company.address}</p>}
          {company.mobile_no && <p className="text-gray-600 text-lg">Mob No.: {company.mobile_no}</p>}
          {company.email && <p className="text-gray-600 text-lg">E-mail: {company.email}</p>}
          {company.website && <p className="text-gray-600 text-lg">Website: {company.website}</p>}
        </div>

        <div className="flex flex-col lg:flex-row justify-between text-gray-700 text-lg space-y-4 lg:space-y-0">
          {company.gstin && (
            <p className="font-semibold lg:w-1/2">
              GSTIN: <span className="font-normal">{company.gstin}</span>
            </p>
          )}
          {company.gstin && (
            <p className="font-semibold lg:w-1/2 lg:text-right">
              GST Identification Number: <span className="font-normal">{company.gstin}</span>
            </p>
          )}
        </div>
      </header>
    </>
  );
}

export default InvoiceHeader;