import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/Api/loginApi"; // thunk import
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.login);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // backend ko json me bhej raha hai
    dispatch(loginUser({ userName, password }))
      .unwrap()
      .then(() => {
        navigate("/addProject"); // success hone pe redirect
      })
      .catch(() => {
        // error slice me already handle hoga
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-3">{error}</p>}

          {/* Success Message */}
          {token && (
            <p className="text-green-500 text-center mt-3">
              Login successful 🎉
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
