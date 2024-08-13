import React from 'react';

export const BotMessage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="bot-message">
    <p>{children}</p>
  </div>
);
