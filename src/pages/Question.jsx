import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Question = ({ question, onAnswer, nextPath }) => {
  const navigate = useNavigate();

  const handleAnswerClick = (answer) => {
    onAnswer(question.id, answer); // เก็บคำตอบ
    navigate(nextPath); // ไปหน้าถัดไป
  };

  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center">
      <div className="flex items-center justify-center h-full flex-col px-4">
        {/* แสดงหมายเลขคำถาม */}
        <div className="absolute top-10 left-10 bg-red-600 text-white text-xl px-4 py-2 rounded-lg">
          {question.id}
        </div>

        {/* คำถาม */}
        <h1 className="text-white text-3xl md:text-5xl font-bold text-center max-w-4xl leading-normal w-3/4 md:w-full">
          {question.question}
        </h1>

        {/* เว้นระยะ */}
        <div className="mt-10"></div>

        {/* ตัวเลือกคำตอบ */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 w-3/4 md:w-full max-w-3xl">
          {question.options.map((option) => (
            <li key={option}>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg shadow-lg w-full text-lg md:text-2xl"
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  nextPath: PropTypes.string.isRequired,
};

export default Question;
