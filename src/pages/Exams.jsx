import React, { useState, useEffect } from 'react';
import axios from 'axios';
import conf from '../conf/conf';
import { FiClock, FiArrowRight, FiArrowLeft, FiAlertCircle, FiShare2, FiArrowUp } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const ExamCard = ({ exam, onStart }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{exam.title}</h3>
    <div className="flex items-center text-gray-600 mb-4">
      <FiClock className="mr-2" />
      <span>{exam.duration} minutes</span>
    </div>
    <p className="text-gray-600 mb-4">Category: {exam.category}</p>
    <p className="text-gray-600 mb-4">Questions: {exam.num_questions}</p>
    <button
      onClick={() => onStart(exam.id)}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Start Exam
    </button>
  </div>
);

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [timePassed, setTimePassed] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [categories, setCategories] = useState(["All"]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${conf.apiUrl}/api/exams/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const sortedExams = response.data.sort((a, b) => b.id - a.id);
        setExams(sortedExams);

        const uniqueCategories = ["All", ...new Set(sortedExams.map(exam => exam.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to fetch exams:', error);
      }
    };

    fetchExams();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      const interval = setInterval(() => {
        setTimePassed(prev => prev + 1);
        const remaining = selectedExam.duration * 60 - timePassed - 1;
        setRemainingTime(Math.max(0, remaining)); // Ensure remaining time doesn't go below 0
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [selectedExam, timePassed]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartExam = async (examId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${conf.apiUrl}/api/exams/${examId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSelectedExam(response.data);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setShowResults(false);
      setTimePassed(0);
      setRemainingTime(response.data.duration * 60);
    } catch (error) {
      console.error('Failed to fetch exam details:', error);
    }
  };

  const handleAnswer = (qIndex, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [qIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedExam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      handleSubmitResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    Object.keys(userAnswers).forEach(index => {
      if (userAnswers[index] === selectedExam.questions[index].answer) {
        score++;
      }
    });
    return score;
  };

  const handleSubmitResults = async () => {
    const score = calculateScore();

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${conf.apiUrl}/api/performances/create/`, {
        username: userData.username,
        examId: selectedExam.id,
        exam_duration: Math.floor(timePassed / 60),
        correct_count: score
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Failed to submit results:', error);
    }
  };

  const isQuestionAnswered = (index) => {
    return userAnswers.hasOwnProperty(index);
  };

  const getUnansweredQuestions = () => {
    if (!selectedExam) return [];
    return selectedExam.questions
      .map((_, index) => index)
      .filter(index => !isQuestionAnswered(index));
  };

  const handleSubmit = () => {
    const unanswered = getUnansweredQuestions();
    if (unanswered.length > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unanswered.length} unanswered questions (Questions ${unanswered.map(i => i + 1).join(', ')}). Do you want to submit?`
      );
      if (!confirmSubmit) return;
    }
    setShowResults(true);
    handleSubmitResults();
  };

  const handleShare = () => {
    if (!selectedExam) return;
    
    const score = calculateScore();
    const shareData = {
      title: `Exam Results: ${selectedExam.title}`,
      text: `Exam ID: ${selectedExam.id}
Title: ${selectedExam.title}
Category: ${selectedExam.category}
Score: ${score}/${selectedExam.questions.length}
Accuracy: ${Math.round((score / selectedExam.questions.length) * 100)}%
Time Taken: ${Math.floor(timePassed / 60)} minutes`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      alert('Sharing is not supported in this browser.');
    }
  };

  const filteredExams = selectedCategory === "All"
    ? exams
    : exams.filter(exam => exam.category === selectedCategory);

  const currentQuestion = selectedExam?.questions[currentQuestionIndex];

  if (!selectedExam) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Exams</h1>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Filter by Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map(exam => (
            <ExamCard key={exam.id} exam={exam} onStart={handleStartExam} />
          ))}
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Exam Results</h2>
          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {score} / {selectedExam.questions.length}
            </p>
            <p className="text-gray-600">
              {Math.round((score / selectedExam.questions.length) * 100)}% Correct
            </p>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">Exam ID: {selectedExam.id}</p>
            <p className="text-gray-600">Title: {selectedExam.title}</p>
            <p className="text-gray-600">Category: {selectedExam.category}</p>
            <p className="text-gray-600">Time Taken: {Math.floor(timePassed / 60)} minutes</p>
            
            <button
              onClick={handleShare}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 mb-6"
            >
              <FiShare2 /> Share Results
            </button>

            {selectedExam.questions.map((question, index) => (
              <div key={index} className="border-b pb-4">
                <p className="font-medium mb-2">{question.question_text}</p>
                <p className="text-gray-600">Your answer: 
                  <span className={userAnswers[index] === question.answer ? 
                    "text-green-600 ml-2 font-medium" : 
                    "text-red-600 ml-2 font-medium"}>
                    {userAnswers[index]}
                  </span>
                </p>
                <p className="text-gray-600">Correct answer: 
                  <span className="text-green-600 ml-2 font-medium">{question.answer}</span>
                </p>
                <p className="text-gray-600 mt-2">{question.explanation}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSelectedExam(null)}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  if (selectedExam && !showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto relative">
          {/* Fixed Header */}
          <div className="fixed top-51 left-0 right-0 bg-white shadow-sm z-10">
            <div className="max-w-4xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedExam(null)}
                    className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                  >
                    <FiArrowLeft /> Back
                  </button>
                  <h2 className="text-lg font-semibold text-gray-800">{selectedExam.title}</h2>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FiClock className="text-gray-500" />
                    <span>{Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Q {selectedExam.questions.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content with top padding to account for fixed header */}
          <div className="px-6 pt-20 pb-2 mt-5">
            {selectedExam.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                id={`question-${qIndex}`}
                className="bg-white rounded-lg shadow-sm p-6 mb-6"
              >
                <p className="text-lg font-medium text-gray-800 mb-4">
                  <span className={`inline-block w-8 h-8 text-center leading-8 rounded-full mr-2 
                    ${isQuestionAnswered(qIndex) 
                      ? 'bg-green-100 text-green-800 font-bold'
                      : 'bg-gray-100 text-gray-600'}`}
                  >
                    {qIndex + 1}
                  </span>
                  {question.question_text}
                </p>
                <div className="space-y-3">
                  {question.options.map((option, oIndex) => (
                    <label
                      key={oIndex}
                      className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={option}
                        checked={userAnswers[qIndex] === option}
                        onChange={() => handleAnswer(qIndex, option)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button and Back to Top */}
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 font-medium"
            >
              Submit Exam
            </button>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 py-2 px-4"
            >
              <FiArrowUp /> Back to Top
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <button
        onClick={() => setSelectedExam(null)}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Back to Exams
      </button>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedExam(null)}
                className="pr-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg flex items-center"
              >
                ← Back
              </button>
              <h2 className="mx-2 text-xl font-bold text-gray-800">{selectedExam.title}</h2>
            </div>
            <span className="text-gray-600">
              Question {currentQuestionIndex + 1} of {selectedExam.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / selectedExam.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-800 mb-6">{currentQuestion.question_text}</p>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  userAnswers[currentQuestionIndex] === option
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                } border`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentQuestionIndex === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            <FiArrowLeft className="mr-2" /> Previous
          </button>
          <button
            onClick={handleNext}
            className="flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            {currentQuestionIndex === selectedExam.questions.length - 1 ? 'Finish' : 'Next'} <FiArrowRight className="ml-2" />
          </button>
        </div>

        <div className="mt-6 text-gray-600">
          <p>Time Passed: {Math.floor(timePassed / 60)}:{timePassed % 60 < 10 ? '0' : ''}{timePassed % 60}</p>
          <p>Remaining Time: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60}</p>
        </div>
      </div>
    </div>
  );
};

export default Exams;