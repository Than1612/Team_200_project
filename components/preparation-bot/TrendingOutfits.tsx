import React from 'react';

interface Outfit {
  name: string;
  description: string;
}

interface TrendingOutfitsProps {
  outfits: Outfit[];
}

export const TrendingOutfits: React.FC<TrendingOutfitsProps> = ({ outfits }) => (
  <div className="trending-outfits">
    {outfits.map((outfit, index) => (
      <div key={index} className="outfit">
        <h3>{outfit.name}</h3>
        <p>{outfit.description}</p>
      </div>
    ))}
  </div>
);
