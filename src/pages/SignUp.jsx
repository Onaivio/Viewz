import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { CgLivePhoto } from "react-icons/cg";

const SignUp = () => {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("1Password");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = () => {
    if (hasErrors) {
      console.log(errors);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          console.log("You have successfully created an account");
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorCode, errorMessage);
        });
    }
  };

  return (
    <section className="relative flex items-center justify-center p-2 font-poppins div-overlay">
      <div className="bg-white flex items-center justify-between flex-col p-5 sm:p-10 my-10 md:my-16 sm:my-12 md:w-[590px] sm:w-[60%] w-full rounded-[34px]">
        <div className="flex items-center justify-center text-[22px] font-bold">
          <span className="m-1">
            <CgLivePhoto />
          </span>
          <h1>Fototeca</h1>
        </div>
        <h2 className="font-[600] p-1">Sign Up</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between flex-col mt-12 w-full sm:w-[90%] px-1"
        >
          <div className="flex flex-col w-full mb-8">
            <input
              {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
              value={email}
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              readOnly
              placeholder="Enter an email address"
              className="h-9 p-2 placeholder:font-[200] bg-slate-50 rounded w-full border border-gray-100"
            />

            {errors.email && errors.email.type === "required" && (
              <p className="w-full text-[14px] text-red-900 opacity-90">
                Email is required.
              </p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="w-full text-[14px] text-red-900 opacity-90">
                Email is not valid.
              </p>
            )}
          </div>
          <div className="flex flex-col w-full mb-8">
            <input
              {...register("password", { required: true, minLength: 8 })}
              value={password}
              name="password"
              type="password"
              readOnly
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password"
              className="h-9 p-2 placeholder:font-[200] bg-slate-50 rounded w-full border border-gray-100"
            />

            {errors.password && errors.password.type === "required" && (
              <p className="w-full text-[12px] text-red-900 opacity-90">
                Password is required.
              </p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="w-full text-[12px] text-red-900 opacity-90">
                Password should be at least 8 characters.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 mt-10 mb-6 text-lg font-bold text-center text-gray-100 rounded bg-gray-950 bg-opacity-95 hover:bg-opacity-100 "
          >
            Sign Up
          </button>

          <p className="text-center">
            Already have an account?
            <NavLink to={`/login`} className="font-medium text-gray-900">
              {" "}
              Log In
            </NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
