import React from "react";
import { Loader2 } from "lucide-react"; // ✅ Clean spinner icon

const LoadingSpinner = ({ size = 32, text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <Loader2 className="animate-spin text-blue-600" size={size} />
      {text && <p className="mt-2 text-gray-600 dark:text-gray-300">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
