import React from 'react';
import { Link } from 'react-router-dom';

const Result = ({ topic, answers, totalTopics }) => {
  // คำนวณคะแนนเฉพาะคำถามใน topic นี้
  const score = topic.questions.reduce((total, question) => {
    if (answers[question.id] === question.answer) {
      return total + 1;
    }
    return total;
  }, 0);

  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center">
      <div className="flex items-center justify-center h-full flex-col">
        {/* หัวข้อผลลัพธ์ */}
        <h1 className="text-red-50 text-4xl md:text-6xl font-bold tracking-wider">
          ตรวจสอบคะแนน
        </h1>

        {/* คะแนน */}
        <div className="mt-10 flex flex-col items-center bg-red-600 border-4 border-red-800 rounded-lg px-10 py-8 text-white">
          <h2 className="text-xl md:text-3xl font-bold mb-4">
            {topic.name}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-green-400 text-6xl font-extrabold">{score}</span>
            <span className="text-6xl font-extrabold">/</span>
            <span className="text-yellow-300 text-6xl font-extrabold">{topic.questions.length}</span>
          </div>
        </div>

        {/* ปุ่ม */}
        <div className="mt-10 flex gap-5">
          {/* ปุ่มเลือกระดับเกม */}
          <Link
            to="/topics"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg border-4 border-purple-800"
          >
            เลือกระดับเกม
          </Link>

          {/* ปุ่มตอนถัดไป (ไม่แสดงในตอนที่ 5) */}
          {/* {topic.id < totalTopics && (
            <Link
              to={`/topic/${topic.id + 1}/question/1`}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg border-4 border-green-800"
            >
              เลือกตอนถัดไป
            </Link>
          )} */}
          {topic.id < 5 && (
            <Link
              to={`/topic/${topic.id + 1}/question/1`}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg border-4 border-green-800"
            >
              เลือกตอนถัดไป
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
