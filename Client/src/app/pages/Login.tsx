import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router"; 

import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  
  // State lưu giá trị nhập vào
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State lưu thông báo lỗi
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    let isValid = true;

    // Kiểm tra Email rỗng
    if (!email.trim()) {
      setEmailError("Field is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Kiểm tra Password rỗng
    if (!password.trim()) {
      setPasswordError("Field is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Nếu không có lỗi (isValid = true) thì mới xử lý đăng nhập và chuyển trang
    if (isValid) {
      console.log("Login with:", { email, password });
      navigate("/"); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F8FAFC" }}>
      <div 
        className="bg-white overflow-hidden flex"
        style={{
          width: "1100px",
          height: "600px",
          borderRadius: "24px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.08)"
        }}
      >
        {/* Left Panel - Login Form */}
        <div className="w-1/2 flex flex-col" style={{ padding: "48px" }}>
          <div className="mb-8">
            <h1 className="text-[24px] font-bold" style={{ color: "#2563EB" }}>
              Smart Study Planner
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
            <div className="space-y-2">
              <h2 className="text-[32px] font-bold" style={{ color: "#111827" }}>
                Sign in
              </h2>
              <p className="text-[16px]" style={{ color: "#6B7280" }}>
                Built for busy students like you.
              </p>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="text-[14px] font-medium block"
                style={{ color: "#374151" }}
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                label=""
                // Truyền state lỗi vào đây
                error={emailError} 
                onChange={(e: any) => {
                  setEmail(e.target.value);
                  // Xóa lỗi ngay khi người dùng bắt đầu nhập
                  if (e.target.value) setEmailError(""); 
                }}
                className={`h-[48px] rounded-[12px] ${emailError ? "border-red-500" : ""}`}
                style={{ 
                  borderColor: emailError ? "#EF4444" : "#E5E7EB",
                  backgroundColor: "#FFFFFF"
                }}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="text-[14px] font-medium block"
                style={{ color: "#374151" }}
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  label=""
                  // Truyền state lỗi vào đây
                  error={passwordError} 
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                    // Xóa lỗi ngay khi người dùng bắt đầu nhập
                    if (e.target.value) setPasswordError("");
                  }}
                  className={`h-[48px] rounded-[12px] pr-12 ${passwordError ? "border-red-500" : ""}`}
                  style={{ 
                    borderColor: passwordError ? "#EF4444" : "#E5E7EB",
                    backgroundColor: "#FFFFFF"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[24px] -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end -mt-2">
              <Link 
                to="/forgotpassword" 
                className="text-[14px] font-medium hover:underline transition-all"
                style={{ color: '#2563EB' }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-[48px] rounded-[12px] font-medium cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: "#2563EB",
                color: "#FFFFFF"
              }}
            >
              Continue
            </Button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm">
                <span style={{ color: '#6B7280' }}>Don't have an account? </span>
                <Link 
                  to="/signup" 
                  className="font-medium hover:underline transition-all"
                  style={{ color: '#2563EB' }}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right Panel - Hero Section */}
        <div 
          className="w-1/2 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
            borderRadius: "24px"
          }}
        >
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1769794370964-78412732f1cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHklMjBkZXNrJTIwbGFwdG9wJTIwbm90ZWJvb2slMjBtaW5pbWFsfGVufDF8fHx8MTc3MjUyMTQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          
          <div className="relative z-10 space-y-4 max-w-md">
            <h3 
              className="text-[28px] font-bold leading-snug"
              style={{ color: "#FFFFFF" }}
            >
              Manage your classes, tasks and exams easily.
            </h3>
            <p 
              className="text-[16px]"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              Plan your study schedule and stay organized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}