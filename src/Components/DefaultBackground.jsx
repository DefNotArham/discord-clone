import React from "react";

const DefaultBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-discord-bg flex justify-center items-start text-white">
      {children}
    </div>
  );
};

export default DefaultBackground;
