import React from 'react';

interface SituationProps {
  name: string;
}

export const Situation: React.FC<SituationProps> = ({ name }) => (
  <div className="situation">
    <h3>Preparation for {name}</h3>
    {/* Add other preparation details or UI elements here */}
  </div>
);
