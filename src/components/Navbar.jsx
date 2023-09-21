import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from '../assets/logo.png'

const Navbar = ({ user, onLogout }) => {
	const [isSticky, setIsSticky] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 100) {
			setIsSticky(true);
		} else {
			setIsSticky(false);
		}
	};

	// Add a scroll event listener when the component mounts
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			{user && (
				<nav
					className={`${
						isSticky
							? "fixed top-0 left-0 py-6 w-full bg-white shadow-md z-[50]"
							: ""
					} px-6 md:px-10 py-4 pl-1 pr-2 transition-all duration-300 ease-in-out shadow`}
				>
					<div className="container flex items-center justify-between mx-auto">
						<div className="text-2xl font-bold text-gray-800">
							<NavLink
								className="flex items-center w-20 justify-center font-bold text-gray-800"
								title="logo"
								to={`/`}
							>
								<img src={Logo} alt="Logo" />
							</NavLink>
						</div>
						<div className="flex items-center">
							<button
								onClick={onLogout}
								className="py-2 ml-4 font-bold text-gray-800 bg-gray-100 border-gray-200 rounded-full px-8 text:bg-gray-900"
								title="logout"
							>
								Logout
							</button>
						</div>
					</div>
				</nav>
			)}
		</>
	);
};

export default Navbar;
