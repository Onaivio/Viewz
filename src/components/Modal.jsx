import React, { useState, useEffect } from "react";
import { CgLivePhoto } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

function Modal() {
  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Use useEffect to open the modal when the component mounts
  useEffect(() => {
    openModal();
  }, []);

  return (
    <div
      className={`fixed z-[1000] w-full h-full bg-gray-100/50 backdrop-blur-sm flex items-center justify-center modal ${
        showModal ? "show" : ""
      }`}
    >
      <div className="bg-white sm:w-[50%] w-[90%] h-[40vh] shadow-2xl rounded-3xl flex items-center justify-center flex-col">
        <div
          className="flex items-center w-28 justify-center font-bold text-gray-800"
          title="logo"
          to={`/`}
        >
          <img src={Logo} alt="Logo" />
        </div>
        <p className="p-3 text-gray-500 w-[95%] text-center text-sm">
          Views presents a diverse photographic collection, offering an
          intuitive gallery experience. Customize the arrangement of images
          effortlessly through drag-and-drop functionality.
        </p>

        <NavLink to="/login" className="mt-6 text-xl font-bold text-gray-900">
          Log In to continue
        </NavLink>
      </div>
    </div>
  );
}

export default Modal;
