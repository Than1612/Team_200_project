import React from 'react';

export const SystemMessage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="system-message">
    <p>{children}</p>
  </div>
);
