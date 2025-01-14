import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Question from './pages/Question';
import Result from './pages/Result';
import TopicSelection from './pages/TopicSelection';
import questionsData from './data/questions.json'; // อิมพอร์ตข้อมูลคำถาม
import Logins from './pages/Login';

function App() {
  const [answers, setAnswers] = useState({}); // เก็บคำตอบทั้งหมด
  const [isAuthenticated, setIsAuthenticated] = useState(false); // เก็บสถานะการล็อกอิน

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer, // บันทึกคำตอบโดยใช้ questionId เป็น key
    }));
  };

  return (
    <Router>
      {/* หน้าเลือกตอน */}
      <Routes>
        <Route path="/topics" element={<TopicSelection />} />
        {/* เส้นทางสำหรับคำถาม */}
        {questionsData.map((topic) =>
          topic.questions.map((q, index) => (
            <Route
              key={`${topic.id}-${q.id}`}
              path={`/topic/${topic.id}/question/${q.id}`}
              element={
                <Question
                  question={q}
                  onAnswer={handleAnswer}
                  nextPath={
                    index < topic.questions.length - 1
                      ? `/topic/${topic.id}/question/${topic.questions[index + 1].id}`
                      : `/topic/${topic.id}/result`
                  }
                />
              }
            />
          ))
        )}
        {/* เส้นทางสำหรับหน้าผลลัพธ์ของแต่ละตอน */}
        {questionsData.map((topic) => (
          <Route
            key={topic.id}
            path={`/topic/${topic.id}/result`}
            element={<Result topic={topic} answers={answers} />}
          />
        ))}
        {/* Private Route สำหรับหน้า Home */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" />
          }
        />
        {/* เส้นทางหน้าผลลัพธ์ */}
        {questionsData.map((topic) => (
          <Route
            key={topic.id}
            path={`/topic/${topic.id}/result`}
            element={
              <Result
                topic={topic}
                answers={answers}
                totalTopics={questionsData.length} // ส่งจำนวนตอนทั้งหมด
              />
            }
          />
        ))}
        {/* หน้า Login */}
        <Route
          path="/login"
          element={<Logins setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
