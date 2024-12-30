import React from "react";
import { ClipLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ClipLoader color="#2563eb" size={150} />
    </div>
  );
};

export default Loading;
