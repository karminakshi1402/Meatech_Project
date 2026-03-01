import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../app/store";
import { setTasks } from "../features/tasks/taskSlice";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import TaskList from "../features/tasks/taskList";
import TaskForm from "../features/tasks/taskForm";

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    const [isOpen, setIsOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<any>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    {/* Fetch all tasks from the mocked API,
         and store them in Redux state */}
    const fetchTasks = async () => {
        const res = await axios.get("/tasks");
        dispatch(setTasks(res.data));
    };

    {/* Opens the modal in "Add Task" mode,
         Clears any previously selected task */}
    const handleAddClick = () => {
        setEditingTask(null);
        setIsOpen(true);
    };

    {/* Opens the modal in "Edit Task" mode,
        Sets the selected task data into state */}
    const handleEditClick = (task: any) => {
        setEditingTask(task);
        setIsOpen(true);
    };

    {/* Logs out the user ,
        Clears authentication state and redirects to login page */}
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Task Dashboard</h1>

                {/* Add Task Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleAddClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Add Task
                    </button>
                    {/* Logout Buttons */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>

            </div>

            {/* Table */}
            <TaskList tasks={tasks} onEdit={handleEditClick} />

            {/* Modal Form */}
            {isOpen && (
                <TaskForm
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    editingTask={editingTask}
                />
            )}
        </div>
    );
}