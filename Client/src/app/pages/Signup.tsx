import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
// Giữ nguyên các import hiện tại của bạn
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Signup() {
  // Trạng thái hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State lưu giá trị nhập vào
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State lưu thông báo lỗi
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  // Hàm xử lý khi bấm nút Đăng ký
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let isValid = true;

    // Validate Full Name
    if (!fullName.trim()) {
      setFullNameError("Please enter full name");
      isValid = false;
    } else {
      setFullNameError("");
    }

    // Validate Email
    if (!email.trim()) {
      setEmailError("Field is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate Password
    if (!password.trim()) {
      setPasswordError("Field is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Validate Confirm Password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please enter password");
      isValid = false;
    } else if (password !== confirmPassword) {
      // Tiện tay thêm check mật khẩu trùng khớp cho chuyên nghiệp
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    // Nếu tất cả hợp lệ thì chuyển hướng về Login
    if (isValid) {
      console.log("Signup Info:", { fullName, email, password });
      // navigate("/login"); // Mở comment dòng này nếu bạn muốn tự động chuyển về trang đăng nhập
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Main Card */}
      <div 
        className="flex overflow-hidden"
        style={{
          width: '1100px',
          height: '720px',
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0px 10px 30px rgba(0,0,0,0.08)'
        }}
      >
        {/* Left Panel - Scrollable Form */}
        <div 
          className="w-1/2 overflow-y-auto flex flex-col"
          style={{ padding: '48px' }}
        >
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#2563EB' }}>
                SmartStudy
              </h1>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[32px] font-bold" style={{ color: '#111827' }}>
                Create Account
              </h2>
              <p className="text-base" style={{ color: '#6B7280' }}>
                Start organizing your study life today.
              </p>
            </div>

            {/* Form Fields - Đã bọc bằng thẻ <form> */}
            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2">
              
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="fullname" className="text-[14px] font-medium block" style={{ color: '#111827' }}>
                  First name
                </label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Enter first name"
                  value={fullName}
                  // Đã xóa label và error ở đây
                  onChange={(e: any) => {
                    setFullName(e.target.value);
                    if (e.target.value) setFullNameError("");
                  }}
                  className={`h-12 rounded-xl border ${fullNameError ? "border-red-500 outline-none ring-1 ring-red-500" : ""}`}
                  style={{ 
                    borderColor: fullNameError ? '#EF4444' : '#E5E7EB',
                    backgroundColor: 'white'
                  }}
                />
                {/* Dòng chữ báo lỗi màu đỏ */}
                {fullNameError && <p className="text-[#EF4444] text-[14px] mt-1">{fullNameError}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[14px] font-medium block" style={{ color: '#111827' }}>
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                    if (e.target.value) setEmailError("");
                  }}
                  className={`h-12 rounded-xl border ${emailError ? "border-red-500 outline-none ring-1 ring-red-500" : ""}`}
                  style={{ 
                    borderColor: emailError ? '#EF4444' : '#E5E7EB',
                    backgroundColor: 'white'
                  }}
                />
                {/* Dòng chữ báo lỗi màu đỏ */}
                {emailError && <p className="text-[#EF4444] text-[14px] mt-1">{emailError}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-[14px] font-medium block" style={{ color: '#111827' }}>
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e: any) => {
                      setPassword(e.target.value);
                      if (e.target.value) setPasswordError("");
                    }}
                    className={`h-12 rounded-xl border pr-12 w-full ${passwordError ? "border-red-500 outline-none ring-1 ring-red-500" : ""}`}
                    style={{ 
                      borderColor: passwordError ? '#EF4444' : '#E5E7EB',
                      backgroundColor: 'white'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[24px] -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {/* Dòng chữ báo lỗi màu đỏ */}
                {passwordError && <p className="text-[#EF4444] text-[14px] mt-1">{passwordError}</p>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword" className="text-[14px] font-medium block" style={{ color: '#111827' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter confirm password"
                    value={confirmPassword}
                    onChange={(e: any) => {
                      setConfirmPassword(e.target.value);
                      if (e.target.value) setConfirmPasswordError("");
                    }}
                    className={`h-12 rounded-xl border pr-12 w-full ${confirmPasswordError ? "border-red-500 outline-none ring-1 ring-red-500" : ""}`}
                    style={{ 
                      borderColor: confirmPasswordError ? '#EF4444' : '#E5E7EB',
                      backgroundColor: 'white'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[24px] -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {/* Dòng chữ báo lỗi màu đỏ */}
                {confirmPasswordError && <p className="text-[#EF4444] text-[14px] mt-1">{confirmPasswordError}</p>}
              </div>

              {/* Primary Button */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl font-medium cursor-pointer hover:opacity-90 transition-opacity mt-2"
                style={{ 
                  backgroundColor: '#0EA5E9', // Đổi màu xanh giống nút Continue trong ảnh của bạn
                  color: 'white'
                }}
              >
                Continue
              </Button>
            </form>

            {/* Spacer */}
            <div className="mt-4" />

            {/* Bottom Section - Sign in link */}
            <div className="text-center pb-6">
              <p className="text-sm">
                <span style={{ color: '#6B7280' }}>Already have an account? </span>
                <Link 
                  to="/login" 
                  className="font-medium hover:underline transition-all"
                  style={{ color: '#2563EB' }}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Gradient Hero */}
        <div 
          className="w-1/2 flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            borderRadius: '24px'
          }}
        >
          <div className="px-12 text-center z-10">
            <h3 className="text-[28px] font-bold text-white mb-4 leading-tight">
              Manage your classes, tasks, and exams in one place.
            </h3>
            <p className="text-base text-white/80 leading-relaxed">
              Stay productive and never miss a deadline again.
            </p>
          </div>

          {/* Minimal illustration background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='white' stroke-width='2'/%3E%3Ccircle cx='50' cy='30' r='8' fill='white'/%3E%3Cpath d='M30 45h40M30 55h40M30 65h25' stroke='white' stroke-width='2'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
      </div>
    </div>
  );
}