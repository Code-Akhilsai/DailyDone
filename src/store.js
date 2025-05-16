import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      Todo: [],
      tasks: "",
      setTask: (task) => set(() => ({ tasks: task })),
      setTodo: () =>
        set((state) => {
          if (!state.tasks.trim()) return {};
          return {
            Todo: [...state.Todo, { tasks: state.tasks, completed: false }],
            tasks: "",
          };
        }),
      deleteTodo: (index) =>
        set((state) => ({
          Todo: state.Todo.filter((_, i) => i !== index),
        })),
      editTodo: (index, newTask) =>
        set((state) => ({
          Todo: state.Todo.map((item, i) =>
            i === index ? { ...item, tasks: newTask } : item
          ),
        })),
      toggleCompleted: (index) =>
        set((state) => ({
          Todo: state.Todo.map((item, i) =>
            i === index ? { ...item, completed: !item.completed } : item
          ),
        })),
    }),
    {
      name: "todo-storage", // localStorage key
      migrate: (persistedState, version) => {
        if (persistedState?.Todo) {
          persistedState.Todo = persistedState.Todo.map((item) =>
            item.completed === undefined ? { ...item, completed: false } : item
          );
        }
        return persistedState;
      },
    }
  )
);

export default useStore;
