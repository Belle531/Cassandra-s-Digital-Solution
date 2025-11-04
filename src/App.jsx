import { useState } from 'react';

// Note: Assuming 'index.css' is correctly imported in main.jsx
// If your styles are still missing, you may need to add: import './index.css';

function App() {
  const [todos, setTodos] = useState([
    { text: 'Finalize UX/UI for launch' },
    { text: 'Review Q3 financial report' },
    { text: 'Schedule team kickoff meeting' }
  ]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([{ text: input.trim() }, ...todos]);
      setInput('');
    }
  };

  const removeTodo = (idx) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    // Outer container for background and centering
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-0">
      
      {/* 1. STYLED, FULL-WIDTH, RESPONSIVE HEADER */}
      <header className="w-full bg-blue-700 p-4 shadow-lg mb-8">
        <h1 className="text-3xl font-extrabold text-white text-center">
          Cassandra's Digital Solutions
        </h1>
      </header>

      <div className="flex flex-col items-center w-full px-4"> {/* Added horizontal padding here */}

        {/* 2. RESPONSIVE Todo List Card */}
        {/* max-w-xs on mobile, scales to max-w-md on small screens, and max-w-lg on medium screens and up */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xs sm:max-w-md md:max-w-lg transition-all duration-300">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Cassandra's To-Do App
          </h2>

          {/* Add Todo Form */}
          <form onSubmit={addTodo} className="flex mb-4 w-full">
            <input
              className="flex-1 border border-gray-300 rounded-l-xl px-4 py-2 text-gray-800 text-base focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition duration-150"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Add a task..."
              aria-label="New Task Input"
            />
            <button
              type="submit"
              // Added hover/active states for the final polish
              className="bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-r-xl hover:bg-blue-800 active:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-150"
              disabled={!input.trim()}
            >
              Add
            </button>
          </form>

          {/* Todo List */}
          <ul className="divide-y divide-gray-100 space-y-2">
            {todos.map((todo, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-blue-50 transition duration-150"
              >
                <span className="text-base text-gray-700 font-medium">
                  {todo.text}
                </span>
                <button
                  onClick={() => removeTodo(idx)}
                  // Added a slightly different style for the delete button
                  className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                  title="Remove Task"
                >
                  Done
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-500 text-sm mt-4 font-semibold">
          Total Tasks: {todos.length}
        </p>
      </div>
    </div>
  );
}

export default App;
