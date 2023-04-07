import React from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window flex flex-col gap-2 p-4">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message.message}
          isBot={message.isBot}
        />
      ))}
    </div>
  );
};

export default ChatWindow;
