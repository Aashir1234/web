import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // useLocation to detect current path

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation(); // Get the current route

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Conditionally render the navbar links based on the current page
  const isBlogPage = location.pathname.includes("/blog");

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            <span className="sm:block hidden">Mutanx Technologies</span>
          </p>
        </Link>

        {/* Render navbar items (visible only on larger screens) */}
        <ul className="list-none sm:flex hidden flex-row gap-10">
          {isBlogPage ? (
            // Show 'Home' link only on the Blog page
            <li
              className="text-secondary hover:text-white text-[19px] font-medium cursor-pointer"
              onClick={() => setActive("Home")}
            >
              <Link to="/" onClick={() => setActive("")}>
                Home
              </Link>
            </li>
          ) : (
            navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[19px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                <a
                  href={`${nav.id !== "blog" ? "#" : ""}${nav.id}`}
                  target={`${nav.id === "blog" ? "_self" : ""}`}
                >
                  {nav.title}
                </a>
              </li>
            ))
          )}
        </ul>

        {/* Hamburger menu for mobile (visible only on smaller screens) */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          {toggle && (
            <div className="p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl">
              <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                {isBlogPage ? (
                  <li
                    className="font-poppins font-medium cursor-pointer text-[16px] text-secondary hover:text-white"
                    onClick={() => {
                      setToggle(false);
                      setActive("Home");
                    }}
                  >
                    <Link to="/" onClick={() => setActive("")}>
                      Home
                    </Link>
                  </li>
                ) : (
                  navLinks.map((nav) => (
                    <li
                      key={nav.id}
                      className={`font-poppins font-medium cursor-pointer text-[16px] ${
                        active === nav.title ? "text-white" : "text-secondary"
                      }`}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.title);
                      }}
                    >
                      <a
                        href={`${nav.id !== "blog" ? "#" : ""}${nav.id}`}
                        target={`${nav.id === "blog" ? "_self" : ""}`}
                      >
                        {nav.title}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
