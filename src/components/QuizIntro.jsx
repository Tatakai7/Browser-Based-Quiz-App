export default function QuizIntro({ title, description, onStart }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>
      <button
        onClick={onStart}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
      >
        Start Quiz
      </button>
    </div>
  );
}