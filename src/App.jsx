import "./App.css";
import useStore from "./store";
import { useState } from "react";
function App() {
  const { Todo, setTodo, tasks, setTask, deleteTodo, editTodo } = useStore();
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  return (
    <>
      <center>
        <h1 className="text-white font-bold font-sans my-7 text-3xl sm:text-4xl xl:my-13">
          DailyDone
        </h1>
        <div className="bg-gray-700 min-h-75 w-76 rounded-lg sm:w-100">
          <div className=" flex flex-col items-center sm:flex-row justify-center ">
            <input
              type="text"
              value={tasks}
              className="w-65 h-8.5 my-4  bg-white rounded-md"
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              className="w-20 h-9 bg-blue-800 text-white my-3 rounded-md sm:ml-3"
              onClick={() => setTodo(tasks)}
            >
              Add
            </button>
          </div>
          <h1 className="text-3xl my-6 font-semibold font-sans text-white">
            Tasks
          </h1>

          {Todo.map((items, idx) => {
            return (
              <div
                key={idx}
                className="flex gap-2 justify-end items-end sm:justify-end w-76 h-10"
              >
                {editIndex === idx ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-40 h-8 rounded-md px-2 bg-white"
                    />
                    <button
                      className="bg-green-700 text-white w-14 h-8 rounded-md"
                      onClick={() => {
                        editTodo(idx, editValue);
                        setEditIndex(null);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-800 text-white w-14 h-8 rounded-md"
                      onClick={() => setEditIndex(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h4 className="text-white text-[25px] font-sans ">
                      {items.tasks}
                    </h4>
                    <button
                      className="bg-blue-800 text-white w-18 h-8 rounded-md "
                      onClick={() => {
                        setEditIndex(idx);
                        setEditValue(item.tasks);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-800 text-white w-18 h-8 rounded-md mr-1.5 "
                      onClick={() => deleteTodo(idx)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            );
          })}
          <br />
        </div>
      </center>
    </>
  );
}
export default App;
