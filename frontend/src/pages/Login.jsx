import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        values
      );
      if (response.status === 201) {
        localStorage.setItem('token',response.data.token)
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="font-sans bg-gray-50 min-h-screen flex items-center justify-center py-10">
      <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit}>
          <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">
            Login
          </h2>

          <div class="mb-6">
            <label
              for="email"
              class="block text-sm font-medium text-gray-600 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block text-sm font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter the Password"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            Submit
          </button>
        </form>
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" class="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
