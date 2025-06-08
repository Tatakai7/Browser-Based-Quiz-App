export default function QuizResults({ score, totalQuestions, userAnswers, onRestart }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h1>
      <p className="text-lg text-gray-600 mb-6">
        Your score: {score} out of {totalQuestions}
      </p>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Results:</h2>
        <div className="space-y-4">
          {userAnswers.map((answer, index) => (
            <div key={index} className="border-b pb-4">
              <p className="font-medium text-gray-800 mb-2">{answer.question}</p>
              <p className={`text-sm ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                Your answer: {answer.selectedAnswer || 'No answer'}
              </p>
              {!answer.isCorrect && (
                <p className="text-sm text-gray-600">Correct answer: {answer.correctAnswer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={onRestart}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
      >
        Restart Quiz
      </button>
    </div>
  );
}