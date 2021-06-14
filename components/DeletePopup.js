import { TaskContext } from "@/context/taskContext";
import { useContext, useEffect, useState } from "react";

export const DeletePopup = ({ show, hide, id }) => {
  const [delSuccess, setDelSuccess] = useState(null);

  const { getTasks } = useContext(TaskContext);

  useEffect(() => {
    if (delSuccess) {
      hide();
      getTasks();
    }
  }, [delSuccess]);

  const deleteListHandler = async () => {
    const res = await fetch(`/api/task/delete?list_id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.msg);
    } else {
      setDelSuccess(data);
    }
  };

  return (
    <>
      {show && (
        <div className='bg-green-400 border-t-4 border-l-2 border-gray-400 rounded-2xl h-36 flex flex-col justify-around items-center absolute w-1/3 left-1/2 transform -translate-x-1/2'>
          <h1>Are You Sure?</h1>
          <div className='w-4/5 flex justify-around'>
            <button
              onClick={hide}
              className='border-2 border-gray-600 rounded-2xl text-gray-800 font-bold tracking-wider hover:text-gray-500 transition duration-300 outline-none  py-1 px-3'
            >
              Cancel
            </button>
            <button
              onClick={deleteListHandler}
              className='border-2 border-red-600 rounded-2xl text-yellow-800 outline-none font-bold tracking-wider hover:text-yellow-700 transition duration-300 py-1 px-3'
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const ClearPopup = ({ show, hide }) => {
  const [clearSuccess, setClearSuccess] = useState(null);

  const { getTasks } = useContext(TaskContext);

  useEffect(() => {
    if (clearSuccess) {
      hide();
      getTasks();
    }
  }, [clearSuccess]);

  const clearListHandler = async () => {
    const res = await fetch(`/api/task/clearall`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg);
    } else {
      setClearSuccess(data);
    }
  };

  return (
    <>
      {show && (
        <div className='bg-green-400 border-t-4 border-l-2 border-gray-400 rounded-2xl h-36 flex flex-col justify-around items-center absolute w-1/3 left-1/2 transform -translate-x-1/2'>
          <h1>Are You Sure? This will delete everything from your list</h1>
          <div className='w-4/5 flex justify-around'>
            <button
              onClick={hide}
              className='border-2 border-gray-600 rounded-2xl text-gray-800 font-bold tracking-wider hover:text-gray-500 transition duration-300 outline-none  py-1 px-3'
            >
              Cancel
            </button>
            <button
              onClick={clearListHandler}
              className='border-2 border-red-600 rounded-2xl text-yellow-800 outline-none font-bold tracking-wider hover:text-yellow-700 transition duration-300 py-1 px-3'
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const DeleteAccountPopup = ({ show, hide, deleteHandler }) => {
  return (
    <>
      {show && (
        <div className='bg-white absolute w-4/5 h-1/3 p-3 flex flex-col items-center justify-around border-t-4 border-l-2 border-gray-500 rounded-2xl'>
          <div className='text-lg'>
            <h1>Are you sure? This will also delete your task list</h1>
          </div>
          <div className='w-4/5 flex justify-around'>
            <button
              onClick={hide}
              className='border-2 border-gray-600 px-8 rounded-2xl font-bold hover:text-green-500 transition duration-300'
            >
              Cancel
            </button>
            <button
              onClick={deleteHandler}
              className='border-2 border-red-600 px-8 rounded-2xl font-bold hover:text-red-500 transition duration-300'
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};
