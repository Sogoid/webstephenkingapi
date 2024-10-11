// components.tsx
import React from 'react';

export const ActivityIndicator: React.FC<{ size: string; color: string }> = ({size, color}) => (
    <div style={{fontSize: size, color}}>
        <span className="spinner">Loading...</span>
    </div>
);

// Defina outros componentes como `Animated` e `Easing` aqui, se necessário.
