import React from "react";

interface ActivityIndicatorProps {
  size: string;
  color: string;
}

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  size,
  color,
}) => {
  return (
    <div>
      <div
        className="border-4 border-t-transparent rounded-full animate-spin"
        style={{
          width: size,
          height: size,
          borderColor: `${color} transparent transparent transparent`,
        }}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ActivityIndicator;
