
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await api.post("/api/auth/login", form);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to log in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-120 mx-auto my-auto flex flex-col px-5 h-screen mt-30 space-y-20">
      <Logo />
      <div className="space-y-5">
        <div className="space-y-3">
          <h1 className="capitalize font-bold text-4xl">Welcome back</h1>
          <p className="text-gray-500 text-[15px] font-semibold">
            Sign in to manage customer enquiries and past imports.
          </p>
          {error && (
            <p className="text-red-600 flex gap-2">
              <CircleAlert className="w-4" />
              {error}
            </p>
          )}
        </div>

        <form className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              value={form.username}
              onChange={(e) => {
                setForm({
                  ...form,
                  username: e.target.value,
                });
              }}
              placeholder="johndoe123"
              className="border border-gray-300 rounded-lg px-3 text-xs h-10 outline-pink-500"
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="" className="text-sm font-semibold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter Password"
              className="border border-gray-300 rounded-lg px-3 text-xs h-10 outline-pink-500"
              value={form.password}
              onChange={(e) => {
                setForm({
                  ...form,
                  password: e.target.value,
                });
              }}
            />
            <span
              className="cursor-pointer absolute right-5 bottom-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="w-5" />
              ) : (
                <Eye className="w-5" />
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="cursor-pointer" />
              <span className="text-zinc-600 text-sm">Remember Me</span>
            </div>
            <span className="text-pink-500 hover:underline cursor-pointer text-sm">
              Forgot Password
            </span>
          </div>
        </form>

        <Button type={"submit"} onClick={handleSubmit} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
