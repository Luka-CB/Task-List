import { TaskContext } from "@/context/taskContext";
import { useContext, useEffect, useState } from "react";

const EditPopup = ({ show, hide, updVal, setUpdVal, data }) => {
  const [updSuccess, setUpdSuccess] = useState(null);

  const { getTasks } = useContext(TaskContext);

  useEffect(() => {
    if (updSuccess) {
      hide();
      getTasks();
    }
  }, [updSuccess]);

  const id = data.id;

  const updateListHandler = async () => {
    const res = await fetch(`/api/task/update?list_id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: updVal }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg);
    } else {
      setUpdSuccess(data);
    }
  };

  return (
    <>
      {show && (
        <div className='bg-green-400 border-t-4 border-l-2 border-gray-400 rounded-2xl h-36 flex flex-col justify-around items-center absolute w-1/3 left-1/2 transform -translate-x-1/2'>
          <input
            type='text'
            className='w-4/5 py-3 border-t-4 border-l-2 border-gray-400 rounded-2xl outline-none pl-2'
            value={updVal}
            onChange={(e) => setUpdVal(e.target.value)}
          />
          <div className='w-4/5 flex justify-around'>
            <button
              onClick={hide}
              className='border-2 border-gray-600 rounded-2xl text-gray-800 font-bold tracking-wider hover:text-gray-500 transition duration-300 outline-none  py-1 px-3'
            >
              Cancel
            </button>
            <button
              onClick={updateListHandler}
              className='border-2 border-red-600 rounded-2xl text-yellow-800 outline-none font-bold tracking-wider hover:text-yellow-700 transition duration-300 py-1 px-3'
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPopup;
