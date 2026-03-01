import { http, HttpResponse } from "msw";

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
};
let tasks: Task[] = [{
    id: crypto.randomUUID(),
    title: "Learn React",
    description: " Redux Toolkit,ContextApi,State Management,Props Drilling",
    status: "pending",
  },];
export const TaskServices = [   
  // LOGIN
  http.post("/login", async ({ request }) => {
    const body = await request.json();
    const { username, password } = body as any;

    if (username === "test" && password === "test123") {
      return HttpResponse.json({ token: "fake-jwt-token" }, { status: 200 });
    }

    return new HttpResponse(null, { status: 401 });
  }),

  // GET TASKS
  http.get("/tasks", () => {
    return HttpResponse.json(tasks);
  }),

  // CREATE TASK
  http.post("/tasks", async ({ request }) => {
  const body = (await request.json()) as Omit<Task, "id">;

  const newTask: Task = {
    id: crypto.randomUUID(), 
    ...body,
  };

  tasks.push(newTask);

  return HttpResponse.json(newTask);
}),
  // UPDATE TASK
  http.put("/tasks/:id", async ({ params, request }) => {
  const id = params.id as string;

  const body = (await request.json()) as Omit<Task, "id">;

  tasks = tasks.map((t): Task =>
    t.id === id
      ? { id, ...body }   
      : t
  );

  return HttpResponse.json({ id, ...body });
}),

  // DELETE TASK
  http.delete("/tasks/:id", ({ params }) => {
    const { id } = params;

    tasks = tasks.filter((t) => t.id !== id);

    return new HttpResponse(null, { status: 200 });
  }),
];