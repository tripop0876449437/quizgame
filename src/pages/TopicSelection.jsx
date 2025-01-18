import { Link } from 'react-router-dom';
import questionsData from '../data/questions.json'; // โหลดข้อมูล JSON

const TopicSelection = () => {
  return (
    <div className="h-screen w-screen bg-quiz-bg bg-cover bg-center">
      <div className="flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold mb-8">เลือกระดับตอนเกม</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-1 md:gap-6 w-3/4">
          {questionsData.map((topic) => (
            <Link
              key={topic.id}
              to={`/topic/${topic.id}/question/1`}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg shadow-lg text-center border-4 border-red-800"
            >
              <h2 className="text-2xl font-bold">{topic.name}</h2>
            </Link>
          ))}
        </div>
        <div className="h-2"></div>
        <Link
          to="/"
          className="bg-blue-600 text-white text-2xl md:text-3xl font-semibold py-4 px-12 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          กลับไปหน้าโปรไฟล์
        </Link>
      </div>
    </div>
  );
};

export default TopicSelection;
