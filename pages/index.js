import { useContext, useEffect, useState } from "react";
import TaskList from "@/components/TaskList";
import { TaskContext } from "@/context/taskContext";
import { AuthContext } from "@/context/userContext";
import Login from "@/components/Login";

export default function Home() {
  const [title, setTitle] = useState("");

  const [showLogin, setShowLogin] = useState(false);

  const { loading, logout, user, userLoggedIn, success } =
    useContext(AuthContext);
  const {
    createTask,
    loading: createTaskLoading,
    error: createTaskError,
    success: createTaskSuccess,
    getTasks,
  } = useContext(TaskContext);

  useEffect(() => {
    if (success) {
      userLoggedIn();
      getTasks();
    }

    if (createTaskSuccess) {
      setTitle("");
      getTasks();
    }
  }, [createTaskSuccess, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    createTask(title);
  };

  return (
    <div
      className='mx-auto px-4 fluid bg-gray-200 flex items-center flex-col min-h-screen pt-20'
      onClick={() => setShowLogin(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col items-center w-1/3 bg-white h-40 min-h-0 shadow-md rounded-3xl pt-1 relative'
      >
        <div>
          {user ? (
            <button
              className='bg-green-500 absolute right-0 mr-3 mt-2 p-1 rounded-md shadow-md text-white hover:bg-gray-300 hover:text-green-800 transition duration-300'
              onClick={() => logout()}
            >
              Logout
            </button>
          ) : (
            <p
              onClick={() => setShowLogin(true)}
              className='bg-green-500 absolute right-0 mr-3 mt-2 p-1 rounded-md shadow-md text-white hover:bg-gray-300 hover:text-green-800 transition duration-300 cursor-pointer'
            >
              Login
            </p>
          )}
        </div>
        <Login show={showLogin} close={() => setShowLogin(false)} />
        <div className=' w-full h-full'>
          <div className='py-3 pl-3 text-xl'>
            <h1>{user ? `${user.username}'s Task List` : "The Task List"}</h1>
          </div>
          <hr />
          <div className='flex justify-center mt-5'>
            {user ? (
              <form onSubmit={submitHandler} className='w-11/12 text-center'>
                <input
                  className='bg-black placeholder-gray-100 placeholder-opacity-60 py-3 pl-3 w-9/12 rounded-md rounded-r-none outline-none shadow-md text-white'
                  type='text'
                  placeholder='Enter New Task'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button
                  type='submit'
                  className='bg-green-500 py-3 w-1/5 rounded-md rounded-l-none text-white hover:bg-gray-300 hover:text-green-800 transition duration-300'
                >
                  Add Task
                </button>
              </form>
            ) : (
              <div className='mt-1 p-3 text-center'>
                <p>
                  You are not logged in. Please{" "}
                  <span className='font-bold break-words'>LOGIN</span> to use
                  this app!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {user && <TaskList loading={createTaskLoading} error={createTaskError} />}
    </div>
  );
}
