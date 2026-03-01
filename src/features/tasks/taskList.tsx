import axios from "axios";
import { deleteTask } from "./taskSlice";
import { useAppDispatch } from "../../app/store";


interface Props {
  tasks: any[];
  onEdit: (task: any) => void;
}

export default function TaskList({ tasks, onEdit }: Props) {
  const dispatch = useAppDispatch();

  const handleDelete = async (id: string) => {
    await axios.delete(`/tasks/${id}`);
    dispatch(deleteTask(id));
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded shadow text-center">
        No tasks available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{task.title}</td>
              <td className="px-6 py-4">{task.description}</td>
              <td className="px-6 py-4 capitalize">{task.status}</td>

              <td className="px-6 py-4 text-center space-x-2">
                <button
                  onClick={() => onEdit(task)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}