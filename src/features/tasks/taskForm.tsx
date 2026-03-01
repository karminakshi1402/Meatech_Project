import { useState, useEffect } from "react";
import axios from "axios";
import { addTask, updateTask } from "./taskSlice";
import { useAppDispatch } from "../../app/store";


export default function TaskForm({
  isOpen,
  setIsOpen,
  editingTask,
}: any) {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTask) {
      const res = await axios.put(`/tasks/${editingTask.id}`, {
        ...editingTask,
        title,
        description,
        status,
      });
      dispatch(updateTask(res.data));
    } else {
      const res = await axios.post("/tasks", {
        title,
        description,
        status,
      });
      dispatch(addTask(res.data));
    }

    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-106 p-6 rounded shadow-lg">

        <h2 className="text-lg font-bold mb-4">
          {editingTask ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="border p-2 w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="border p-2 w-full"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            className="border p-2 w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              {editingTask ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}