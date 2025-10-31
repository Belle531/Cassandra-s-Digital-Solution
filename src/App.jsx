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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col items-center w-full">

        {/* Header */}
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-blue-700 text-center">
            Cassandra's Digital Solutions
          </h1>
        </header>

        {/* Todo List Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-3 text-center">
            Cassandra's Todo App
          </h2>

          {/* Add Todo Form */}
          <form onSubmit={addTodo} className="flex mb-3 w-full">
            <input
              className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Add a task..."
              aria-label="New Task Input"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-r hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            >
              Add
            </button>
          </form>

          {/* Todo List */}
          <ul className="divide-y divide-gray-200">
            {todos.map((todo, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between py-2 hover:bg-gray-50"
              >
                <span className="text-sm text-gray-800">
                  {todo.text}
                </span>
                <button
                  onClick={() => removeTodo(idx)}
                  className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          Total Tasks: {todos.length}
        </p>
      </div>
    </div>
  );
}

export default App;