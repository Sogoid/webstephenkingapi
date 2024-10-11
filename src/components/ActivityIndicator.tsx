import React from 'react';

interface ActivityIndicatorProps {
    size: string;
    color: string;
}

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({size, color}) => {
    return (
        <div style={{
            width: size,
            height: size,
            border: `5px solid ${color}`,
            borderTop: '5px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }}>
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
