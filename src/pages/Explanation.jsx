import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Explanation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { question, selectedAnswer, nextPath } = location.state;

  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-3xl font-bold mb-6">เฉลยคำถาม</h1>
      <p className="text-lg mb-4 text-center">คำถาม: {question.question}</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 px-10">
        {question.options.map((option) => (
          <li
            key={option}
            className={`py-4 px-6 rounded-lg text-center ${
              option === question.answer
                ? 'bg-green-600'
                : option === selectedAnswer
                ? 'bg-red-600'
                : 'bg-gray-700'
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
      <p className="text-lg mt-4 text-center">
        {selectedAnswer === question.answer ? (
          <span className="text-green-400">คุณตอบถูก!</span>
        ) : (
          <span className="text-red-400 w-full">
            คุณตอบผิด! คำตอบที่ถูกต้องคือ {question.answer}
          </span>
        )}
      </p>

      {nextPath && (
        <button
          onClick={() => navigate(nextPath)}
          className="bg-red-600 text-white px-6 py-3 mt-6 rounded-lg hover:bg-blue-700 transition-all"
        >
          ไปข้อต่อไป
        </button>
      )}
    </div>
  );
};

export default Explanation;
