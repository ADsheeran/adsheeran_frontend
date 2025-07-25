import React, { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Analyze: React.FC = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const todayKey = `analyze_count_${new Date().toISOString().split("T")[0]}_${userId}`;
    const savedCount = localStorage.getItem(todayKey);
    setCount(savedCount ? parseInt(savedCount) : 0);
  }, [userId]);

  const handleAnalyze = async () => {
    if (!userId) {
      alert("로그인이 필요합니다");
      return;
    }

    const todayKey = `analyze_count_${new Date().toISOString().split("T")[0]}_${userId}`;
    const todayCount = localStorage.getItem(todayKey);
    const currentCount = todayCount ? parseInt(todayCount) : 0;

    if (currentCount >= 3) {
      alert("오늘의 무료 분석 횟수를 모두 사용하셨습니다. 구독을 고려해보세요!");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/analyze`, {
      userId,
      text,
      });

      setResult(res.data.result || "분석 결과가 없습니다");
      localStorage.setItem(todayKey, (currentCount + 1).toString());
      setCount(currentCount + 1);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.error || "분석 실패");
      } else {
        alert("알 수 없는 오류가 발생했습니다");
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">문장 분석기</h1>
      <p className="text-gray-500 mb-2">오늘의 남은 무료 분석 횟수: {3 - count}회</p>
      <textarea
        className="border p-2 w-full h-40 mb-2"
        placeholder="분석할 문장을 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleAnalyze}
        className="bg-purple-600 text-white px-4 py-2 w-full mb-4"
      >
        분석하기
      </button>
      {result && (
        <div className="border rounded p-4 bg-gray-50">
          <h2 className="font-bold mb-2">분석 결과</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Analyze;
