import { useContext, useEffect, useState } from "react";
import TaskList from "@/components/TaskList";
import { TaskContext } from "@/context/taskContext";
import { AuthContext } from "@/context/userContext";
import Login from "@/components/Login";
import ManageAccount from "@/components/ManageAccount";

export default function Home() {
  const [title, setTitle] = useState("");

  const [showLogin, setShowLogin] = useState(false);
  const [showUpdAccount, setShowUpdAccount] = useState(false);

  const { logout, user, userLoggedIn, success } = useContext(AuthContext);
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

  const closeHandler = () => {
    setShowLogin(false);
    setShowUpdAccount(false);
  };

  return (
    <div
      className='mx-auto px-4 fluid bg-gray-200 flex items-center flex-col min-h-screen pt-20'
      onClick={closeHandler}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col items-center w-1/3 bg-white py-10 shadow-md rounded-3xl pt-1 relative'
      >
        <div>
          {user ? (
            <div className='absolute right-0'>
              <button
                className='bg-green-500 mr-3 mt-2 p-1 rounded-md shadow-md text-white hover:bg-gray-300 hover:text-green-800 transition duration-300'
                onClick={() => logout()}
              >
                Logout
              </button>
              <button
                onClick={() => setShowUpdAccount(true)}
                className='bg-green-500 mr-3 mt-2 p-1 rounded-md shadow-md text-white hover:bg-gray-300 hover:text-green-800 transition duration-300'
              >
                Manage Account
              </button>
            </div>
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
        <ManageAccount show={showUpdAccount} hide={() => setShowUpdAccount()} />
        <div className=' w-full h-full'>
          <div className='py-3 pl-3 text-xl w-1/2 break-words'>
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
                  required
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
