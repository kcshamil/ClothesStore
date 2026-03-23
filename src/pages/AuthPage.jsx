import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { loginAPI, registerAPI, googleLoginAPI } from "../services/allAPI";
import { useGoogleLogin } from "@react-oauth/google";

export default function AuthPage() {
  const navigate = useNavigate();

  const [mode, setMode]                 = useState("signin");
  const [viewPassword, setViewPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);

  // same field names as Auth.jsx + backend (username, email, password)
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  // ── Register ───────────────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, confirm } = userDetails;

    if (!username || !email || !password) {
      toast.info("Please fill the form completely");
      return;
    }
    if (password !== confirm) {
      toast.warning("Passwords do not match");
      return;
    }

    try {
      const result = await registerAPI({ username, email, password });

      if (result.status === 200) {
        toast.success("Registered successfully! Please login.");
        setUserDetails({ username: "", email: "", password: "", confirm: "" });
        setTimeout(() => switchMode("signin"), 2000);

      } else if (result.status === 409) {
        toast.warning(result.data || "User already exists. Please login.");
        setUserDetails({ username: "", email: "", password: "", confirm: "" });
        setTimeout(() => switchMode("signin"), 2000);

      } else {
        toast.error("Something went wrong");
        setUserDetails({ username: "", email: "", password: "", confirm: "" });
      }
    } catch (err) {
      console.log(err);
      toast.error("Cannot connect to server");
    }
  };

  // ── Login ──────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;

    if (!email || !password) {
      toast.info("Please fill the form completely");
      return;
    }

    try {
      const result = await loginAPI({ email, password });

      if (result.status === 200) {
        toast.success("Login Successful!");
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("user",  JSON.stringify(result.data.user));
        setTimeout(() => {
          result.data.user.role === "admin"
            ? navigate("/admin")
            : navigate("/");
        }, 2000);

      } else if (result.status === 401 || result.status === 404) {
        toast.warning(result.data || "Incorrect email or password");
        setUserDetails({ username: "", email: "", password: "", confirm: "" });

      } else {
        toast.error("Something went wrong!");
        setUserDetails({ username: "", email: "", password: "", confirm: "" });
      }
    } catch (err) {
      console.log(err);
      toast.error("Cannot connect to server");
    }
  };

  // ── Google Login ───────────────────────────────────────────
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const decode = await res.json();

        const result = await googleLoginAPI({
          username: decode.name,
          email:    decode.email,
          password: "googlePassword",
          picture:  decode.picture,
        });

        if (result.status === 200) {
          toast.success("Login Successful!");
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem("user",  JSON.stringify(result.data.user));
          setTimeout(() => {
            result.data.user.role === "admin" ? navigate("/admin") : navigate("/");
          }, 2000);
        } else {
          toast.error("Google Login Failed");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    },
    onError: () => toast.error("Google Login Failed"),
  });

  // ── Switch tab ─────────────────────────────────────────────
  const switchMode = (m) => {
    setMode(m);
    setUserDetails({ username: "", email: "", password: "", confirm: "" });
    setViewPassword(false);
    setShowConfirm(false);
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#dfe7eb] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm bg-[#edf3f5] rounded-[30px] px-10 py-12">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-[38px] tracking-[0.22em] text-black leading-none"
            style={{ fontFamily: "'Bebas Neue', cursive" }}>
            ROYALFIT
          </h1>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-1">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex bg-[#dfe9ed] rounded-full p-1 mb-10">
          {[["signin", "Sign In"], ["signup", "Sign Up"]].map(([m, label]) => (
            <button key={m} type="button" onClick={() => switchMode(m)}
              className={`flex-1 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-medium transition-all duration-200
                ${mode === m ? "bg-black text-white" : "text-gray-400 hover:text-black"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form className="flex flex-col gap-7">

          {/* Username — signup only */}
          {mode === "signup" && (
            <div className="flex items-center border-b border-gray-300 focus-within:border-black pb-1 transition-colors">
              <input
                type="text"
                placeholder="Full Name"
                value={userDetails.username}
                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                className="flex-1 bg-transparent text-sm text-black placeholder-gray-300 outline-none py-2 font-light"
              />
            </div>
          )}

          {/* Email */}
          <div className="flex items-center border-b border-gray-300 focus-within:border-black pb-1 transition-colors">
            <input
              type="email"
              placeholder="Email Address"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              className="flex-1 bg-transparent text-sm text-black placeholder-gray-300 outline-none py-2 font-light"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-b border-gray-300 focus-within:border-black pb-1 transition-colors">
            <input
              type={viewPassword ? "text" : "password"}
              placeholder="Password"
              value={userDetails.password}
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              className="flex-1 bg-transparent text-sm text-black placeholder-gray-300 outline-none py-2 font-light"
            />
            <button type="button" onClick={() => setViewPassword(!viewPassword)}
              className="text-gray-300 hover:text-black transition-colors flex-shrink-0">
              {viewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Confirm Password — signup only */}
          {mode === "signup" && (
            <div className="flex items-center border-b border-gray-300 focus-within:border-black pb-1 transition-colors">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={userDetails.confirm}
                onChange={(e) => setUserDetails({ ...userDetails, confirm: e.target.value })}
                className="flex-1 bg-transparent text-sm text-black placeholder-gray-300 outline-none py-2 font-light"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="text-gray-300 hover:text-black transition-colors flex-shrink-0">
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          )}

          {/* Forgot password */}
          {mode === "signin" && (
            <div className="text-right -mt-4">
              <button type="button"
                className="text-[11px] text-gray-400 hover:text-black transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={mode === "signin" ? handleLogin : handleRegister}
            className="w-full bg-black text-white text-[11px] uppercase tracking-widest py-3.5 rounded-full
              hover:bg-gray-800 transition-colors mt-2">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-7">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[10px] text-gray-400 uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google — custom styled to match design */}
        <button
          type="button"
          onClick={() => handleGoogleLogin()}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-full
            py-3 text-[12px] text-gray-500 hover:border-gray-400 hover:bg-white transition-all">
          <svg width="16" height="16" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.4C9.8 35.6 16.3 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C37 39 44 34 44 24c0-1.3-.1-2.7-.4-3.9z"/>
          </svg>
          Continue with Google
        </button>

        {/* Switch mode */}
        <p className="text-center text-[12px] text-gray-400 mt-7">
          {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
          <button type="button"
            onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
            className="text-black font-semibold hover:underline">
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>

      </div>

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}