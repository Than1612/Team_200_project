import React from 'react';

export const BotCard: React.FC<{ children: React.ReactNode, showAvatar?: boolean }> = ({ children, showAvatar = true }) => (
  <div className="bot-card">
    {showAvatar && <div className="avatar"></div>}
    <div className="content">{children}</div>
  </div>
);
