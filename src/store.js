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
          return { Todo: [...state.Todo, { tasks: state.tasks }], tasks: "" };
        }),
      deleteTodo: (index) =>
        set((state) => ({
          Todo: state.Todo.filter((_, i) => i !== index),
        })),
      editTodo: (index, newTask) =>
        set((state) => ({
          Todo: state.Todo.map((item, i) =>
            i === index ? { tasks: newTask } : item
          ),
        })),
    }),
    {
      name: "todo-storage", // localStorage key
    }
  )
);

export default useStore;
