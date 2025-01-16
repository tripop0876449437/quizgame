import React from 'react';
import { useNavigate } from 'react-router-dom';

const Question = ({ question, onAnswer, nextPath }) => {
  const navigate = useNavigate();

  const handleAnswerClick = (answer) => {
    onAnswer(question.id, answer); // บันทึกคำตอบ
    navigate(`/explanation/${question.id}`, { state: { question, selectedAnswer: answer, nextPath } });
  };

  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 px-10 text-center">{question.question}</h1>
      <div className="h-5"></div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl px-10">
        {question.options.map((option) => (
          <li key={option}>
            <button
              onClick={() => handleAnswerClick(option)}
              className="bg-red-600 text-white py-3 px-4 rounded-lg w-full text-lg md:text-xl font-semibold shadow-lg hover:bg-red-700 transition-all"
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
