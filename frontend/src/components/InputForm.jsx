import React, { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
    onSubmit(inputValue);
    setInputValue('');
  };


  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        className="border border-gray-400 p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Send
      </button>
    </form>
  );
};

export default InputForm;
