import { useState, useEffect } from 'react';
import QuizIntro from './components/QuizIntro';
import QuizQuestion from './components/QuizQuestion';
import QuizResults from './components/QuizResults';

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "In which year did World War II end?",
    options: ["1943", "1945", "1947", "1950"],
    correctAnswer: "1945"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  }
];

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setTimeLeft(60);
  };

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const answerResult = {
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect
    };

    setUserAnswers([...userAnswers, answerResult]);

    if (isCorrect) {
      setScore(score + 1);
    }

    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(60);
    } else {
      setQuizFinished(true);
    }
  };

  useEffect(() => {
    let timer;
    if (quizStarted && !quizFinished && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && quizStarted && !quizFinished) {
      // Time's up - mark as incorrect and move to next question
      const currentQuestion = quizData[currentQuestionIndex];
      const answerResult = {
        question: currentQuestion.question,
        selectedAnswer: null,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: false
      };
      setUserAnswers([...userAnswers, answerResult]);
      setScore(Math.max(0, score - 1)); // Decrement score but don't go below 0
      moveToNextQuestion();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, quizFinished]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {!quizStarted && !quizFinished && (
          <QuizIntro 
            title="General Knowledge Quiz" 
            description="Test your knowledge with this 5-question quiz. You'll have 1 minute per question. Good luck!"
            onStart={startQuiz}
          />
        )}

        {quizStarted && !quizFinished && (
          <QuizQuestion 
            question={quizData[currentQuestionIndex].question}
            options={quizData[currentQuestionIndex].options}
            correctAnswer={quizData[currentQuestionIndex].correctAnswer}
            onAnswer={handleAnswer}
            timeLeft={timeLeft}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={quizData.length}
          />
        )}

        {quizFinished && (
          <QuizResults 
            score={score}
            totalQuestions={quizData.length}
            userAnswers={userAnswers}
            onRestart={startQuiz}
          />
        )}
      </div>
    </div>
  );
}

export default App;