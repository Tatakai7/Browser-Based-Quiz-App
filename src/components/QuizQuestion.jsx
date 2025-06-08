import { useState, useEffect } from 'react';

export default function QuizQuestion({ 
  question, 
  options, 
  correctAnswer, 
  onAnswer, 
  timeLeft,
  currentQuestion,
  totalQuestions
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelect = (option) => {
    if (!hasAnswered) {
      setSelectedAnswer(option);
      setHasAnswered(true);
      setTimeout(() => {
        onAnswer(option);
        setSelectedAnswer(null);
        setHasAnswered(false);
      }, 1000);
    }
  };

  // Progress bar width based on time left (60 seconds total)
  const progressWidth = (timeLeft / 60) * 100;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm font-medium text-gray-500">
          Time left: {timeLeft}s
        </span>
      </div>
      
      {/* Timer progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-500 h-2 rounded-full" 
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-6">{question}</h2>
      
      <div className="space-y-3">
        {options.map((option, index) => {
          let buttonClass = "w-full text-left py-3 px-4 rounded-lg border transition duration-200";
          
          if (hasAnswered) {
            if (option === correctAnswer) {
              buttonClass += " bg-green-100 border-green-500 text-green-800";
            } else if (option === selectedAnswer && selectedAnswer !== correctAnswer) {
              buttonClass += " bg-red-100 border-red-500 text-red-800";
            } else {
              buttonClass += " bg-gray-50 border-gray-300 text-gray-700";
            }
          } else {
            buttonClass += " bg-white hover:bg-gray-50 border-gray-300 text-gray-700";
          }

          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleSelect(option)}
              disabled={hasAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}