import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form validators
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const hasErrors = Object.keys(errors).length > 0;

  // Log in function
  const onLogin = async () => {
    if (hasErrors) {
      console.log(errors);
    } else {
      setIsLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Signed in
        navigate("/");
        toast.success("Login successful!");
      } catch (error) {
        const errorMessage = error.message;
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className="flex items-center justify-center h-full min-h-screen">
      <div className="bg-white p-5 rounded-md shadow-lg w-full max-w-md">
        <h2 className="font-semibold text-xl mb-4">Welcome back!</h2>
        <p className="text-gray-600 mb-8">Log in to continue</p>

        <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
          <div className="relative">
            <input
              {...register("email", {
                required: true,
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              })}
              name="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-field"
            />
            {errors.email && errors.email.type === "required" && (
              <p className="error-message">Email is required.</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="error-message">Email is not valid.</p>
            )}
          </div>

          <div className="relative">
            <input
              {...register("password", { required: true })}
              name="password"
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-field"
            />
            <span
              onClick={togglePasswordVisibility}
              className="password-toggle"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
            {errors.password && errors.password.type === "required" && (
              <p className="error-message">Password is required.</p>
            )}
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
