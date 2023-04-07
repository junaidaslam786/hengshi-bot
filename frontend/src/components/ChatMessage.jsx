import React from 'react';

const ChatMessage = ({ message, isBot }) => {
  return (
    <div
      className={`${
        isBot ? 'bg-gray-200' : 'bg-blue-400'
      } chat-bubble rounded-lg p-3`}
    >
      <p className="text-gray-800">{message}</p>
    </div>
  );
};

export default ChatMessage;
