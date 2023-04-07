import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputForm from './components/InputForm';
import Spinner from './components/Spinner';
import { sendMessage } from './utils/api';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (userMessage) => {
    console.log('userMessage:', userMessage);
    setIsProcessing(true);
    const response = await sendMessage(userMessage);
    setIsProcessing(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: userMessage, isBot: false },
      { message: response, isBot: true },
    ]);
  };

  return (
    <div className="app bg-gray-100 min-h-screen flex flex-col justify-center">
      <ChatWindow messages={messages} />
      <InputForm onSubmit={handleSubmit} />
      {isProcessing && <Spinner />}
    </div>
  );
};

export default App;
