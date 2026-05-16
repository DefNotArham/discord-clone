import React from "react";

const DefaultBackground = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-discord-bg bg-[#313338] flex justify-center items-start text-white">
      {children}
    </div>
  );
};

export default DefaultBackground;
