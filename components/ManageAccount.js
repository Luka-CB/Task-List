import { AuthContext } from "@/context/userContext";
import { XCircleIcon } from "@heroicons/react/outline";
import { useContext, useEffect, useState } from "react";
import { DeleteAccountPopup } from "./DeletePopup";

const ManageAccount = ({ show, hide }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showDel, setShowDel] = useState(false);

  const {
    user,
    updateAccount,
    deleteAccount,
    updError,
    delError,
    updSuccess,
    delSuccess,
    loading,
  } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }

    if (updSuccess) {
      hide();
      setPassword("");
    }

    if (delSuccess) {
      hide();
      window.location.reload();
    }
  }, [user, updSuccess, delSuccess]);

  const updateAccountHandler = (e) => {
    e.preventDefault();

    updateAccount(username, email, password);
  };

  const deleteAccountHandler = () => {
    deleteAccount();
  };

  return (
    <>
      {show && (
        <div className='absolute bg-green-400 w-full border-t-4 border-l-2 border-gray-500 rounded-2xl shadow-2xl p-3 pb-10 flex flex-col items-center'>
          <XCircleIcon
            onClick={hide}
            className='h-8 w-8 absolute right-0 mr-1 cursor-pointer hover:text-red-800 transition duration-300'
          />
          <div className='w-full text-center mb-2 text-white text-lg'>
            <h1>Manage Account</h1>
          </div>

          {loading && <p>Loading...</p>}
          {updError && <p>{updError.msg}</p>}
          {delError && <p>{delError.msg}</p>}

          <DeleteAccountPopup
            show={showDel}
            hide={() => setShowDel(false)}
            deleteHandler={deleteAccountHandler}
          />

          <form className='w-4/5' onSubmit={updateAccountHandler}>
            <div className='mt-5 flex flex-col w-full'>
              <label className='text-white tracking-widest font-bold'>
                Username
              </label>
              <input
                type='text'
                className='py-2 text-2xl pl-2 outline-none border-t-4 border-l-2 border-gray-400 rounded-2xl'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className='mt-5 flex flex-col w-full'>
              <label className='text-white tracking-widest font-bold'>
                Email
              </label>
              <input
                type='email'
                className='py-2 text-2xl pl-2 outline-none border-t-4 border-l-2 border-gray-400 rounded-2xl'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='mt-5 flex flex-col w-full'>
              <label className='text-white tracking-widest font-bold'>
                Password
              </label>
              <input
                type='password'
                placeholder='Enter New Password'
                className='py-2 text-2xl pl-2 outline-none border-t-4 border-l-2 border-gray-400 rounded-2xl'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type='submit'
              className='mt-5 border-2 border-yellow-800 w-full py-2 rounded-2xl text-white font-bold tracking-wide hover:text-yellow-700 transition duration-300'
            >
              Update Account
            </button>
          </form>

          <button
            onClick={() => setShowDel(true)}
            className='w-4/5 mt-5 border-2 border-red-600 py-2 rounded-2xl text-white font-bold tracking-wide hover:text-red-600 transition duration-300'
          >
            Delete Account
          </button>
        </div>
      )}
    </>
  );
};

export default ManageAccount;
