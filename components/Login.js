import { useContext, useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import { AuthContext } from "@/context/userContext";
import Register from "./Register";
import { ErrorAlert } from "./AlertMsg";

const Login = ({ show, close }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [hideLogin, setHideLogin] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const { login, error, loading, success } = useContext(AuthContext);

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

  const submitHandler = async (e) => {
    e.preventDefault();

    login(values);
  };

  const registerStateHandler = () => {
    setHideLogin(true);
    setShowRegister(true);
  };

  return (
    <>
      {show && (
        <div className='absolute bg-green-400 border-t-4 border-l-2 rounded-2xl border-gray-600 shadow-2xl p-2 w-full'>
          {!hideLogin && (
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
                    Email
                  </label>
                  <input
                    type='text'
                    id='email'
                    name='email'
                    placeholder='Enter Email'
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
                    type='text'
                    id='password'
                    name='password'
                    placeholder='Enter Password'
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
                  Login
                </button>
              </form>
              <div className='mt-3 flex'>
                <h3 className='text-white'>Don't have an account?</h3>
                <a
                  onClick={registerStateHandler}
                  className='ml-2 underline tracking-widest hover:text-white transition duration-200 cursor-pointer'
                >
                  Register
                </a>
              </div>
            </>
          )}

          {showRegister && (
            <Register
              hideRegister={() => setShowRegister(false)}
              showLogin={() => setHideLogin(false)}
              close={close}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Login;
