import React, { useState } from 'react';
import { useNavigate } from 'react-router'; 
import AuthLayout from '../components/AuthLayout';
import Input from "../components/Input";
import Button from "../components/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // 1. Tách ra 3 biến lỗi riêng biệt thay vì 1 biến chung
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    let isValid = true;

    // Validate Email
    if (!email.trim()) {
      setEmailError('Field is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate Password
    if (!password.trim()) {
      setPasswordError('Field is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Validate Confirm Password
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Field is required');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (isValid) {
      setSuccess(true);
      console.log('Password reset successful');
    }
  };

  const handleSignInClick = () => {
    navigate('/login');
  };

  if (success) {
    return (
      <AuthLayout>
        <div className="flex flex-col gap-5">
          <h1 className="text-[32px] font-bold text-[#111827]">Success!</h1>
          <p className="text-base text-[#6B7280]">
            Your password has been reset successfully.
          </p>
          <Button 
            onClick={handleSignInClick}
            tabIndex={-1}
            className="w-full h-[48px] rounded-[12px] font-medium cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#2563EB", color: "#FFFFFF" }}
          >
            Go to Sign In
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="flex flex-col gap-5">
        <h1 className="text-[32px] font-bold text-[#111827]">Forgot password</h1>

        <p className="text-base text-[#6B7280]">
          Enter your registered email and set your new password.
        </p>

        <div className="flex flex-col gap-5 mt-2">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            // 2. Sửa lại onChange để xóa lỗi ngay khi gõ
            onChange={(e: any) => {
              setEmail(e.target.value);
              if (e.target.value) setEmailError('');
            }}
            error={emailError}
          />

          <Input
            label="New Password"
            type="password" // Đổi type để ẩn mật khẩu
            placeholder="Enter new password"
            value={password}
            onChange={(e: any) => {
              setPassword(e.target.value);
              if (e.target.value) setPasswordError('');
            }}
            showPasswordToggle={true}
            error={passwordError}
          />

          <Input
            label="Confirm Password"
            type="password" // Đổi type để ẩn mật khẩu
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e: any) => {
              setConfirmPassword(e.target.value);
              if (e.target.value) setConfirmPasswordError('');
            }}
            showPasswordToggle={true}
            error={confirmPasswordError}
          />
        </div>

        <div className="mt-2">
          {/* Nút Continue đã được set w-full để bung rộng bằng ô Input */}
          <Button 
            onClick={handleContinue}
            className="w-full h-[48px] rounded-[12px] font-medium cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#2563EB", color: "#FFFFFF" }}
          >
            Continue
          </Button>
        </div>

        <p className="text-sm text-center text-[#6B7280] mt-2">
          Already have an account?{' '}
          <button
            onClick={handleSignInClick}
            className="text-[#2563EB] font-medium hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}