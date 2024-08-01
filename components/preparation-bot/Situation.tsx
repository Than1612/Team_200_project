import React from 'react';

interface SituationProps {
  name: string;
}

export const Situation: React.FC<SituationProps> = ({ name }) => (
  <div className="situation">
    <h3>Preparation for {name}</h3>
    {"Type out 'Things required' to get more information about things required for your situation"}
  </div>
);
