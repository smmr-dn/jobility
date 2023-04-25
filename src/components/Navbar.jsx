import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
const Navbar = () => {
    const [colorChange, setColorChange] = useState(false);
    const location = useLocation();

    const changeNavBarColor = () => {
        if (window.scrollY >= 80) setColorChange(true);
        else setColorChange(false);
    };

    window.addEventListener("scroll", changeNavBarColor);

    return (
        <nav
            className={`fixed py-4 flex items-center w-full justify-between top-0 z-10 ${
                colorChange
                    ? "bg-opacity-50 shadow-lg backdrop-blur-[2px] bg-white text-black"
                    : "bg-opacity-0 text-white"
            }`}
            style={{
                transition: "all .4s ease",
                WebkitTransition: "all .4s ease",
                MozTransition: "all .4s ease",
            }}
        >
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link to="/" className="flex items-center">
                    <img
                        src="../src/img/suitcase.png"
                        className="h-6 ml-2 mr-3 sm:h-9"
                        alt="Website Logo"
                    />
                    <span className="text-xl font-bold text-black uppercase font-sans-pro">
                        Jobility
                    </span>
                </Link>

                <div
                    className="flex items-center justify-center w-full px-3 md:w-auto"
                    id="navbar"
                >
                    <ul
                        className={`flex bg-black list-none md:flex-row items-center justify-center md:space-x-8 md:mt-0 md:text-base md:font-medium md:border-0 bg-transparent`}
                    >
                        <li>
                            <Link
                                to="/"
                                className={`pl-5 pr-4 ${
                                    location.pathname === "/"
                                        ? "text-cyan-700"
                                        : "text-black"
                                } uppercase rounded md:hover:bg-transparent hover:text-cyan-600 md:p-0`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/discussion"
                                className={`pl-5 pr-4 ${
                                    location.pathname.includes("/discussion")
                                        ? "text-cyan-700"
                                        : "text-black"
                                } uppercase rounded md:hover:bg-transparent hover:text-cyan-600 md:p-0`}
                            >
                                Discussion
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/articles"
                                className={`pl-5 pr-4 ${
                                    location.pathname === "/articles"
                                        ? "text-cyan-700"
                                        : "text-black"
                                } uppercase rounded md:hover:bg-transparent hover:text-cyan-600 md:p-0`}
                            >
                                Articles
                            </Link>
                        </li>
                        <li>
                            <Link to="/create" state={{ order: true }}>
                                <button
                                    type="button"
                                    className="flex items-center justify-center px-5 py-3 leading-normal text-white transition duration-300 border-2 rounded hover:bg-white hover:text-black hover:border-cyan-700 bg-cyan-700 border-cyan-700"
                                >
                                    Add &nbsp; <AiOutlinePlus size="20px" />
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
