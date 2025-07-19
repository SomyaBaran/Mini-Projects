import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!isValidEmail(email)) {
      alert("Enter a valid email address.");
      return; 
    }

    // ✅ Continue to send the data to backend
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("loggedIn", true);
      navigate("/home");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col">
      <h1 className="text-2xl font-semibold text-center mt-10">Welcome to 100xTracker</h1>
      <p className="text-xm text-center mt-1 text-gray-500">
        Create an Account and explore things!
      </p>

      <div className="bg-white h-90 shadow-xl rounded-2xl p-8 mt-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Create Account
          </button>
          <p className="ml-17">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")}>Login</button>
          </p>
        </form>
      </div>
      <img
        src="/logo-girl.png"
        alt="Logo Girl"
        className="absolute bottom-4 left-4 w-30 h-auto"
      />

    </div>
  );
}

export default Signup;
