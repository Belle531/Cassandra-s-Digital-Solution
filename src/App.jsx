import { useState } from 'react';

// Note: Assuming 'index.css' is correctly imported in main.jsx
// If your styles are still missing, you may need to add: import './index.css';

function App() {
  const [todos, setTodos] = useState([
    // Your tasks, now including the 'completed' status for styling
    { text: 'Level Capstone is Due Soon', completed: false }, 
    { text: 'Schedule a Meeting with Thomas Basham', completed: false }, 
    { text: 'Schedule Meeting for Codex Class', completed: false }
  ]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Ensure new task is added as incomplete
      setTodos([{ text: input.trim(), completed: false }, ...todos]); 
      setInput('');
    }
  };

  const removeTodo = (idx) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  // NEW FUNCTION: Toggle task completion status
  const toggleComplete = (idx) => {
    setTodos(
      todos.map((todo, i) =>
        i === idx ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    // Outer container: Uses soft gray-50 background and flex column to push the footer down
    <div className="min-h-screen bg-gray-50 flex flex-col p-0">
      
      {/* 1. STYLED, FULL-WIDTH HEADER (Deep Slate Gray) */}
      <header className="w-full bg-slate-800 p-4 shadow-xl">
        <h1 className="text-3xl font-extrabold text-white text-center tracking-wider">
          Cassandra's Digital Solutions
        </h1>
      </header>

      {/* MAIN CONTENT AREA: Uses flex-grow to take up all available vertical space */}
      <div className="flex flex-col items-center w-full px-4 py-8 flex-grow"> 

        {/* 2. RESPONSIVE Todo List Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xs sm:max-w-md md:max-w-lg transition-all duration-300 border border-gray-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4 text-center border-b pb-2 border-gray-100">
            Cassandra's Digital Task Manager
          </h2>

          {/* Add Todo Form */}
          <form onSubmit={addTodo} className="flex mb-4 w-full">
            <input
              className="flex-1 border border-gray-300 rounded-l-xl px-4 py-2 text-gray-800 text-base focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition duration-150"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter new task or action item..."
              aria-label="New Task Input"
            />
            <button
              type="submit"
              // Add button uses vibrant amber primary color
              className="bg-amber-500 text-slate-900 text-sm font-bold px-5 py-2 rounded-r-xl hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 transition duration-150"
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
                className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-amber-50 transition duration-150"
              >
                {/* CONDITIONAL STYLING: Apply strikethrough if completed */}
                <span className={`text-base font-medium transition duration-150 ${todo.completed ? 'line-through text-gray-500' : 'text-slate-800'}`}>
                  {todo.text}
                </span>

                <div className="flex space-x-2">
                  {/* BUTTON 1: TOGGLE COMPLETION */}
                  <button
                    onClick={() => toggleComplete(idx)}
                    className={`text-white text-xs font-semibold px-3 py-1 rounded-full transition ${
                      todo.completed 
                        ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-300' // Professional Emerald for Success
                        : 'bg-slate-600 hover:bg-slate-700 focus:ring-slate-300' // Slate when task is active
                    } focus:outline-none focus:ring-2`}
                    title={todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
                  >
                    {todo.completed ? 'Uncomplete' : 'Complete'}
                  </button>
                  
                  {/* BUTTON 2: REMOVE */}
                  <button
                    onClick={() => removeTodo(idx)}
                    // Standard red for destructive action
                    className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                    title="Remove Task Permanently"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-600 text-sm mt-4 font-semibold">
          Tasks Remaining: {todos.filter(t => !t.completed).length} / Total Tasks: {todos.length}
        </p>
      </div>

      {/* 3. FOOTER: Matches the header using deep slate gray */}
      <footer className="w-full bg-slate-800 p-4 shadow-xl mt-auto">
        <p className="text-gray-300 text-center text-sm font-medium">
          &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
