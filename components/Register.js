import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/userContext";
import { XCircleIcon } from "@heroicons/react/outline";
import { ErrorAlert } from "./AlertMsg";

const Register = ({ hideRegister, showLogin, close }) => {
  const [showMsg, setShowMsg] = useState(false);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { register, error, loading, success } = useContext(AuthContext);

  useEffect(() => {
    if (success) {
      close();
    }

    if (error) {
      setShowMsg(true);

      const timeOut = setTimeout(() => {
        setShowMsg(false);
      }, 2000);

      return () => clearTimeout(timeOut);
    }
  }, [success, error]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    register(values);
  };

  const loginStateHandler = () => {
    hideRegister();
    showLogin();
  };

  return (
    <>
      {loading && <p className='absolute'>Loading...</p>}
      {showMsg && error && <ErrorAlert text={error.msg} />}
      <XCircleIcon
        onClick={close}
        className='h-8 w-8 float-right text-red-800 hover:text-red-600 transition duration-300 cursor-pointer'
      />
      <form
        className=' flex flex-col w-full p-3 items-center'
        onSubmit={submitHandler}
      >
        <div className='w-4/5 flex flex-col mt-5'>
          <label className='text-white tracking-widest font-bold'>
            Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            className='py-2 pl-2 border-t-4 border-l-2 border-gray-400 rounded-2xl outline-none'
            required
            value={values.username}
            onChange={inputChangeHandler}
          />
        </div>

        <div className='w-4/5 flex flex-col mt-5'>
          <label className='text-white tracking-widest font-bold'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            className='py-2 pl-2 border-t-4 border-l-2 border-gray-400 rounded-2xl outline-none'
            required
            value={values.email}
            onChange={inputChangeHandler}
          />
        </div>

        <div className='w-4/5 flex flex-col mt-5'>
          <label className='text-white tracking-widest font-bold'>
            password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='py-2 pl-2 border-t-4 border-l-2 border-gray-400 rounded-2xl outline-none'
            required
            value={values.password}
            onChange={inputChangeHandler}
          />
        </div>

        <button
          className='mt-5 border-2 border-gray-600 py-1 px-5 text-white rounded-2xl hover:border-gray-400 hover:text-gray-200 transition duration-300'
          type='submit'
        >
          Register
        </button>
      </form>

      <div className='mt-3 flex'>
        <h3 className='text-white'>Already have an account?</h3>
        <a
          onClick={loginStateHandler}
          className='ml-2 underline tracking-widest hover:text-white transition duration-200 cursor-pointer'
        >
          Login
        </a>
      </div>
    </>
  );
};

export default Register;
