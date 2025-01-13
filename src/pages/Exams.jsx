import React, { useState } from 'react';
import { FiClock, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const dummyExams = [
  {
    id: 1,
    title: "Basic English Grammar",
    duration: "30 minutes",
    category: "English",
    questions: [
      {
        id: 1,
        question: "What is the correct form of the verb in the sentence: 'She ____ to the store every day.'?",
        options: ["go", "goes", "going", "gone"],
        answer: "goes",
        explanation: "Third-person singular subjects require the verb with 's' in present simple tense."
      },
      {
        id: 2,
        question: "Which word is a noun in the sentence: 'The cat sat on the mat.'?",
        options: ["cat", "sat", "on", "the"],
        answer: "cat",
        explanation: "A noun is a person, place, thing, or idea. 'Cat' is a thing, making it a noun."
      },
      // Add more questions...
    ]
  },
  {
    id: 2,
    title: "Advanced Grammar Test",
    duration: "45 minutes",
    category: "English",
    questions: [] // Add questions here
  },
  {
    id: 3,
    title: "Basic Math Test",
    duration: "30 minutes",
    category: "Math",
    questions: [] // Add questions here
  }
];

const categories = ["All", "English", "Math"];

const ExamCard = ({ exam, onStart }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{exam.title}</h3>
    <div className="flex items-center text-gray-600 mb-4">
      <FiClock className="mr-2" />
      <span>{exam.duration}</span>
    </div>
    <p className="text-gray-600 mb-4">Category: {exam.category}</p>
    <p className="text-gray-600 mb-4">Questions: {exam.questions.length}</p>
    <button
      onClick={() => onStart(exam)}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Start Exam
    </button>
  </div>
);

const Exams = () => {
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleStartExam = (exam) => {
    setSelectedExam(exam);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedExam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
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

  const filteredExams = selectedCategory === "All"
    ? dummyExams
    : dummyExams.filter(exam => exam.category === selectedCategory);

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
            {selectedExam.questions.map((question, index) => (
              <div key={index} className="border-b pb-4">
                <p className="font-medium mb-2">{question.question}</p>
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
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg flex items-center"
              >
                ← Back to Exams
              </button>
              <h2 className="text-xl font-bold text-gray-800">{selectedExam.title}</h2>
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
          <p className="text-lg text-gray-800 mb-6">{currentQuestion.question}</p>
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
      </div>
    </div>
  );
};

export default Exams;