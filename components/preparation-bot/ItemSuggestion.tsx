import React from 'react';

interface ItemSuggestionsProps {
  situation: string;
  items: string[];
}

const generateFlipkartLink = (product: string) => {
  return `https://www.flipkart.com/search?q=${encodeURIComponent(product)}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`;
};

export const ItemSuggestions: React.FC<ItemSuggestionsProps> = ({ situation, items }) => {
  const handleRedirect = (product: string) => {
    const link = generateFlipkartLink(product);
    window.location.href = link;
  };

  return (
    <div className="item-suggestions">
      <h3>Items for {situation}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
            <button onClick={() => handleRedirect(item)}>Buy Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
