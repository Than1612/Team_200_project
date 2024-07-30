import React from 'react';

interface ItemSuggestionsProps {
  situation: string;
  items: string[];
}

export const ItemSuggestions: React.FC<ItemSuggestionsProps> = ({ situation, items }) => (
  <div className="item-suggestions">
    <h3>Items for {situation}</h3>
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);
