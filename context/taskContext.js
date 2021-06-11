import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(null);
  const [unCheck, setUnCheck] = useState(null);

  useEffect(() => getTasks(), [check, unCheck]);

  const createTask = async (title) => {
    setLoading(true);

    const res = await fetch("/api/task/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(data.msg);
    } else {
      setLoading(false);
      setSuccess(data);
    }
  };

  const getTasks = async () => {
    setLoading(true);

    const res = await fetch("/api/task/gettasks", {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(true);
    } else {
      setLoading(false);
      setTask(data);
    }
  };

  const checkTask = async (taskId) => {
    const res = await fetch(`/api/task/checkstate?task_id=${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: true }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg);
    } else {
      setCheck(data);
    }
  };

  const unCheckTask = async (taskId) => {
    const res = await fetch(`/api/task/checkstate?task_id=${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: false }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg);
    } else {
      setUnCheck(data);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        task,
        error,
        success,
        loading,
        createTask,
        getTasks,
        checkTask,
        unCheckTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
