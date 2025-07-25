import React, { useState } from "react";
import { signup } from "../api/auth";
import axios from "axios";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await signup(email, password);
      alert("회원가입 성공!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.error || "회원가입 실패");
      } else {
        alert("알 수 없는 오류가 발생했습니다");
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      <input
        className="border p-2 mb-2 w-full"
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignup}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        회원가입
      </button>
    </div>
  );
};

export default Signup;
