export const ErrorAlert = ({ text }) => {
  return (
    <div className='absolute left-1/2 top-0 transform -translate-x-1/2 bg-red-300 w-3/5 text-center shadow-2xl py-4 px-2'>
      <p>{text}</p>
    </div>
  );
};
