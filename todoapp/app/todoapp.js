"use client";
import React, { useEffect, useState } from "react";
import { BsCheckSquareFill, BsFillTrashFill } from "react-icons/bs";

function TodoApp() {
  const [newTask, setNewTask] = useState("");
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedPendingTasks = JSON.parse(localStorage.getItem("pendingTasks")) || [];
    const storedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    setPendingTasks(storedPendingTasks);
    setCompletedTasks(storedCompletedTasks);
  }, []);

  // Handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      const date = new Date().toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric' });
      setPendingTasks([...pendingTasks, { text: newTask, completed: false, date }]);
      setNewTask("");
    }
  };

  // Store tasks and completed tasks in local storage
  useEffect(() => {
    localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [pendingTasks, completedTasks]);

  // Delete a pending task
  const deleteTask = (index) => {
    const updatedPendingTasks = pendingTasks.filter((_, i) => i !== index);
    setPendingTasks(updatedPendingTasks);
  };

  // Mark a task as completed or pending
  const toggleTaskCompletion = (index) => {
    const updatedPendingTasks = [...pendingTasks];
    const task = updatedPendingTasks[index];
    task.completed = !task.completed;
    setPendingTasks(updatedPendingTasks);

    if (task.completed) {
      moveTaskToCompleted(index);
    } else {
      moveTaskToPending(task);
    }
  };

  // Move a task from pending to completed
  const moveTaskToCompleted = (index) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks.push(pendingTasks[index]);
    setCompletedTasks(newCompletedTasks);
  };

  // Move a task from completed back to pending
  const moveTaskToPending = (task) => {
    const updatedCompletedTasks = completedTasks.filter((t) => t !== task);
    setCompletedTasks(updatedCompletedTasks);
    setPendingTasks([...pendingTasks, task]);
  };

  // Clear all completed tasks
  const clearCompletedTasks = () => {
    setCompletedTasks([]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
        <div className="mb-4">
          <form onSubmit={handleAddTask} className="flex">
            <input
              type="text"
              placeholder="New Task..."
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              className="flex-grow px-4 py-2 mr-2 rounded-lg bg-gray-200 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            >
              Add
            </button>
          </form>
        </div>
        <div>
          {/* Pending Tasks */}
          {pendingTasks.map(
            (task, index) =>
              !task.completed && (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 bg-gray-200 p-2 rounded-lg"
                >
                  <div>
                    <p className="text-gray-800">{task.text}</p>
                    <p className="text-xs text-gray-600">{task.date}</p>
                  </div>
                  <div className="flex">
                    <BsCheckSquareFill
                      onClick={() => toggleTaskCompletion(index)}
                      className="text-green-500 cursor-pointer mr-2"
                    />
                    <BsFillTrashFill
                      onClick={() => deleteTask(index)}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                </div>
              )
          )}
          <hr className="my-4 border-gray-300" />
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Completed Tasks:</h3>
            <button
              onClick={clearCompletedTasks}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Clear Completed
            </button>
          </div>
          {/* Completed Tasks */}
          {completedTasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-2 bg-gray-200 p-2 rounded-lg"
            >
              <div>
                <p className="text-gray-800 line-through">{task.text}</p>
                <p className="text-xs text-gray-600">{task.date}</p>
              </div>
              <BsFillTrashFill
                onClick={() => moveTaskToPending(task)}
                className="text-red-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
