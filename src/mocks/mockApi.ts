import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 500 });

// In-memory task storage
let tasks = [
  {
    id: "1",
    title: "Learn React",
    description: "Redux Toolkit,ContextApi,State Management,Props Drilling",
    status: "pending",
  },
];

// 🔐 POST /login
mock.onPost("/login").reply(200, {
  token: "fake-jwt-token",
});

// 📥 GET /tasks
mock.onGet("/tasks").reply(200, tasks);

// ➕ POST /tasks
mock.onPost("/tasks").reply((config) => {
  const newTask = JSON.parse(config.data);
  tasks.push(newTask);
  return [200, newTask];
});

// ✏️ PUT /tasks/:id
mock.onPut(/\/tasks\/\w+/).reply((config) => {
  const id = config.url?.split("/").pop();
  const updatedTask = JSON.parse(config.data);

  tasks = tasks.map((task) =>
    task.id === id ? updatedTask : task
  );

  return [200, updatedTask];
});

// ❌ DELETE /tasks/:id
mock.onDelete(/\/tasks\/\w+/).reply((config) => {
  const id = config.url?.split("/").pop();
  tasks = tasks.filter((task) => task.id !== id);

  return [200];
});

export default mock;