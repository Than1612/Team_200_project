import React from 'react';

interface Outfit {
  name: string;
  description: string;
}

interface TrendingOutfitsProps {
  outfits: Outfit[];
}

const generateFlipkartLink = (product: string) => {
  return `https://www.flipkart.com/search?q=${encodeURIComponent(product)}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`;
};

export const TrendingOutfits: React.FC<TrendingOutfitsProps> = ({ outfits }) => {
  const handleRedirect = (product: string) => {
    const link = generateFlipkartLink(product);
    window.location.href = link;
  };

  return (
    <div className="trending-outfits">
      {outfits.map((outfit, index) => (
        <div key={index} className="outfit">
          <h3>{outfit.name}</h3>
          <p>{outfit.description}</p>
          <button onClick={() => handleRedirect(outfit.name)}>Buy Now</button>
        </div>
      ))}
    </div>
  );
};
