import { TaskContext } from "@/context/taskContext";
import { TrashIcon, PencilIcon, CheckIcon } from "@heroicons/react/outline";
import { useContext, useState } from "react";
import { DeletePopup, ClearPopup } from "./DeletePopup";
import EditPopup from "./EditPopup";

const TaskList = ({ loading, error }) => {
  const [updValue, setUpdValue] = useState();

  const [showEdit, setShowEdit] = useState(false);
  const [data, setData] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const [delId, setDelId] = useState("");

  const { checkTask, unCheckTask, task } = useContext(TaskContext);

  const editPopUpHandler = (id) => {
    const res = task.find((t) => t.id === id);

    setShowEdit(true);
    setData(res);
    setUpdValue(res.title);
  };

  const delPopUpHandler = (id) => {
    setShowDelete(true);
    setDelId(id);
  };

  return (
    <div className='bg-white w-1/3 mt-5 rounded-2xl p-5'>
      {task && task.length !== 0 && (
        <button
          onClick={() => setShowClear(true)}
          className='float-right border-2 border-green-400 py-1 px-3 rounded-2xl text-green-400 hover:text-red-500 transition duration-300'
        >
          Clear All
        </button>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h1 className='text-center'>
        {task && task.length === 0 && "No Tasks!"}
      </h1>
      <EditPopup
        show={showEdit}
        updVal={updValue}
        setUpdVal={setUpdValue}
        data={data}
        hide={() => setShowEdit(false)}
      />
      <DeletePopup
        show={showDelete}
        hide={() => setShowDelete(false)}
        id={delId}
      />

      <ClearPopup show={showClear} hide={() => setShowClear(false)} />
      {task &&
        task.map((list, index) => (
          <div key={list.id} className='flex w-full items-center'>
            {list.isDone && (
              <div className='pr-2'>
                <CheckIcon className='h-10 w-10 text-green-400' />
              </div>
            )}
            <div
              className={
                !list.isDone
                  ? "border-gray-500 w-full rounded-lg border-2 flex justify-between items-center py-3 pl-2 mt-2"
                  : "border-gray-300 w-11/12 rounded-lg border-2 flex justify-between items-center py-3 pl-2 mt-2"
              }
            >
              <h1
                className={
                  !list.isDone
                    ? "text-black break-words"
                    : "text-gray-300 line-through break-words"
                }
              >
                {index + 1}. {list.title}
              </h1>
              <div className='flex w-1/4 justify-between items-center pr-2'>
                <div className='flex w-1/2 justify-between items-center'>
                  <PencilIcon
                    onClick={() => editPopUpHandler(list.id)}
                    className={
                      !list.isDone
                        ? "h-6 w-6 cursor-pointer text-yellow-700 hover:text-yellow-500 transition duration-300"
                        : "h-5 w-5 text-gray-300"
                    }
                  />
                  <TrashIcon
                    onClick={() => delPopUpHandler(list.id)}
                    className='h-6 w-6 cursor-pointer text-red-900 hover:text-red-500 transition duration-300'
                  />
                </div>
                {!list.isDone ? (
                  <div
                    onClick={() => checkTask(list.id)}
                    className='h-5 w-5 cursor-pointer text-green-700 border-2 border-green-600 hover:text-green-500 transition duration-300'
                  ></div>
                ) : (
                  <CheckIcon
                    onClick={() => unCheckTask(list.id)}
                    className='h-5 w-5 text-black border-2 border-gray-400 cursor-pointer'
                  />
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TaskList;
